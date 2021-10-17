let texcoordShader: p5.Shader;
const w = 1000
const h = 1000

let x = 1
let y = 1

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
  texcoordShader.setUniform('zoom', [2.0, 2.0])
  
  if(frameCount%100 === 0) {
    console.log("Framerate:", ceil(frameRate()))
  }
  
  rect(0,0,w,h);
}

function mouseDragged(e: mouseEvent) {
  x += e.movementX / w
  y += e.movementY / h
  console.log(x, y, e)
  // prevent default
  return false;
}

type mouseEvent = {
  movementX: number,
  movementY: number
}