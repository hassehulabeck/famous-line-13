// Constructor för spårvagn (tram)
function Tram(linje, position, idNummer, direction, color) {
  this.linje = linje;
  this.position = position;
  this.idNummer = idNummer;
  this.direction = direction;
  this.color = color;

  this.move = function() {
    // Om vi är i ena änden, i det här fallet position 12.
    if (this.position == stops.length-1) {
      this.position--;
      this.direction = "Home";
    }
    // Om vi är i andra änden, i det här fallet position 0.
    else if (this.position == 0) {
      this.position++;
      this.direction = "Away";
    }
    else {
      if (this.direction == "Home")
        this.position --;
      else
        this.position ++;
    }
  }

  // En funktion för att visa var spårvagnen befinner sig.
  this.shout = function() {
    if (this.direction == "Home") {
      var prevPosition = this.position + 1;
    }
    else {
      var prevPosition = this.position - 1;
    }
    // Visa var spårvagnen är
    var current = document.getElementById(this.position);
    current.style.backgroundColor = this.color;
    // "Släck" den gamla
    var previous = document.getElementById(prevPosition);
    previous.style.backgroundColor = "white";
  }
}

// Constructor för hållplats (Stop)
function Stop(linje, name) {
  this.linje = linje;
  this.name = name;
}

// Skapa tre spårvagnar.
tram1 = new Tram(13, 1, 1, "Home", "red");
tram2 = new Tram(13, 7, 2, "Away", "yellow");
tram3 = new Tram(13, 11, 3, "Home", "#3377d4");

stopNames = [
  "Sahlgrenska",
  "Medicinaregatan",
  "Wavrinskys plats",
  "Chalmers",
  "Korsvägen",
  "Scandinavium",
  "Ullevi södra",
  "Centralstationen",
  "Nordstan",
  "Frihamnen",
  "Hjalmar Brantingsplatsen",
  "Vågmästareplatsen",
  "Wieselgrensplatsen"
];

// Fyll linje 13 med sina 13 hållplatser.
var stops = [];
stopNames.forEach(function(stop){
  stops.push(new Stop(13, stop));
});

// Skapa ett stall med spårvagnar.
trams = [
  tram1,
  tram2,
  tram3
];

// setInterval kör funktionen loop() var 500:e millisekund.
var timer = setInterval(loop, 500);

// Men stoppar när man klickar på knappen.
var btn = document.querySelector("button");
btn.addEventListener('click', stopTheTraffic);

function stopTheTraffic() {
  clearInterval(timer);
}

function loop() {
  trams.forEach(function(tram){
    tram.move();
    tram.shout();
  });
}
