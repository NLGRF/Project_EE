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
unsigned int Car = 0;
unsigned int Times = 0;

void setup() {
  Serial.begin(9600);

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

  configTime(timezone * 3600, dst, ntp_server1, ntp_server2, ntp_server3);
  Serial.println("Waiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println("Now: " + NowString());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  Car = Firebase.getInt("/config/Car");
  if (Firebase.failed()) {
    Serial.print("getCar /logs failed:");
    Serial.println(Firebase.error());
    return;
  }
  Times = Firebase.getInt("/config/Times");
  if (Firebase.failed()) {
    Serial.print("getTimes /logs failed:");
    Serial.println(Firebase.error());
    return;
  }
  Serial.print("last Car : ");
  Serial.println(Car);
  Serial.print("last Times : ");
  Serial.println(Times);

}

void loop() {
 

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["Car"] = Car;
  root["Times"] = Times;
  root["time"] = NowString();

  // append a new value to /logDHT
  String data = Firebase.push("logCar", root);
  // handle error
  if (Firebase.failed()) {
    Serial.print("pushing /logs failed:");
    Serial.println(Firebase.error());
    return;
  }
  Serial.print("pushed: /logCar/");
  Serial.println(data);


  JsonObject& objectList = StaticJsonBuffer<200>().createObject();
  objectList["Car"] = Car;
  objectList["Times"] = Times;

  Firebase.set("config", objectList);
  // handle error
  if (Firebase.failed()) {
    Serial.print("setting /logs failed:");
    Serial.println(Firebase.error());
    return;
  }
  Serial.println("setted: /logCar/");
//  Serial.print(Firebase.set("config", objectList));

  // Test
  Car++;
  Times = random(300, 2000);

  delay(30000);
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
