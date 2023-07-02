"use strict";
let particlesArray = [];
let clearCanvas = true;
let hue = 0;
const canvas = document.getElementById('canvas1');
if (!canvas)
    throw console.error("No canvas found");
const ctx = canvas.getContext('2d');
if (!ctx)
    throw console.error("No canvas ctx found");
const gW = window.innerWidth;
const gH = window.innerHeight;
setCanvasToWindow(canvas);
window.addEventListener('resize', (e) => {
    setCanvasToWindow(canvas);
});
const mouse = { x: null, y: null };
window.addEventListener('mousemove', addToParticleArray);
window.addEventListener('touchstart', addToParticleArray);
window.addEventListener('touchmove', addToParticleArray);
function addToParticleArray(e) {
    if (e instanceof MouseEvent) {
        mouse.x = e.x;
        mouse.y = e.y;
    }
    else {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
    // trailing
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle());
    }
}
window.addEventListener('mousedown', (e) => {
    clearCanvas = !clearCanvas;
    mouse.x = e.x;
    mouse.y = e.y;
    // exploding
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
});
// Helper Functions
function setCanvasToWindow(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function drawRectangle(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 20, 150, 50);
}
function drawCircle(ctx, mouse) {
    const { x, y } = mouse;
    if (!x || !y)
        return;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}
function paintCircle(e) {
    if (!ctx)
        return;
    mouse.x = e.x;
    mouse.y = e.y;
    const { x, y } = e;
    drawCircle(ctx, { x, y });
}
class Particle {
    constructor() {
        // this.x = Math.random() * canvas!.width || 1
        // this.y = Math.random() * canvas!.height || 1
        this.x = mouse.x || 0;
        this.y = mouse.y || 0;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.growthDirection = "shrink";
        this.color = `hsl(${hue}, 100%, 60%)`;
    }
    update() {
        // creates a 2D vector movement
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.2;
    }
    draw() {
        if (!ctx)
            return;
        const prideColors = [
            'red', 'orange', 'yellow', 'green', 'blue', 'purple'
        ];
        const { x, y } = mouse;
        if (!x || !y)
            return;
        // ctx.fillStyle = prideColors[particlesArray.length % prideColors.length]
        // ctx.strokeStyle = prideColors[Math.round(Math.random() * prideColors.length )]
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3 * Math.random();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    growOrShrink() {
        if (this.size > 25)
            this.growthDirection = "shrink";
        if (this.size < 0.2)
            this.growthDirection = "grow";
        if (this.growthDirection === "grow")
            this.size += 0.1;
        else
            this.size -= 0.1;
    }
}
function handleParticlesUpdate() {
    for (const [i, particle] of particlesArray.entries()) {
        particle.update();
        particle.draw();
        if (particle.size < 0.3) {
            particlesArray.splice(i, 1);
        }
        // comparison of particles
        for (let j = i; j < particlesArray.length; j++) {
            const distance = pythagorean(particle, particlesArray[j]);
            if (distance < 100) {
                if (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.strokeStyle = particle.color;
                    ctx.lineWidth = particle.size / 10;
                    ctx.stroke();
                }
            }
        }
    }
}
let currentTime = performance.now();
const animate = (timeStamp) => {
    if (clearCanvas) {
        // clear whole canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // fade canvas - draws a new canvas with fillstyle with opacity on each animate
        // ctx.fillStyle = 'rgba(40, 40, 40, 0.05)'
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    handleParticlesUpdate();
    currentTime = timeStamp;
    hue += 5;
    requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
function pythagorean(node1, node2) {
    // measures distance between nodes, using pythagorean´s theory
    // assuming a 90º right angle between node distances
    const distanceX = node1.x - node2.x;
    const distanceY = node1.y - node2.y;
    // the formula
    const hypothenuseDistance = Math.sqrt((distanceX * distanceX) - (distanceY * distanceY));
    return hypothenuseDistance;
}
