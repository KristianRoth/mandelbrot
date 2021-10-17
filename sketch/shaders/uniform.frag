precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform vec2 pos;
uniform vec2 zoom;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float emap(float value) {
  return map(value, 0.0, 255.0, 0.0, 1.0);
}

vec2 multiply(vec2 a, vec2 b) {
  return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
}

float size2(vec2 a) {
  return a.x*a.x + a.y*a.y;
}

vec2 mandelbrot(vec2 a, vec2 c) {
  return multiply(a, a) + c;
}

void main() {

  vec2 coord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec2 c = vec2(coord.x - pos.x, coord.y - pos.y);
  vec2 res = vec2(0.0, 0.0);
  for (int i = 0; i < 100; i++) {
    res = mandelbrot(res, c);
  }
  if (size2(res) < 4.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  
}