const {
  profile
} = require('console');
const fs = require('fs')

var profiles;


fs.readFile('profiles.json', 'utf-8', (err, data) => {
  profiles = JSON.parse(data);
})

/*
var SerialPort = require("serialport");

var port = 3000;

var arduinoCOMPort = "COM8";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
 baudRate: 9600
});

    
  arduinoSerialPort.write("on");
*/



//Menu Genarate Funtions



// Reading data in utf-8 format
// which is a type of character set.
// Instead of 'utf-8' it can be 
// other character set also like 'ascii'




function menu(num) {
  if (num == 0) {
    fs.readFile(__dirname + '\\MenuHtml\\DefineDevice.html', 'utf-8', (err, data) => {
      document.getElementById("menu").innerHTML = data;
    })
  }

  if (num == 1) {
    fs.readFile(__dirname + '\\MenuHtml\\EditDefine.html', 'utf-8', (err, data) => {
      document.getElementById("menu").innerHTML = data;

      for (let i = 0; i < profiles.last.devices.length; i++) {
        document.getElementById("devices").innerHTML +=  "<img onclick=\"removeDevice(" + i + ")\" style=\" cursor: pointer; margin-right:10px\" width=12px src=\"trashcan.png\"> <span style=\"cursor: pointer;\" onclick=\"DeviceMenu(" + i + ")\" id=\"device-" + i + "\">" + profiles.last.devices[i].name + "</span><br>"
      }

    })
  }

  if (num == 2) {
    fs.readFile(__dirname + '\\MenuHtml\\Settings.html', 'utf-8', (err, data) => {
      document.getElementById("menu").innerHTML = data;
    })
  }

  if (num == 3) {
    fs.readFile(__dirname + '\\MenuHtml\\Profile.html', 'utf-8', (err, data) => {
      document.getElementById("menu").innerHTML = data;

      document.getElementById("profileName").innerHTML = profiles.last.name

      for (let i = 0; i < profiles.profiles.length; i++) {
        document.getElementById("profiles").innerHTML +=
          "<img onclick=\"removeProfile(" + i + ")\" style=\"width: 12px; margin-right: 15px;cursor: pointer;\" src=\"trashcan.png\"> | " +
          "<span onclick=\"changeProfile(" + i + ")\" style=\"cursor: pointer;\">" +
          profiles.profiles[i].name + "</span><br>";
      }
    })
  }

}

function removeDevice(index){
  profiles.last.devices.splice(index, 1)

  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    menu(1)
  }); 

  
}

function AddSection(index) {
  profiles.last.devices[index].sections.push({
    name:document.getElementById("AddSectionName").value,
    ledCords:[0,1],
    pattern:"Rainbow",
    colors:["#ff0000","#ff0000","#ff0000","#ff0000"]
  })

  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    DeviceMenu(index)
  }); 
}


