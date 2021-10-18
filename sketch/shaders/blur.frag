precision highp float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform sampler2D tex0;
void main() {
  // dvec2 test = dvec2(0.0)
  vec2 uv = (vec2(vTexCoord.x, 1.0 - vTexCoord.y));

  const float Pi = 6.28318530718; // Pi*2
    

  const float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
  const float Quality = 4.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
  const float Size = 0.5; // BLUR SIZE (Radius)

  vec2 Radius = Size/vec2(1000);
  vec4 Color = texture2D(tex0, uv);
  
  // Blur calculations
  for (float d=0.0; d<Pi; d+=Pi/Directions) {
    for (float i=1.0/Quality; i<=1.0; i+=1.0/Quality) {
      Color += texture2D( tex0, uv+vec2(cos(d),sin(d))*Radius*i);		
    }
  }
  
  // Output to screen
  Color /= Quality * Directions - 15.0;
  gl_FragColor =  Color;
  
}