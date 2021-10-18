var mbShader;
var blurShader;
var w = 10;
var h = 10;
var x = 0.5;
var y = 0;
var zoom = 4.05;
var iterations = 10000;
var mb;
var blr;
var loaded = function () { return true; };
var preload = function () {
    mbShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/uniform.frag');
    blurShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/blur.frag');
};
var setup = function () {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    mb = createGraphics(w, h, WEBGL);
    blr = createGraphics(w, h, WEBGL);
    noStroke();
};
function draw() {
    mb.shader(mbShader);
    mbShader.setUniform('pos', [x, y]);
    mbShader.setUniform('zoom', [zoom, zoom]);
    mbShader.setUniform('resolution', [w / w, h / w]);
    mb.rect(0, 0, w, h);
    blr.shader(blurShader);
    blurShader.setUniform('tex0', mb);
    blr.rect(0, 0, w, h);
    image(blr, 0, 0);
    if (frameCount % 100 === 0) {
        console.log("Framerate:", ceil(frameRate()));
    }
}
function mouseDragged(e) {
    x += e.movementX * zoom / w;
    y += e.movementY * zoom / w;
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
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    mb.resizeCanvas(windowWidth, windowHeight);
    blr.resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=build.js.map