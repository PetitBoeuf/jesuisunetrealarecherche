
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
draw()

function draw(){
    console.log(circles)
    //console.time();
    var c = CreateCircle();
    let attempts = 0;
    while(!isValid(c)){
        /*
        if(attempts == 1000000){
            stopDrawing = true;
            break;
        }
        */
        if(attempts == 10000){
            max--;
            if (max < 1) stopDrawing = true;
            break;
        }
        attempts++;
        //console.log(attempts)
        c.x = Math.random() * 600;
        c.y = Math.random() * 600;
    }
    if(!stopDrawing){
        circles.push(c);
        //drawCircle(c);
        setTimeout(function() { draw(); }, 20);
    }
    else{
        console.log("over");
        console.log(circles)
        DrawAllCircles();
    }

}

function isValid(c){
    if(c.x - c.r < 0 || c.x + c.r > canvas.width || c.y - c.r < 0 ||c.y + c.r > canvas.height) return false;

    for(let i =0; i< circles.length; i++){
        var dx = circles[i].x - c.x,
            dy = circles[i].y - c.y,
            dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < circles[i].r + c.r){
            return false;
        }
    }

    return true;
}

function CreateCircle(){
    return {
        x: Math.random() * 600,
        y: Math.random() * 600,
        //r: 20
        r:  Math.floor(Math.random() * (max - min +1)) + min
    }
}

function DrawAllCircles(){
    for(let i = 0; i<circles.length; i++){
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    }
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