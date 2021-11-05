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
let ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    aVertexColorId: -1,
    aVertexTextureId: -1,
    uModelViewMatrixId: -1,
    uProjectionMatrixId: -1,
    uModelMatrixId: -1,
    uSampler2DId: -1,
    uEnableTextureId: -1,
};

var drawingObjects = {
    solidCubeSC: null,
    solidCubeTX: null,

};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    let canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    drawAnimated(1); //window.requestAnimationFrame(drawAnimated);
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    defineObjects();
    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.3, 0.3, 0.3, 1);
}

function defineObjects() {
    drawingObjects.solidCubeSC = new SolidCubeSC(gl);
    drawingObjects.solidCubeTX = new SolidCubeTX(gl);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.aVertexTextureId = gl.getAttribLocation(ctx.shaderProgram, "aVertexTexture");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.uModelMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelMatrix");
    ctx.uSampler2DId = gl.getUniformLocation(ctx.shaderProgram, "uSampler")
    ctx.uEnableTextureId = gl.getUniformLocation(ctx.shaderProgram, "uEnableTexture")
}


/**
 * Draw the scene.
 */
function draw(timestamp) {
    console.log('Drawing');
    var modelViewMatrix = mat4.create();
    var projectionMatrix = mat4.create();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //Added Z-Buffer Clear

    mat4.lookAt(modelViewMatrix, [4, 4, 4], [0, 0, 0], [-2, -2, 2]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    mat4.frustum(projectionMatrix, -1, 1, -1, 1, 2.5, 77);

    var modelMatrix = mat4.create();    //ModelMatrix transformation
    var angle = (timestamp / 800)*Math.PI/3;
    //modelMatrix = mat4.fromZRotation(modelMatrix, angle)
    mat4.fromTranslation(modelMatrix, [0.5,0.0,0])
    //mat4.translate(modelMatrix, modelMatrix, [1,0,0]);
    mat4.rotateZ(modelMatrix, modelMatrix, angle);
    gl.uniformMatrix4fv(ctx.uModelMatrixId, false, modelMatrix);

    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMatrix);
    drawingObjects.solidCubeSC.draw(gl, ctx.aVertexPositionId, ctx.aVertexColorId);


    // TEXTURED CUBE
    let sin = Math.sin(timestamp / 800);
    let cos = Math.cos(timestamp / 800);
    rotz = [cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] //Matrix by hand
    gl.uniformMatrix4fv(ctx.uModelMatrixId, false, rotz);

    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMatrix);
    drawingObjects.solidCubeTX.draw(gl, ctx.aVertexPositionId, ctx.aVertexTextureId, ctx.uEnableTextureId);
}


function drawAnimated(timeStamp) {
    draw(timeStamp);
    window.requestAnimationFrame(drawAnimated);
}