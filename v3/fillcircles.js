
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var circles = [],
    min = 5,
    max = 20,
    initMax = max,
    nbTests = 2,
    maxPlacementAttempts = 1000;

var statistics = [],
    timers = [];

var animFrame;
var stopDrawing = false;
var iterations  = 0;

//console.time();
var timerStart = new Date();

draw()

function draw(){
    //console.time();
    var c = createCircle();
    let attempts = 0;
    while(!isValid(c)){
        if(max <= min){
            break;
        }
        if(attempts == maxPlacementAttempts){
            max--;
        }
        attempts++;
        c.x = Math.random() * 600;
        c.y = Math.random() * 600;
    }
    if(isValid(c)){
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

function createCircle(){
    return {
        x: Math.random() * 600,
        y: Math.random() * 600,
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