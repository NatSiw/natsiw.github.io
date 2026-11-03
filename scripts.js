let puzzleBox1 = document.getElementById("puzzle-box1");
let puzzleBox2 = document.getElementById("puzzle-box2");
let puzzleBox3 = document.getElementById("puzzle-box3");
let puzzleBox4 = document.getElementById("puzzle-box4");

let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

function getLocation() {
  if (! navigator.geolocation) {
    alert("Sorry, no geolocation available for you!");
  }
  let lat, lon;

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    document.getElementById("latitude").innerText = lat;
    document.getElementById("longitude").innerText = lon;
    map.setView([lat, lon]);
    L.marker([lat, lon]).addTo(map);
  }, (positionError) => {
    console.error(positionError);
  }, {
    enableHighAccuracy: false
  });
}

function getMap() {
  Notification.requestPermission();
  puzzleBox3.replaceChildren();

  for (let target of targets) {
    target.replaceChildren();
  }

  leafletImage(map, function (err, canv) {
    let puzzleBox2 = document.getElementById("puzzle-box2");
    let rasterContext = puzzleBox2.getContext("2d");
    puzzleBox2.width = canv.width;
    puzzleBox2.height = canv.height;
    rasterContext.drawImage(canv, 0, 0);

    let onePuzzleWidth = canv.width/4;
    let onePuzzleHeight = canv.height/4;
    let puzzles = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let onePuzzle = document.createElement("canvas");

        onePuzzle.width = onePuzzleWidth;
        onePuzzle.height = onePuzzleHeight;
        //claude AI suggested to add id to each puzzle so we can check if they are in the right place
        onePuzzle.id = "puzzle-" + (row * 4 + col);
        onePuzzle.draggable = true;

        onePuzzle.addEventListener("dragstart", function(event) {
          event.dataTransfer.setData("text", this.id);
        });

        onePuzzle.getContext("2d").drawImage(canv, col * onePuzzleWidth, row * onePuzzleHeight, onePuzzleWidth, onePuzzleHeight, 0, 0, onePuzzleWidth, onePuzzleHeight);
        puzzles.push(onePuzzle);
      }
    }

    while (puzzles.length > 0) {
      let index = Math.floor(Math.random() * puzzles.length);
      puzzleBox3.appendChild(puzzles[index]);
      puzzles.splice(index, 1);
    }

  });
}

let targets = document.querySelectorAll(".drag-target");
for (let target of targets) {
  target.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  target.addEventListener("drop", function (event) {
    let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));

    //claude AI gave me an idea how to prevent puzzles from overlapping each other
    //(when overlapping, puzzle goes back to puzzle-box3)
    if (this.firstChild !== null) {
      puzzleBox3.appendChild(this.firstChild);
    }

    this.appendChild(myElement)
    arePuzzlesFinished();
  }, false);

}

function arePuzzlesFinished() {
  for (let i = 0; i < 16; i++) {
    let puzzlePlace = targets[i].firstChild;
    if (puzzlePlace === null || puzzlePlace.id !== "puzzle-" + i) {
      return;
    }
  }
  console.debug("Puzzle ukonczone!");
  new Notification("Puzzle ukonczone!");
}
