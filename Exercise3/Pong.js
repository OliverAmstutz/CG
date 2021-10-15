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
    uColorId: -1,
    uProjectionMatId: -1,
    uModelMatId: -1,
    currentTime: 0
};

// we keep all the parameters for drawing a specific object together
var rectangleObject = {
    buffer: -1
};

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

    gl.clearColor(0.3, 0.3, 0.3, 1);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers() {
    "use strict";
    rectangleObject.buffer = gl.createBuffer();
    var vertices = [
        -50, -50,
        50, -50,
        50, 50,
        -50, 50];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function convertToNormalizedScreenCoordinates() {
    // Set up the world coordinates
    var projectionMat = mat3.create();
    mat3.fromScaling(projectionMat, [2.0 / gl.drawingBufferWidth, 2.0 / gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(ctx.uProjectionMatId, false, projectionMat);
}

function moveAndDrawObject(translation, scale, red, green, blue, alpha) {
    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, translation);
    mat3.scale(modelMat, modelMat, scale);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.uniform4f(ctx.uColorId, red, green, blue, alpha);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    convertToNormalizedScreenCoordinates();

    moveAndDrawObject([paddle1.x, paddle1.y], [paddle1.scaleX, paddle1.scaleY], 0, 0, 1, 1);    //left paddle
    moveAndDrawObject([paddle2.x, paddle2.y], [paddle2.scaleX, paddle2.scaleY], 1, 0, 0, 1);    //left paddle
    moveAndDrawObject([ball.x, ball.y], [ball.scaleX, ball.scaleY], 1, 1, 1, 1);    //left paddle
    moveAndDrawObject([0, 0], [0.02, 8], 1, 1, 1, 0.15); //middle line

}

function drawAnimated(timeStamp) {
    const elapsedTime = timeStamp - ctx.currentTime;
    ctx.currentTime = timeStamp;
    updatePaddlePositions(elapsedTime);
    updateBallPosition(elapsedTime);
    checkGameLogic();
    draw();
    window.requestAnimationFrame(drawAnimated)
}

function updatePaddlePositions(elapsedTime) {
    paddle1.y = newPaddle1PosY = Math.max(Math.min(paddle1.y + paddle1.speed * paddle1.yDir * elapsedTime, 300 - paddle1.height / 2), -300 + paddle1.height / 2);
    paddle2.y = newPaddle2PosY = Math.max(Math.min(paddle2.y + paddle2.speed * paddle2.yDir * elapsedTime, 300 - paddle1.height / 2), -300 + paddle1.height / 2);
}

function updateBallPosition(elapsedTime) {
    var newBallPosX = ball.x + ball.speed * ball.xDir * elapsedTime;
    var newBallPosY = ball.y + ball.speed * ball.yDir * elapsedTime;
    ball.x = newBallPosX;
    ball.y = newBallPosY;
}




