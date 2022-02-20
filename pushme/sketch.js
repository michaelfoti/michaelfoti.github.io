var cWdth = window.innerWidth;
var cHgt = window.innerWidth;

var s1w = 200;
var s1x = s1w/2;
var s1y = cHgt/2;

var s2w = 0;
var s2x = 0;
var s2y = 0;

var i = s1w;
var d = 1;

function setup() {
  createCanvas(window.innerWidth, window.innerWidth);
  
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  if(d == 1){
    i = i+2;
    if(i >= cWdth-40){
      d = 0;
    }
  } else {
    i = i-2;
    if(i <= 40){
      d = 1;
    }
  }
  
  s1w = i;

  fill(255,0, 0);
  s1x = s1w/2;
  s1y = cHgt/2;
  rect(s1x,s1y,s1w);
  
  fill(0,255,0);
  s2w = (cWdth - s1w);
  s2x = (s2w/2) + s1w;
  s2y = cHgt/2;
  rect(s2x,s2y,s2w);
}
