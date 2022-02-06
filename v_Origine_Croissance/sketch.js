//Code original développé à l'aide d'une vidéo youtube située dans les sources du mémoire. 
//Le fonctionnement y est déroulé, les seules différences avec par exemple la version v_2D est la croissance 
// des rayons ainsi que la classe Cercle considérée comme classe à part entière ici et en tant qu'objet JS dans v_2D. 

var circles;
var attempts = 0;

function setup() {
  createCanvas(500, 500);
  circles = [];
  frameRate(100);
}

function draw() {
  background(0);
  //frameRate(20);

  var total = 5;
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
