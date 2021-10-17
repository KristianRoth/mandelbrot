var texcoordShader;
var w = 1000;
var h = 1000;
var x = 0;
var y = 0;
var zoom = 1.05;
var iterations = 10000;
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
    texcoordShader.setUniform('zoom', [zoom, zoom]);
    texcoordShader.setUniform('iterations', iterations);
    if (frameCount % 100 === 0) {
        console.log("Framerate:", ceil(frameRate()));
    }
    rect(0, 0, w, h);
}
function mouseDragged(e) {
    x += e.movementX * zoom / w;
    y += e.movementY * zoom / h;
    return false;
}
function mouseWheel(e) {
    if (e.deltaY < 0) {
        zoom *= 0.8;
    }
    else {
        zoom /= 0.8;
    }
}
//# sourceMappingURL=build.js.map