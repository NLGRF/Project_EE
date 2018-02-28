#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <time.h>


// Config Firebase Database
#define FIREBASE_HOST "esp32-ccar.firebaseio.com"
#define FIREBASE_AUTH "q5iEL3edyyzhS4QVT7VGfJ8PHpzpfWTaUNlsVNrC"

// Config connect WiFi
#define WIFI_SSID "champdeedozuzu"
#define WIFI_PASSWORD "cp40874556727"

// #define WIFI_SSID "DevTech"
// #define WIFI_PASSWORD "Alonesnon0"

// Config time
int timezone = 7;

// Time Server
char ntp_server1[20] = "ntp.ku.ac.th";
char ntp_server2[20] = "fw.eng.ku.ac.th";
char ntp_server3[20] = "time.uni.net.th";

int dst = 0;

// Sensor
const uint8_t phr_sensor_in = 12;

unsigned int Car_in = 0;

void setup() {
  Serial.begin(115200);

  // Sensor
  pinMode(phr_sensor_in, INPUT);
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

  // IN
  Car_in = Firebase.getInt("/config_in/Car_in");
  if (Firebase.failed()) {
    Serial.print("getCar /logs failed:");
    Serial.println(Firebase.error());
    return;
  }
  Serial.print("last Car In : ");
  Serial.println(Car_in);

}

void loop() {
  // static bool last_phr_state_in = HIGH; // NPN
  static bool last_phr_state_in = LOW; //PNP
  static unsigned int car_count_in;
  static unsigned long last_press_time_in;
  int phr_state_in = digitalRead(phr_sensor_in);
  unsigned long now_in = millis();

  // Record when the phr is pressed.
   if (last_phr_state_in == HIGH && phr_state_in == LOW) { // NPN
  // if (last_phr_state_in == LOW && phr_state_in == HIGH) { //PNP
    car_count_in++;
    last_press_time_in = now_in;
  }

  // Report when the phr is released.
  if (last_phr_state_in == LOW && phr_state_in == HIGH) { //NPN
  //if (last_phr_state_in == HIGH && phr_state_in == LOW) { //PNP
    unsigned long phase_duration_in = now_in - last_press_time_in;
    
    if (phase_duration_in < 10) {  // discard bounce
      car_count_in--;
    }
    else {
      Serial.print(F("pushes: "));
      Serial.print(car_count_in);
      Serial.print(F(", duration: "));
      Serial.print(phase_duration_in);
      //Serial.print(last_press_time_in);
      Serial.println(F(" ms"));
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& root_in = jsonBuffer.createObject();
      root_in["Car_in"] = car_count_in;
      root_in["duration_time_in"] = phase_duration_in;
      //root_in["duration_time_in1"] = phase_duration_in;
      //root_in["duration_time_in2"] = now_in;
      //root_in["duration_time_in3"] = last_press_time_in;
      root_in["time_in"] = NowString();

      // append a new value to /logCar
      String name = Firebase.push("logCar_in", root_in);
      // handle error
      if (Firebase.failed()) {
        Serial.print("pushing /logs failed:");
        Serial.println(Firebase.error());
        return;
      }
      Serial.print("pushed: /logCar_in/");
      Serial.println(name);
      // delay(30000);

      JsonObject& objectList_in = StaticJsonBuffer<200>().createObject();
      objectList_in["Car_in"] = car_count_in;

      Firebase.set("config_in", objectList_in);
      // handle error
      if (Firebase.failed()) {
        Serial.print("setting_in /logs failed:");
        Serial.println(Firebase.error());
        return;
      }
      Serial.println("setted: /logCar_in/");
    }
  }


  last_phr_state_in = phr_state_in;

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
