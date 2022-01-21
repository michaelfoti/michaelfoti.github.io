var centerX = 0;
var centerY = 0;
var capture;
var circleMask;
var frameMask;
var frameImg;
var wifeVid;
var vagrantVid;
var wifeLoaded = 0;
var vagrantLoaded = 0;
var frameNum = 0;
var frameTotal = 100;
var enableExport = 1;

function preload() {
  wifeVid = createVideo("wife_movie.mp4", afterWifeVidLoad);
  vagrantVid = createVideo("vagrant_movie.mp4", afterVagrantVidLoad);
}

function afterWifeVidLoad() {
  wifeVid.hide();
  wifeVid.size(260);
  wifeVid.loop();
  wifeLoaded = 1;
}

function afterVagrantVidLoad() {
  vagrantVid.hide();
  vagrantVid.size(310);
  vagrantVid.loop();
  vagrantLoaded = 1;
}

function setup() {
  createCanvas(640, 480);
  centerX = width / 2;
  centerY = height / 2;
  capture = createCapture(VIDEO);
  capture.size(320, 480);
  capture.hide();
  triangleMask = createGraphics(640, 480);
  frameMask = createGraphics(640, 480);
  frameImg = createGraphics(640, 480);
}

function draw() {
  background(0);
  noStroke();
  fill(255, 255, 255);

  triangleMask.fill("rgba(0, 0, 0, 1)");
  triangleMask.triangle(320, 50, 0, 480, 640, 480);
  frameMask.rect(0, 0, 640, 480, 50);
  capture.mask(triangleMask);

  if (wifeLoaded == 1) {
    frameImg.fill(210, 210, 210);
    frameImg.rect(280, 0, 400, 200);
    frameImg.image(wifeVid, 410, 0);
  }
  if (vagrantLoaded == 1) {
    frameImg.image(vagrantVid, 0, -60);
  }

  frameImg.noStroke();
  var x = 1;
  for (var j = 1; j < 10; j++) {
    var k = j * 10;
    frameImg.fill(0, 0, 0, k);
    frameImg.triangle(270 + x, 50 - 50, -100 + x, 480 + 50, 580 + x, 480 + 50);
    x = x + 4;
  }

  var x = 1;
  var k = 10;
  for (var j = 10; j > 0; j--) {
    frameImg.fill(0, 0, 0, k);
    frameImg.triangle(340 - x, 0, 0 - x, 480, 700 - x, 480);
    x = x + 4;
    k = k + 10;
  }

  frameImg.image(capture, centerX - 320, centerY - 240, 640, 480);
  var maskedFrameImg = frameImg.get();
  maskedFrameImg.mask(frameMask);
  image(maskedFrameImg, centerX - 320, centerY - 240, 640, 480);

  filter(GRAY);

  if (
    enableExport == 1 &&
    wifeLoaded == 1 &&
    vagrantLoaded == 1 &&
    capture.loadedmetadata &&
    frameNum < frameTotal
  ) {
    exportFrame();
    frameNum++;
  }
}

function exportFrame() {
  saveCanvas("myCanvas_" + frameNum, "jpg");
  return false;
}
