var texcoordShader;
var w = 1000;
var h = 1000;
var loaded = function () { return true; };
var preload = function () {
    texcoordShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/uniform.frag');
};
var setup = function () {
    createCanvas(w, h, WEBGL);
    noStroke();
};
function draw() {
    shader(texcoordShader);
    texcoordShader.setUniform('size', [w, h]);
    if (frameCount % 100 === 0) {
        console.log("Framerate:", ceil(frameRate()));
    }
    rect(0, 0, w, h);
}
//# sourceMappingURL=build.js.map