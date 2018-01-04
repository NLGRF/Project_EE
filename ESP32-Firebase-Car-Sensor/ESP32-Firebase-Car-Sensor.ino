#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <time.h>


// Config Firebase
#define FIREBASE_HOST "esp32-ccar.firebaseio.com"
#define FIREBASE_AUTH "q5iEL3edyyzhS4QVT7VGfJ8PHpzpfWTaUNlsVNrC"

// Config connect WiFi
#define WIFI_SSID "DevTech"
#define WIFI_PASSWORD "Alonesnon0"

// Config time
int timezone = 7;

char ntp_server1[20] = "ntp.ku.ac.th";
char ntp_server2[20] = "fw.eng.ku.ac.th";
char ntp_server3[20] = "time.uni.net.th";

int dst = 0;

// Sensor
const uint8_t phr_sensor = 18;

// unsigned int Car = 0;
// unsigned int Times = 0;

void setup() {
  Serial.begin(9600);

  // Sensor
  pinMode(phr_sensor, INPUT_PULLUP);

  // WiFi
  WiFi.mode(WIFI_STA);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  // Time Server
  configTime(timezone * 3600, dst, ntp_server1, ntp_server2, ntp_server3);
  Serial.println("Waiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println("Now: " + NowString());

  // connect firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}

void loop() {
  static bool last_phr_state = HIGH;
  static unsigned int car_count;
  static unsigned long last_press_time;
  int phr_state = digitalRead(phr_sensor);
  unsigned long now = millis();

  // Record when the phr is pressed.
  if (last_phr_state == HIGH && phr_state == LOW) {
    car_count++;
    last_press_time = now;
  }

  // Report when the phr is released.
  if (last_phr_state == LOW && phr_state == HIGH) {
    unsigned long phase_duration = now - last_press_time;
    if (phase_duration < 10) {  // discard bounce
      car_count--;
    }
    else {
      Serial.print(F("pushes: "));
      Serial.print(car_count);
      Serial.print(F(", duration: "));
      Serial.print(phase_duration);
      Serial.println(F(" ms"));
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
      root["Car"] = car_count;
      root["Times"] = phase_duration;
      root["time"] = NowString();

      // append a new value to /logDHT
      String name = Firebase.push("logCar", root);
      // handle error
      if (Firebase.failed()) {
        Serial.print("pushing /logs failed:");
        Serial.println(Firebase.error());
        return;
      }
      Serial.print("pushed: /logCar/");
      Serial.println(name);
      // delay(30000);
    }
  }

  last_phr_state = phr_state;

}

String NowString() {
  time_t now = time(nullptr);
  struct tm* newtime = localtime(&now);

  String tmpNow = "";
  tmpNow += String(newtime->tm_year + 1900);
  tmpNow += "-";
  tmpNow += String(newtime->tm_mon + 1);
  tmpNow += "-";
  tmpNow += String(newtime->tm_mday);
  tmpNow += " ";
  tmpNow += String(newtime->tm_hour);
  tmpNow += ":";
  tmpNow += String(newtime->tm_min);
  tmpNow += ":";
  tmpNow += String(newtime->tm_sec);
  return tmpNow;
}
