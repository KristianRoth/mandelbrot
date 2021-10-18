precision highp float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform vec2 pos;
uniform vec2 zoom;
uniform vec2 resolution;

vec2 double_set(float a) {
  vec2 z;
  z.x = a;
  z.y = 0.0;
  return z;
}

vec2 double_sum(vec2 dsa, vec2 dsb) {
  vec2 dsc;
  float t1, t2, e;

  t1 = dsa.x + dsb.x;
  e = t1 - dsa.x;
  t2 = ((dsb.x - e) + (dsa.x - (t1 - e))) + dsa.y + dsb.y;

  dsc.x = t1 + t2;
  dsc.y = t2 - (dsc.x - t1);
  return dsc;
}

vec2 double_mul(vec2 dsa, vec2 dsb) {
  vec2 dsc;
  float c11, c21, c2, e, t1, t2;
  float a1, a2, b1, b2, cona, conb, split = 8193.;

  cona = dsa.x * split;
  conb = dsb.x * split;
  a1 = cona - (cona - dsa.x);
  b1 = conb - (conb - dsb.x);
  a2 = dsa.x - a1;
  b2 = dsb.x - b1;

  c11 = dsa.x * dsb.x;
  c21 = a2 * b2 + (a2 * b1 + (a1 * b2 + (a1 * b1 - c11)));

  c2 = dsa.x * dsb.y + dsa.y * dsb.x;

  t1 = c11 + c2;
  e = t1 - c11;
  t2 = dsa.y * dsb.y + ((c2 - e) + (c11 - (t1 - e))) + c21;

  dsc.x = t1 + t2;
  dsc.y = t2 - (dsc.x - t1);

  return dsc;
}

vec4 multiply(vec4 a, vec4 b) {
  return vec4(double_sum(double_mul(a.xy, b.xy), -double_mul(a.zw, b.zw)), double_sum(double_mul(a.xy, b.zw), double_mul(b.xy, a.zw)));
}

float size2(vec4 a) {
  return a.x*a.x + a.y*a.y;
}

vec4 mandelbrot(vec4 a, vec4 c) {
  return multiply(a, a) + c;
}

void main() {
  // dvec2 test = dvec2(0.0)
  vec2 coord = (vec2(vTexCoord.x, 1.0 - vTexCoord.y) - 0.5)*resolution*zoom;

  vec4 c = vec4(double_set(coord.x - pos.x), double_set(coord.y - pos.y));
  vec4 res = vec4(0.0, 0.0, 0.0, 0.0);
  int n = 1000;
  for (int i = 0; i < 1000; i++) {
    res = mandelbrot(res, c);
    if (length(res) < 2.0) {
      n = i;
    }
  }
  if (length(res) < 2.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    gl_FragColor = vec4(
                      (-cos(0.08*float(n))+1.0)/2.0,
                      (-cos(0.025*float(n))+1.0)/2.0,
                      (-cos(0.12*float(n))+1.0)/2.0,
                      1.0);
  }
  
}