
const particlesArray: Particle[] = []
const canvas = document.getElementById('canvas1') as HTMLCanvasElement | null
if (!canvas) throw console.error("No canvas found");
const ctx = canvas.getContext('2d')
if (!ctx) throw console.error("No canvas ctx found");
const gW = window.innerWidth
const gH = window.innerHeight

setCanvasToWindow(canvas)

window.addEventListener('resize', (e: UIEvent) => {
  setCanvasToWindow(canvas)
})

type MouseCoordinates = { x: number | null, y: number | null }
const mouse: MouseCoordinates = { x: null, y: null }

window.addEventListener('mousemove', (e: MouseEvent) => {
  mouse.x = e.x
  mouse.y = e.y
})

// Helper Functions
function setCanvasToWindow(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function drawRectangle(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'white'
  ctx.fillRect(10, 20, 150, 50)
}

function drawCircle(ctx: CanvasRenderingContext2D, mouse: MouseCoordinates) {
  const { x, y } = mouse
  if (!x || !y) return
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.arc(x, y, 50, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
}

function paintCircle(e: MouseEvent) {
  if (!ctx) return
  mouse.x = e.x
  mouse.y = e.y
  const { x, y } = e
  drawCircle(ctx, { x, y })
}

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  constructor() {
    this.x = Math.random() * canvas!.width || 1
    this.y = Math.random() * canvas!.height || 1
    // this.x = mouse.x || 0
    // this.y = mouse.y ||  0
    this.size = Math.random() * 5 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
  }
  update() {
    // creates a 2D vector movement
    this.x += this.speedX
    this.y += this.speedY
  }
  draw() {
    if (!ctx) return
    const { x, y } = mouse
    if (!x || !y) return
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }

}

function initParticles() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(
      new Particle()
    )
  }
}
initParticles()


function handleParticlesUpdate() {
  for (const particle of particlesArray){
    particle.update()
    particle.draw()
  }
}

let currentTime = performance.now();
const  animate: FrameRequestCallback = (timeStamp: number) => {
  console.log('timeStamp', timeStamp)

  const elapsedMs = timeStamp - currentTime
  if (elapsedMs > 0) {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleParticlesUpdate()
    currentTime = timeStamp
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)