#include <FastLED.h>

#include <string.h>

#include <Arduino.h>

#include <Adafruit_NeoPixel.h>




Adafruit_NeoPixel pixel(5, 1, NEO_GRB + NEO_KHZ800);



void update(){
  uint8_t stage = 0;
  uint8_t ammountOfLeds;

  while (true) {

    if (Serial.available() > 0) {

      uint8_t data = Serial.read();
      Serial.println(data);

      if (stage == 0) {
        pixel.setPin(data);
        stage++;
      } else if (stage == 1) {
        pixel.updateLength(data);
        ammountOfLeds = data;
        break;
      }

    }
  }
  Serial.println("Colors");

    for (uint8_t i = 0; i < ammountOfLeds; i++) {
      uint8_t color[3];
      for (uint8_t x = 0; x < 3; x++) {
        while (Serial.available() <= 0) {}

        uint8_t data = Serial.read();
        color[x] = data;
      }

      pixel.setPixelColor(i, color[0],color[1],color[2]);

    }

  Serial.println(ammountOfLeds);

  pixel.show();

}




void setup() {

  Serial.begin(500000,SERIAL_8E2 );
  pixel.begin();


  update();

  Serial.println("ready");

}

void loop() {

  

  

  if(Serial.available() > 0){
    update();
  }


}



