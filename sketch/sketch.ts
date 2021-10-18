let mbShader: p5.Shader
let blurShader: p5.Shader
let w = 10
let h = 10

let x = 0.5
let y = 0
let zoom = 4.05
let iterations = 10000
let mb: p5.Graphics
let blr: p5.Graphics
//used to verify if this script is loaded for github pages
const loaded = () => true


const preload = () => {
  mbShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/uniform.frag');
  blurShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/blur.frag')
}

const setup = () => {
  w = windowWidth
  h = windowHeight
  createCanvas(w, h)
  mb = createGraphics(w, h, WEBGL);
  blr = createGraphics(w, h, WEBGL)
  noStroke()
  //frameRate(1)
  //noLoop()
}

function draw() {
  mb.shader(mbShader);
  mbShader.setUniform('pos', [x, y])
  mbShader.setUniform('zoom', [zoom, zoom])
  mbShader.setUniform('resolution', [w/w, h/w])
  mb.rect(0, 0, w, h);
  
  
  blr.shader(blurShader)
  blurShader.setUniform('tex0', mb)
  blr.rect(0, 0, w, h)
  
  
  image(blr, 0, 0)

  if(frameCount%100 === 0) {
    console.log("Framerate:", ceil(frameRate()))
  }
}

function mouseDragged(e: MouseEvent) {
  x += e.movementX*zoom / w
  y += e.movementY*zoom / w
  return false;
}


function mouseWheel(e: WheelEvent) {
  if (e.deltaY < 0) {
    zoom *= 0.8
  } else {
    zoom /= 0.8
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  mb.resizeCanvas(windowWidth, windowHeight)
  blr.resizeCanvas(windowWidth, windowHeight)
}