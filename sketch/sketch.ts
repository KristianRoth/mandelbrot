let texcoordShader: p5.Shader;
const w = 1000
const h = 1000

let x = 0
let y = 0
let zoom = 1.05
let iterations = 10000

//used to verify if this script is loaded for github pages
const loaded = () => true


const preload = () => {
  texcoordShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/uniform.frag');
}

const setup = () => {
  createCanvas(w, h, WEBGL);
  noStroke()
  //frameRate(1)
  //noLoop()
}

function draw() {
  
  shader(texcoordShader);
  texcoordShader.setUniform('pos', [x, y])
  texcoordShader.setUniform('zoom', [zoom, zoom])
  texcoordShader.setUniform('iterations', iterations)
  
  if(frameCount%100 === 0) {
    console.log("Framerate:", ceil(frameRate()))
  }
  
  rect(0,0,w,h);
}

function mouseDragged(e: MouseEvent) {
  x += e.movementX*zoom / w
  y += e.movementY*zoom / h
  return false;
}


function mouseWheel(e: WheelEvent) {
  if (e.deltaY < 0) {
    zoom *= 0.8
  } else {
    zoom /= 0.8
  }
}


type ScrollEvent = {
  delta: number
}