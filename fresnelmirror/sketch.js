var centerX = 200;
var centerY = 200;
var capture;
var circleMask;
var snapshots = []; //image array, empty at start
var total = 61; //number of pictures

function setup() {
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  circleMask = createGraphics(640, 480);
}

function draw() {
  background(220);
  noStroke();
  fill(255, 255, 255);

  circleMask.fill("rgba(0, 0, 0, 1)");
  circleMask.circle(320, 240, 480);
  capture.mask(circleMask);

  if (snapshots.length >= total) {
    snapshots.shift();
    var maskedImg = capture.get();
    maskedImg.mask(circleMask);
    snapshots.push(maskedImg);
  } else {
    var maskedImg = capture.get();
    maskedImg.mask(circleMask);
    snapshots.push(maskedImg);
  }

  if (snapshots.length >= 21) {
    image(snapshots[20], centerX - 640, centerY - 480, 1280, 960);
  }
  if (snapshots.length >= 31) {
    image(snapshots[30], centerX - 320, centerY - 240, 640, 480);
  }
  if (snapshots.length >= 51) {
    image(snapshots[50], centerX - 160, centerY - 120, 320, 240);
  }

  var maskedImg = capture.get();
  maskedImg.mask(circleMask);
  image(maskedImg, centerX - 80, centerY - 60, 160, 120);
}

//the code below will save the canvas when you press the s key.
function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("myCanvas", "jpg");
    print("saving image");
  }
  return false;
}
