let angle = 0;
let randomArr = [];
let max_size = 30;
let min_size = 10;
let max_box = 700;
let nb_sph = 2000;

function setup() {
  createCanvas(1300, 1200, WEBGL);
  //translate(width/2,height/2,-1000);
  translate(0,0,0);

  for(let i=0; i < nb_sph;i++){
    randomArr[i] = getNewSphere();
    
    //console.log(randomArr[i]);
  }
  frameRate(60);
}

function draw() {
  background(55);
  translate(0,0,0);
  noFill();
  stroke(255);
  strokeWeight(4);
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005);
  rotateZ(frameCount * 0.005);
  box(max_box);
  for(let i=0; i<randomArr.length; i++){
    push();
    if(!isValid(randomArr[i])){
      //Pas valide
      // randomArr[i].x = parseInt(random(-130,130));
      // randomArr[i].y = parseInt(random(-130,130));
      // randomArr[i].z = parseInt(random(-130,130));
      //console.log("pasvalide");
    }
    translate(randomArr[i].x,randomArr[i].y,randomArr[i].z);
    noStroke();
    fill('green');
    sphere(randomArr[i].s);
    pop();
  }
}

function getNewSphere(){

  let new_sph = {
    x: parseInt(random(-(max_box/2-max_size/2),(max_box/2-max_size/2))),
    y: parseInt(random(-(max_box/2-max_size/2),(max_box/2-max_size/2))),
    z: parseInt(random(-(max_box/2-max_size/2),(max_box/2-max_size/2))),
    s: parseInt(random(min_size,max_size))
  }

  while(!isValid(new_sph)){
    new_sph.x = parseInt(random(-(max_box/2-max_size/2),(max_box/2-max_size/2)));
    new_sph.y = parseInt(random(-(max_box/2-max_size/2),(max_box/2-max_size/2)));
    new_sph.z = parseInt(random(-(max_box/2-max_size/2),(max_box/2-max_size/2)));
    //console.log("changed");
  }

  return {
    x: new_sph.x,
    y: new_sph.y,
    z: new_sph.z,
    s: new_sph.s
  }
}

function isValid(sph) {
  
  for (const other of randomArr) {
      var dx = other.x - sph.x,
          dy = other.y - sph.y,
          dz = other.z - sph.z,
          dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          // console.log(dist)
          // console.log(sph.s)
          // console.log(other.s)
          // console.log((sph.s)/2 + (other.s)/2)
      if (dist < (sph.s)/2 + (other.s)/2) {
          return false;
      }
  }
  return true;
}

function getDistance(x1, y1, z1, x2, y2, z2) {
  return Math.hypot(x2-x1, y2-y1, z2-z1);
}

