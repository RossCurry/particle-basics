"use strict";
let particlesArray = [];
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
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
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
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.growthDirection = "shrink";
    }
    update() {
        // creates a 2D vector movement
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.1;
    }
    draw() {
        if (!ctx)
            return;
        const { x, y } = mouse;
        if (!x || !y)
            return;
        ctx.fillStyle = 'grey';
        ctx.strokeStyle = Math.random() > 0.8 ? 'red' : 'blue';
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
    }
}
let currentTime = performance.now();
const animate = (timeStamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticlesUpdate();
    currentTime = timeStamp;
    requestAnimationFrame(animate);
    // const elapsedMs = timeStamp - currentTime
    // if (elapsedMs > 0) {
    //   if (!ctx || !canvas) return
    // }
    // requestAnimationFrame(animate)
};
requestAnimationFrame(animate);
