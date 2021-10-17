var texcoordShader;
var w = 1000;
var h = 1000;
var x = 1;
var y = 1;
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
    texcoordShader.setUniform('pos', [x, y]);
    texcoordShader.setUniform('zoom', [2.0, 2.0]);
    if (frameCount % 100 === 0) {
        console.log("Framerate:", ceil(frameRate()));
    }
    rect(0, 0, w, h);
}
function mouseDragged(e) {
    x += e.movementX / w;
    y += e.movementY / h;
    console.log(x, y, e);
    return false;
}
//# sourceMappingURL=build.js.map