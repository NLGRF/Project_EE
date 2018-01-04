const uint8_t phr_sensor = 18;

void setup()
{
    pinMode(phr_sensor, INPUT_PULLUP);
    Serial.begin(9600);
}

void loop()
{
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
        }
    }

    last_phr_state = phr_state;
}
