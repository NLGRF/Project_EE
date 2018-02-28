#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <time.h>


// Config Firebase Database
#define FIREBASE_HOST "xxxxxx.firebaseio.com"
#define FIREBASE_AUTH "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

// Config connect WiFi
#define WIFI_SSID "xxxxxx"
#define WIFI_PASSWORD "xxxxxxx"

// Config time
int timezone = 7;

// Time Server
char ntp_server1[20] = "ntp.ku.ac.th";
char ntp_server2[20] = "fw.eng.ku.ac.th";
char ntp_server3[20] = "time.uni.net.th";

int dst = 0;

// Sensor
const uint8_t phr_sensor = 12;

unsigned int Car = 0;

byte LED_State_WiFi = 33;

void setup() {
  Serial.begin(115200);

  // Sensor
  pinMode(phr_sensor, INPUT);
  pinMode(33, OUTPUT);

  // WiFi
  WiFi.mode(WIFI_STA);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");

  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(33, LOW);
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  digitalWrite(33, HIGH);
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

  // INPUT
  Car = Firebase.getInt("/config/Car");
  if (Firebase.failed()) {
    Serial.print("getCar /logs failed:");
    Serial.println(Firebase.error());
    return;
  }
  Serial.print("last Car : ");
  Serial.println(Car);

}

void loop() {
  static bool last_phr_state = HIGH; // NPN
 // static bool last_phr_state = LOW; //PNP
  static unsigned int car_count;
  static unsigned long last_press_time;
  int phr_state = digitalRead(phr_sensor);
  unsigned long now = millis();

  // Record when the phr is pressed.
   if (last_phr_state == HIGH && phr_state == LOW) { // NPN
  // if (last_phr_state == LOW && phr_state == HIGH) { //PNP
    car_count++;
    last_press_time = now;
  }

  // Report when the phr is released.
  if (last_phr_state == LOW && phr_state == HIGH) { //NPN
  //if (last_phr_state == HIGH && phr_state == LOW) { //PNP
    unsigned long phase_duration = now - last_press_time;
    
    if (phase_duration < 10) {  // discard bounce
      car_count--;
    }
    else {
      Serial.print(F("pushes: "));
      Serial.print(car_count);
      Serial.print(F(", duration: "));
      Serial.print(phase_duration);
      //Serial.print(last_press_time);
      Serial.println(F(" ms"));
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
      root["Car"] = car_count;
      root["duration_time"] = phase_duration;
      //root["duration_time"] = now;
      //root["duration_time"] = last_press_time;
      root["time"] = NowString();

      // append a new value to /logCar
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

      JsonObject& objectList = StaticJsonBuffer<200>().createObject();
      objectList["Car"] = car_count;

      Firebase.set("config", objectList);
      // handle error
      if (Firebase.failed()) {
        Serial.print("setting /logs failed:");
        Serial.println(Firebase.error());
        return;
      }
      Serial.println("setted: /logCar/");
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
