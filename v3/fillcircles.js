
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var circles = [],
    min = 1,
    max = 15;

var statistics = [];

var animFrame;
var stopDrawing = false;
var iterations  = 0;

draw()

function finished(){
    console.log("x")
}
function draw(){
    var c = createCircle();
    let attempts = 0;
    while(!isValid(c)){
        if(attempts == 950){
            stopDrawing = true;
            break;
        }
        attempts++;
        //console.log(attempts)
        c.x = Math.random() * 600;
        c.y = Math.random() * 600;
    }
    if(!stopDrawing){
        circles.push(c);
        drawCircle(c);
        animFrame = requestAnimationFrame(draw);
    }
    else{
        console.log("In this attempt : " + circles.length + " circles were drawn.")
        SaveStats();
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
        r: 20
        //r: Math.floor((Math.random() * max)  +  min)
    }
}

function drawCircle(c){
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill()
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stopDrawing = false;
        animFrame = requestAnimationFrame(draw);
    }
    // let csvContent = "data:text/csv;charset=utf-8,";
    // csvContent +=  "In this attempt : " + circles.length + " circles were drawn." + "\r\n";
    // let encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
}