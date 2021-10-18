
let mbShader: p5.Shader
let blurShader: p5.Shader
let w = 10
let h = 10

let x = 0.5
let y = 0
let zoom = 4.05
let iterations = 100
let mb: p5.Graphics
let blr: p5.Graphics
let cpuMode: boolean = false 
let resY: number, resX: number


let mbImg: p5.Image;

//used to verify if this script is loaded for github pages
const loaded = () => true


const preload = () => {
  mbShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/uniform.frag');
  blurShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/blur.frag')
}

const setup = () => {
  cpuMode = location.search.includes('cpu')
  w = windowWidth
  h = windowHeight
  createCanvas(w, h)
  mbImg = createImage(w, h)
  mb = createGraphics(w, h, WEBGL);
  blr = createGraphics(w, h, WEBGL)
  noStroke()
  resX = w/w
  resY = h/w
  //frameRate(1)
  //noLoop()
}

function draw() {
  if (cpuMode) {
    drawMandelBrot()
    image(mbImg, 0, 0)
  } else {
    mb.shader(mbShader);
    mbShader.setUniform('pos', [x, y])
    mbShader.setUniform('zoom', [zoom, zoom])
    mbShader.setUniform('resolution', [resX, resY])
    mb.rect(0, 0, w, h);
    
    
    blr.shader(blurShader)
    blurShader.setUniform('tex0', mb)
    blr.rect(0, 0, w, h)
  
    image(blr, 0, 0)
  }

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
  w = windowWidth
  h = windowHeight
  resX = w/w
  resY = h/w
  mbImg = createImage(w, h)

}

const drawMandelBrot = () => {
  mbImg.loadPixels()
  for (let i = 0; i < mbImg.pixels.length; i += 4) {
    let n = calculateMB(i/4 % w, floor(i/(4*w)))
    mbImg.pixels[i] =     (n == iterations) ? 0 : (-cos(0.08 * n)+1.0)/2.0 * 255
    mbImg.pixels[i + 1] = (n == iterations) ? 0 : (-cos(0.025*n)+1.0)/2.0 * 255
    mbImg.pixels[i + 2] = (n == iterations) ? 0 : (-cos(0.12 * n)+1.0)/2.0 * 255
    mbImg.pixels[i + 3] = 255
  }
  mbImg.updatePixels()
}

const calculateMB = (xs: number, ys: number) => {
  const multiplyI = (zr: number, zi: number, cr: number, ci: number) => {
    return [
      zr*zr - zi*zi + cr,
      zr*zi+zr*zi + ci
    ]
  }
  let cr = (map(xs, 0, w, 0, 1)-0.5)*resX*zoom-x
  let ci = (map(ys, 0, h, 0, 1)-0.5)*resY*zoom-y
  let zr = 0
  let zi = 0
  for (let i = 0; i < iterations; i++) {
    [ zr, zi ] = multiplyI(zr, zi, cr, ci)
    if (zr**2 + zi**2 > 4) {
      return i
    }
  }
  return iterations
}

//vec2 coord = (vec2(vTexCoord.x, 1.0 - vTexCoord.y) - 0.5)*resolution*zoom;

//vec4 multiply(vec4 a, vec4 b) {
//  return vec4(double_sum(double_mul(a.xy, b.xy), -double_mul(a.zw, b.zw)), double_sum(double_mul(a.xy, b.zw), double_mul(b.xy, a.zw)));
//}