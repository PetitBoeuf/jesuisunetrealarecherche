
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var circles = [],
    min = 2,
    max = 20,
    initMax = max,
    nbTests = 2,
    maxPlacementAttempts = 5000;

var shapeWidth = 1000,
    shapeHeight = 650;


var statistics = [],
    timers = [];

var animFrame;
var stopDrawing = false;
var iterations  = 0;

//console.time();
var timerStart = new Date();

CreateShape()

draw()

function CreateShape(){
    ctx.beginPath();
    ctx.fillStyle= `rgb(255,255,255)`;
    ctx.fillRect((canvas.width - shapeWidth)/2,(canvas.height - shapeHeight) / 2,shapeWidth,shapeHeight);
}
function draw(){
    //console.time();
    var c = CreateCircle();
    let attempts = 0;
    while(!IsValid(c)){
        if(max <= min){
            break;
        }
        if(attempts == maxPlacementAttempts){
            max--;
        }
        attempts++;
        c.x = Math.random() * canvas.width;
        c.y = Math.random() * canvas.height;
    }
    if(IsValid(c)){
        circles.push(c);
        drawCircle(c);
        animFrame = requestAnimationFrame(draw);
    }
    else{
        console.log("In this attempt : " + circles.length + " circles were drawn.")
        SaveStats();
        //cancelAnimationFrame(draw);
        //console.log("Stopped with 95% certainty that there is no more space available.")
    }

}

function IsInShape(c){
    //N
    if(ctx.getImageData(c.x, c.y - c.r, 1, 1).data[0] != 255 ||  ctx.getImageData(c.x, c.y - c.r, 1, 1).data[1] != 255 || ctx.getImageData(c.x, c.y - c.r, 1, 1).data[2] != 255) return false;
    //E
    if(ctx.getImageData(c.x + c.r, c.y, 1, 1).data[0] != 255 ||  ctx.getImageData(c.x + c.r, c.y, 1, 1).data[1] != 255 || ctx.getImageData(c.x + c.r, c.y, 1, 1).data[2] != 255) return false;
    //S
    if(ctx.getImageData(c.x, c.y + c.r, 1, 1).data[0] != 255 ||  ctx.getImageData(c.x, c.y + c.r, 1, 1).data[1] != 255 || ctx.getImageData(c.x, c.y + c.r, 1, 1).data[2] != 255) return false;
    //O
    if(ctx.getImageData(c.x - c.r, c.y, 1, 1).data[0] != 255 ||  ctx.getImageData(c.x - c.r, c.y, 1, 1).data[1] != 255 || ctx.getImageData(c.x - c.r, c.y, 1, 1).data[2] != 255) return false;
    return true;
}

function IsValid(c){

    if(!IsInShape(c)) return false;

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
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        //r: 20
        r:  Math.floor(Math.random() * (max - min +1)) + min
    }
}

function drawCircle(c){
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    ctx.fill();
}
function SaveStats(){
    
    var sortedCircles = new Map();
    for(let indexRadiusGap = min; indexRadiusGap <= initMax; indexRadiusGap++)
        sortedCircles.set(indexRadiusGap, circles.filter(c => c.r === indexRadiusGap).length)
    console.log(sortedCircles);

    iterations++;
    statistics.push(circles.length);
    timers.push(new Date - timerStart);
    circles = [];
    
    //console.log(ctx.getImageData(10,10,1,1).data)

    if(iterations == nbTests){
        cancelAnimationFrame(animFrame);
        let average= 0;
        for(stat of statistics){
            average += stat
        }
        average /= statistics.length;
        console.log(average)
        console.log(statistics);
        console.log(timers);
    }
    else{
        max=initMax;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        CreateShape();
        stopDrawing = false;
        //console.time();
        timerStart = new Date()
        animFrame = requestAnimationFrame(draw);
    }
    // let csvContent = "data:text/csv;charset=utf-8,";
    // csvContent +=  "In this attempt : " + circles.length + " circles were drawn." + "\r\n";
    // let encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
}