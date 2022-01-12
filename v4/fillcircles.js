
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var circles = [],
    min = 1,
    max = 15;

var statistics = [];

var animFrame;
var stopDrawing = false;
var iterations  = 0;

console.time();
draw(ctx)

function draw(context){
    let d = max;
    let c = createCircle();
    
    while(!isValid(c)) {
        if (--d < min) break;
        else c = createCircle(d);
        break;
    }

    if(isValid(c)){
        circles.push(c);
        drawCircle(context,c);
    }
    animFrame = requestAnimationFrame(() => draw(context));  
}

function isValid(circle) {
    // Overlap bounds?
    if (isOutOfBounds(circle)) return false;
 
    // Overlap between circles?
    for (const other of circles) {
        const distance = getDistance(circle.x, circle.y, other.x, other.y);
        if (distance < circle.r + other.r) {
            return false;
        }
    }

    return true;
}
function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x2-x1, y2-y1)
}

function isOutOfBounds(c) {
    if (c.x - c.r < 0 || c.x + c.r > canvas.width || c.y - c.r < 0 || c.y + c.r > canvas.height) return true;
    return false;
}

function createCircle(d) {
    const circle = {
        x: Math.floor((Math.random() * canvas.width) + 1),
        y: Math.floor((Math.random() * canvas.width) + 1),
    }
    if (d) {
        Object.assign(circle, {
            r: d / 2,
            d: d
        });
    } else {
        const d_rand = Math.floor(Math.random() * (max - min +1)) + min;
        Object.assign(circle, {
            r: d_rand / 2,
            d: d_rand
        });
    }
    return circle;
}

function drawCircle(context,c){
    context.beginPath();
    context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    context.fill()
}
function SaveStats(){
    iterations++;
    statistics.push(circles.length);
    circles = [];
    if(iterations == 10){
        cancelAnimationFrame(animFrame);
        console.log(statistics);
        
    }
    else{
        console.timeEnd();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stopDrawing = false;
        console.time();
        animFrame = requestAnimationFrame(draw);
    }
    // let csvContent = "data:text/csv;charset=utf-8,";
    // csvContent +=  "In this attempt : " + circles.length + " circles were drawn." + "\r\n";
    // let encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
}