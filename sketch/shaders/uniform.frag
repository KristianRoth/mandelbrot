precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float emap(float value) {
  return map(value, 0.0, 255.0, 0.0, 1.0);
}

void main() {

  vec2 coord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);

  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  
}