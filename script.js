"use strict";
const particlesArray = [];
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
    console.log('mouse', mouse);
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
        this.x = Math.random() * canvas.width || 1;
        this.y = Math.random() * canvas.height || 1;
        // this.x = mouse.x || 0
        // this.y = mouse.y ||  0
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        // creates a 2D vector movement
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        if (!ctx)
            return;
        console.log('mouse', mouse);
        const { x, y } = mouse;
        if (!x || !y)
            return;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}
function initParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();
function handleParticlesUpdate() {
    for (const particle of particlesArray) {
        particle.update();
        particle.draw();
    }
}
console.log(particlesArray);
function animate() {
    if (!ctx || !canvas)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticlesUpdate();
    requestAnimationFrame(animate);
}
animate();
