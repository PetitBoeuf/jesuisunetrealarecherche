const WIDTH = 200;
const HEIGHT = 200;
const D_MAX = 10;
const D_MIN = 5;

const circles = [];

window.addEventListener("load", function(event) {
    const canvas = document.getElementById('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');

    draw(ctx);
});

function draw(ctx) {
    let d = D_MAX;
    let circle = createCircle();
    
    while(!isValid(circle)) {
        if (--d < D_MIN) break;
        else circle = createCircle(d);
        break;
    }
     
    if (isValid(circle)) {
        circles.push(circle);
        drawCircle(ctx, circle);
        showCirclesLength();
    }
    requestAnimationFrame(() => draw(ctx));
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

function isOutOfBounds(c) {
    if (c.x - c.r < 0 || c.x + c.r > WIDTH || c.y - c.r < 0 || c.y + c.r > HEIGHT) return true;
    return false;
}

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x2-x1, y2-y1)
}

function createCircle(d) {
    const circle = {
        x: getRandomIntInclusive(0, WIDTH),
        y: getRandomIntInclusive(0, HEIGHT),
    }
    if (d) {
        Object.assign(circle, {
            r: d / 2,
            d: d
        });
    } else {
        const d_rand = getRandomIntInclusive(D_MIN, D_MAX);
        Object.assign(circle, {
            r: d_rand / 2,
            d: d_rand
        });
    }
    return circle;
}

function drawCircle(ctx, c) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.stroke();
}

function showCirclesLength() {
    const div = document.getElementById("circles");
    for (let i = 0; i <= D_MAX - D_MIN; i++) {
        const d = D_MIN+i;
        let p = document.getElementById(`circles_${d}px`);
        if (!p) {
            p = document.createElement("p");
            p.id = `circles_${d}px`;
        }
        p.innerText = `Circles with diameter ${d}px: ${circles.filter(c => c.d === d).length}`;
        div.appendChild(p);
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}