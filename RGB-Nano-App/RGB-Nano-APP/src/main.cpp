#include <FastLED.h>
#include <string.h>
#include <Arduino.h>




// C++ program to illustrate
// array of vectors



// How many leds in your strip?
#define MaxLedsPerDevice 10


#define DATA_PIN 5

#define maxSections 10

#define maxDevices 10


uint32_t tick;

// Define the array of leds



class section{    

  private:
  uint16_t speed;
  uint8_t ledCord[2];
  String color[4];
  String pattern;
  


  public:

    CRGB leds[MaxLedsPerDevice];

    section(){}

    section(uint16_t Speed,String Color[4] ,String Pattern, uint8_t ledCord1, uint8_t ledCord2){
      ledCord[0] = ledCord1;
      ledCord[1] = ledCord2;

      for(int i = 0; i < 4;i++){
        color[i] = Color[i];
      }

      pattern = Pattern;
      speed = Speed;

  }


    void run(uint32_t tick){
      if(tick % speed == 0){
        
        if(pattern = "Rainbow"){
          for(int i = 0; i < 10;i++){
            leds[0];
          }
        }

      }
    }

};


class device{

  private:

    String protocall;


    CRGB leds[MaxLedsPerDevice];

  public:

  uint8_t numOfsections = 0;

  section sections[maxSections];

  device(){}

  device(int pin,String Protocall){

    protocall = Protocall;


    if(protocall == "WS2812B"){

      FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, MaxLedsPerDevice);

    }

    

  }


  void addSection(section section){
    sections[numOfsections] = section;
    
    for(int i = 0; i < 4;i++){
        leds[i] = sections[i].leds;
      }
    numOfsections ++;
  }


};


int numberOfDevices = 0;
device devices[maxDevices];

void setup() {
  Serial.begin(9600);

  Serial.println("test");


  devices[0] = device(5,"WS2812B");

  String colors[4] = {"#ff00ff"};

  devices[0].addSection(section(100,colors,"Rainbow",0,10));


  // ## Clockless types ##

}

void loop() {

  uint32_t tick = 0;

  for(int i = 0; i < maxDevices;i++){
    for(int x = 0; x < maxSections;x++){
      if(x >= devices[i].numOfsections){
        break;
      }else{
        devices[i].sections[x].run(tick);
      }
    }
  }

  FastLED.show();
  tick++;
  delay(1);


  /*
  // Turn the LED on, then pause
  leds[0] = (int)"#0000ff";
  FastLED.show();
  delay(500);
  // Now turn the LED off, then pause
  leds[0] = 0x00ff00;
  FastLED.show();
  delay(500);
  */
}

