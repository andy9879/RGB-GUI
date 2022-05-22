#include <FastLED.h>

#include <string.h>

#include <Arduino.h>

#include <Adafruit_NeoPixel.h>



  



void setup() {

  Serial.begin(9600);
  
  pinMode(13,OUTPUT);


}

void loop() {

  if(Serial.available() > 0){
    if(Serial.read() == 5){
      digitalWrite(13,HIGH);
      while(true){}
    }
  }

  digitalWrite(13,HIGH);
  delay(100);
  digitalWrite(13,LOW);
  delay(100);

}



