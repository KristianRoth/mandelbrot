var mbShader;
var blurShader;
var w = 10;
var h = 10;
var x = 0.5;
var y = 0;
var zoom = 4.05;
var iterations = 100;
var mb;
var blr;
var cpuMode = false;
var resY, resX;
var mbImg;
var loaded = function () { return true; };
var preload = function () {
    mbShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/uniform.frag');
    blurShader = loadShader('sketch/shaders/uniform.vert', 'sketch/shaders/blur.frag');
};
var setup = function () {
    cpuMode = location.search.includes('cpu');
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    mbImg = createImage(w, h);
    mb = createGraphics(w, h, WEBGL);
    blr = createGraphics(w, h, WEBGL);
    noStroke();
    resX = w / w;
    resY = h / w;
};
function draw() {
    if (cpuMode) {
        drawMandelBrot();
        image(mbImg, 0, 0);
    }
    else {
        mb.shader(mbShader);
        mbShader.setUniform('pos', [x, y]);
        mbShader.setUniform('zoom', [zoom, zoom]);
        mbShader.setUniform('resolution', [resX, resY]);
        mb.rect(0, 0, w, h);
        blr.shader(blurShader);
        blurShader.setUniform('tex0', mb);
        blr.rect(0, 0, w, h);
        image(blr, 0, 0);
    }
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
    w = windowWidth;
    h = windowHeight;
    resX = w / w;
    resY = h / w;
    mbImg = createImage(w, h);
}
var drawMandelBrot = function () {
    mbImg.loadPixels();
    for (var i = 0; i < mbImg.pixels.length; i += 4) {
        var n = calculateMB(i / 4 % w, floor(i / (4 * w)));
        mbImg.pixels[i] = (n == iterations) ? 0 : (-cos(0.08 * n) + 1.0) / 2.0 * 255;
        mbImg.pixels[i + 1] = (n == iterations) ? 0 : (-cos(0.025 * n) + 1.0) / 2.0 * 255;
        mbImg.pixels[i + 2] = (n == iterations) ? 0 : (-cos(0.12 * n) + 1.0) / 2.0 * 255;
        mbImg.pixels[i + 3] = 255;
    }
    mbImg.updatePixels();
};
var calculateMB = function (xs, ys) {
    var _a;
    var multiplyI = function (zr, zi, cr, ci) {
        return [
            zr * zr - zi * zi + cr,
            zr * zi + zr * zi + ci
        ];
    };
    var cr = (map(xs, 0, w, 0, 1) - 0.5) * resX * zoom - x;
    var ci = (map(ys, 0, h, 0, 1) - 0.5) * resY * zoom - y;
    var zr = 0;
    var zi = 0;
    for (var i = 0; i < iterations; i++) {
        _a = multiplyI(zr, zi, cr, ci), zr = _a[0], zi = _a[1];
        if (Math.pow(zr, 2) + Math.pow(zi, 2) > 4) {
            return i;
        }
    }
    return iterations;
};
//# sourceMappingURL=build.js.map