function DeviceMenu(index) {

  if (document.getElementById("deviceMenu") != undefined) {
    document.getElementById("deviceMenu").remove()
  }

  var HTML = "<div id=\"deviceMenu\" class=\"deviceMenu\" style=\"margin-left: 75px;\">"

  /*
    
      

  */

  for (let i = 0; i < profiles.last.devices[index].sections.length; i++) {

    HTML += profiles.last.devices[index].sections[i].name + "<br>" +

        "<div class=\"container\">"+
          "<div class=\"columns\">"+
            "<div  class=\"column col-4\">"+
            "Name <br>"+
            "Led Cords From <br>"+
            "Pattern <br>" +
            "Colors <br>" +

            "</div>"+

            "<div id=\"menu\" class=\"column col-8\">"+
            "<input id=\"name-"+ i +"\" value=\""+ profiles.last.devices[index].sections[i].name +"\" type=\"text\" style=\"width: 250px;\"><br>"+
            

            "<input value=\"" + profiles.last.devices[index].sections[i].ledCords[0] + "\" id=\"ledCordsFrom-"+ i +"\" type=\"number\" style=\"width: 50px;\"> To <input value=\"" + profiles.last.devices[index].sections[i].ledCords[1] + "\" id=\"ledCordsTo-"+ i +"\" type=\"number\" style=\"width: 50px;\"><br>" +

            "<input id=\"name-"+ i +"\" value=\""+ profiles.last.devices[index].sections[i].name +"\" type=\"text\" style=\"width: 250px;\"><br>"+

            "<select style=\"width: 150px;\" id=\"pattern-" + i + "\"> " +
            "<option " + (function(){if(profiles.last.devices[index].sections[i].pattern == "Rainbow"){return "selected";}else{return "";}})() + " value=\"Rainbow\">Rainbow</option> " +
            "<option " + (function(){if(profiles.last.devices[index].sections[i].pattern == "Music"){return "selected";}else{return "";}})() + " value=\"Music\">Music</option> " +
            "<option " + (function(){if(profiles.last.devices[index].sections[i].pattern == "Solid"){return "selected";}else{return "";}})() + " value=\"Solid\">Solid</option> </select><br>" +

            "<span>" + 
            "<input value=\"" + profiles.last.devices[index].sections[i].colors[0] + "\" id=\"color1-" + i + "\" type=\"color\">" +
            "<input value=\"" + profiles.last.devices[index].sections[i].colors[1] + "\" id=\"color2-" + i + "\" type=\"color\">" +
            "<input value=\"" + profiles.last.devices[index].sections[i].colors[2] + "\" id=\"color3-" + i + "\" type=\"color\">" +
            "<input value=\"" + profiles.last.devices[index].sections[i].colors[3] + "\" id=\"color4-" + i + "\" type=\"color\">" +
            "</span>" +
            "</div>"+
          "</div>"+
        "</div>" +
        "<button onclick=\"applySection(" + index + "," + i + ")\">Apply</button>"+
        "<button onclick=\"removeSection(" + index + "," + i + ")\">Remove</button>"+
        "<hr>";


  }

  HTML += "<button onclick=\"AddSection(" + index + ")\">Add Section</button><input id=\"AddSectionName\" style=\"margin-left:10px; margin-top:10px;\" type=\"text\"></div>";

  document.getElementById("device-" + index).innerHTML += HTML


  for (let i = 0; i < profiles.last.devices.length; i++) {
    document.getElementById("device-" + i).onclick = function(){DeviceMenu(i)}
  }

  document.getElementById("device-" + index).onclick = null;
}

function applySection(device, section){
  
  profiles.last.devices[device].sections[section] = {
    name:document.getElementById("name-" + section).value,
    ledCords:[document.getElementById("ledCordsFrom-" + section).value,document.getElementById("ledCordsTo-" + section).value],
    pattern:document.getElementById("pattern-" + section).value,
    colors:[document.getElementById("color1-" + section).value,document.getElementById("color2-" + section).value,document.getElementById("color3-" + section).value,document.getElementById("color4-" + section).value]
  }


  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    DeviceMenu(device)
  }); 

}

function removeSection(device, section){
  profiles.last.devices[device].sections.splice(section,1)
  
  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    DeviceMenu(device)
  }); 
}



//Define Device
function defineDevice() {




  profiles.last.devices.push({
    "name": document.getElementById("name").value,
    "pin": document.getElementById("pin"),
    "com": document.getElementById("com"),
    "protocal": document.getElementById("protocal"),

    "sections": []
  })

  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    menu(0)
  });
}

function addProfile() {

  profiles.last = JSON.parse(JSON.stringify(profiles.last))
  profiles.last.name = document.getElementById("name").value
  profiles.profiles.push(profiles.last)


  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    menu(3)
  });
}

function removeProfile(index) {

  profiles.profiles.splice(index, 1)

  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    menu(3)
  });
}

function changeProfile(index) {
  profiles.last = JSON.parse(JSON.stringify(profiles.profiles[index]))
  fs.writeFile("profiles.json", JSON.stringify(profiles), (err) => {
    menu(3)
  });
}