const canvas = document.getElementById('canvas1') as HTMLCanvasElement | null
if (!canvas) throw console.error("No canvas found");
const ctx = canvas.getContext('2d')
if (!ctx) throw console.error("No canvas ctx found");
const gW = window.innerWidth
const gH = window.innerHeight

let paintMode = false

setCanvasToWindow(canvas)
// drawCircle(ctx)

window.addEventListener('resize', (e: UIEvent) => {
  setCanvasToWindow(canvas)
  // drawCircle(ctx)
})

type MouseCoordinates = { x: number | null, y: number | null }
const mouse: MouseCoordinates = { x: null, y: null }

canvas.addEventListener('click', () => paintMode ? removeMouseMoveListener(canvas, ctx) :  addMouseMoveListener(canvas, ctx))


// Helper Functions
function setCanvasToWindow(canvas: HTMLCanvasElement){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function drawRectangle(ctx: CanvasRenderingContext2D){
  ctx.fillStyle = 'white'
  ctx.fillRect(10, 20, 150, 50)
}

function drawCircle(ctx: CanvasRenderingContext2D, mouse: MouseCoordinates) {
  console.log('mouse', mouse)
  const {x,  y} = mouse
  if (!x || !y) return
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.arc(x, y, 50, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2)
}

function addMouseMoveListener(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvas.addEventListener('mousemove', paintCircle, true)
  paintMode = true
}
function removeMouseMoveListener(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvas.removeEventListener('mousemove', paintCircle, true)
  paintMode = false
}

function paintCircle(e:MouseEvent) {
  if (!ctx) return
  mouse.x = e.x
  mouse.y = e.y
  const { x, y } = e 
  drawCircle(ctx, { x, y })
}

function animate() {
  if (!ctx || !canvas) return
  ctx.clearRect(0,0,canvas.width , canvas.height)
  drawCircle(ctx, mouse)
  requestAnimationFrame(animate)
}
animate()