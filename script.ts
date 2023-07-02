
let particlesArray: Particle[] = []
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
  growthDirection: "grow" | "shrink"
  constructor() {
    this.x = Math.random() * canvas!.width || 1
    this.y = Math.random() * canvas!.height || 1
    // this.x = mouse.x || 0
    // this.y = mouse.y ||  0
    this.size = Math.random() * 25 + 15
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.growthDirection = "shrink"
  }
  update() {
    // creates a 2D vector movement
    this.x += this.speedX
    this.y += this.speedY
    this.size -= 0.1
  }
  draw() {
    if (!ctx) return
    const { x, y } = mouse
    if (!x || !y) return
    ctx.fillStyle = 'grey'
    ctx.strokeStyle = Math.random() > 0.8 ? 'red' : 'blue'
    ctx.lineWidth = 3 * Math.random()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
  growOrShrink() {
    if (this.size > 25) this.growthDirection = "shrink"
    if (this.size < 0.2) this.growthDirection = "grow"
    if (this.growthDirection === "grow")  this.size += 0.1
    else this.size -= 0.1
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
  for (const [i, particle] of particlesArray.entries()) {
    particle.update()
    particle.draw()
    if (particle.size < 0.3){
      particlesArray.splice(i, 1)
    }
  }
}

let currentTime = performance.now();
const animate: FrameRequestCallback = (timeStamp: number) => {
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