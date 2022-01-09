// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

var circles;
var attempts = 0;

function setup() {
  createCanvas(500, 500);
  circles = [];
  frameRate(60);
}

function draw() {
  background(0);
  //frameRate(20);

  var total = 20;
  var count = 0;

  
  if(attempts == 95){
    noLoop();
    console.log("Stopped with 95% accuracy (means that the script is sure at 95% that there is no available place anymore).")
  }

  while(count < total){
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
      attempts = 0;
    }
    else{
      attempts++;
    }
  }
  

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 2 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var x = random(width);
  var y = random(height);
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
