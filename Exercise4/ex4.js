//
// DI Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded

window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uModelViewMatrixId: -1,
    uProjectionMatrixId: -1,
    uModelMatrixId: -1,
    uColorId: -1,
    currentTime: 0,
    cubeAngle: 0,
    cubeRotationSpeed: 0.015, //Rev/Millisecond
};

var wiredCube;

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    window.addEventListener('keyup', onKeyup, false);
    window.addEventListener('keydown', onKeydown, false);

    //draw();
    drawAnimated(1);
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    gl.clearColor(0.5, 0.5, 0.5, 1);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.uModelMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelMatrix");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers() {
    "use strict";
    wiredCube = new WireFrameCube(gl, [1.0, 1.0, 1.0, 0.5]);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    //console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    //cameraStationary();
    cameraDynamic();

    wiredCube.draw(gl, ctx.aVertexPositionId, ctx.uColorId, ctx.cubeAngle);
}

function cameraStationary() {
    var modelMatrix = mat4.create();
    mat4.lookAt(modelMatrix, [1.5, 0.75, 1.5], [0, 0, 0], [0, 1.5, 0]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelMatrix);

    var projectionMatrix = mat4.create();
    //mat4.ortho(projectionMatrix, -1, 1, -1, 1, 0.1, 10); //relative
    //mat4.frustum(projectionMatrix, -1, 1, -1, 1, 1, 9); //relative

    var angleInRad = 45 * Math.PI / 180;
    mat4.perspective(projectionMatrix, angleInRad, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 20); //relative

    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMatrix);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

function drawAnimated(timeStamp) {
    const elapsedTime = timeStamp - ctx.currentTime;
    ctx.currentTime = timeStamp;
    moveCube(elapsedTime);
    draw();
    window.requestAnimationFrame(drawAnimated)
}

function moveCube(elapsedTime) {
    ctx.cubeAngle = (ctx.cubeAngle + (elapsedTime * ctx.cubeRotationSpeed)) % 360;
}

function cameraDynamic() {
    var modelMatrix = mat4.create();
    mat4.lookAt(modelMatrix, [1.5, 0.75, 1.5], [0, 0, 0], [0, 1.5, 0]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelMatrix);

    var projectionMatrix = mat4.create();
    var angleInRad = 45 * Math.PI / 180;
    mat4.perspective(projectionMatrix, angleInRad, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 20); //relative

    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMatrix);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}
