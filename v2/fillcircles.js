let minR = 2;

class Circle {
    constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    }
}

function setup() {
    createCanvas(600, 600);
    N = 2000;
    ellipseMode(RADIUS);
    background(0);
    noLoop();
}

function distSquared(x0, y0, x1, y1) {
    return (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
}

function fillCircle(givenX, givenY, givenR, depth) {
    if (depth < 0) {
    return [];
    }
    let maxR = givenR/2;
    let leftBound = givenX - givenR;
    let rightBound = givenX + givenR;
    let topBound = givenY - givenR;
    let bottomBound = givenY + givenR;
    let circleList = [];
    let subList = [];
    while (maxR >= minR) {
    let r = random(minR, maxR);
    let fits = false;
    let x, y;
    let tries;
    for (tries = 0; tries < 1000 && fits === false; tries++) {
        fits = true;
        x = random(leftBound, rightBound);
        y = random(topBound, bottomBound);
        let j = 0;
        if (distSquared(givenX, givenY, x, y) > (givenR - r) * (givenR - r)) {
        fits = false;
        }
        // if (x - r < 0 || x + r > width || y - r < 0 || y + r > height) {
        //   fits = false;
        // }
        while (j < circleList.length && fits === true) {
        let circle = circleList[j];
        if (distSquared(circle.x, circle.y, x, y) < (r + circle.r) * (r + circle.r)) {
            fits = false;
        }
        j++;
        }
    }
    if (fits === true) {
        let subList = fillCircle(x, y, r, depth - 1);
        circleList.push(new Circle(x, y, r));
        Array.prototype.push.apply(circleList, subList);
    } else {
        maxR--;
    }
    }
    return circleList;
}

function draw() {
    let circleList = fillCircle(width/2, height/2, width/2, 0);
    noStroke();
    for (let i = 0; i < circleList.length; i++) {
    fill(random(25, 255), random(25, 255), random(25, 255));
    ellipse(circleList[i].x, circleList[i].y, circleList[i].r, circleList[i].r);    
    }
}
