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
    aVertexNormalId: -1,
    aVertexTextureCoordId: -1,
    uModelViewMatrixId: -1,
    uProjectionMatrixId: -1,
    uNormalMatrix: -1,
    uSampler2DId: -1,
    uEnableTextureId: -1,
    uEnableLightingId: -1,
    uLightPositionId: -1,
    uLightColorId: -1,
};

var drawingObjects = {
    solidCubeSC: null,
    solidCubeTX: null,
    solidSphereSC: null,
    red: [1, 0, 0],
    green: [0, 1, 0],
    blue: [0, 0, 1],
    yellow: [1, 1, 0],
    teal: [0, 1, 1],
    mangenta: [1, 0, 1],
    lightPosition: [4, 4, 0],
    lightColor: [1.0, 1.0, 1.0],

};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    let canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    drawAnimated(1);
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
    gl.uniform1i(ctx.uEnableLightingId, 1);
    gl.clearColor(0.3, 0.3, 0.3, 1);
}

function defineObjects() {
    drawingObjects.solidCubeSC = new SolidCube(gl, drawingObjects.red, drawingObjects.blue, drawingObjects.green, drawingObjects.yellow, drawingObjects.teal, drawingObjects.mangenta);
    drawingObjects.solidCubeTX = new SolidCube(gl, drawingObjects.red, drawingObjects.blue, drawingObjects.green, drawingObjects.yellow, drawingObjects.teal, drawingObjects.mangenta);
    drawingObjects.solidSphereSC = new SolidSphere(gl, 20, 20, drawingObjects.red)
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.aVertexNormalId = gl.getAttribLocation(ctx.shaderProgram, "aVertexNormal");
    ctx.aVertexTextureCoordId = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.uNormalMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uNormalMatrix");
    ctx.uSampler2DId = gl.getUniformLocation(ctx.shaderProgram, "uSampler")
    ctx.uEnableTextureId = gl.getUniformLocation(ctx.shaderProgram, "uEnableTexture")
    ctx.uEnableLightingId = gl.getUniformLocation(ctx.shaderProgram, "uEnableLighting")
    ctx.uLightPositionId = gl.getUniformLocation(ctx.shaderProgram, "uLightPosition")
    ctx.uLightColorId = gl.getUniformLocation(ctx.shaderProgram, "uLightColor")
}


/**
 * Draw the scene.
 */
function draw(timestamp) {
    console.log('Drawing');
    var modelViewMatrix = mat4.create();
    var projectionMatrix = mat4.create();

    var angle = (timestamp / 800) * Math.PI / 3;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //Added Z-Buffer Clear

    mat4.lookAt(modelViewMatrix, [4, 4, 4], [0, 0, 0], [-2, -2, 2]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    mat4.frustum(projectionMatrix, -1, 1, -1, 1, 2.5, 77);

    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMatrix);

    //normals to shader
    var normalMatrix = mat3.create();
    //gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
    mat3.normalFromMat4(normalMatrix, modelViewMatrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrixId, false, normalMatrix);

    //light to shader
    var lightPositionEye = vec3.create();
    vec3.transformMat4(lightPositionEye, drawingObjects.lightPosition, modelViewMatrix);
    gl.uniform3fv(ctx.uLightPositionId, lightPositionEye);
    gl.uniform3fv(ctx.uLightColorId, drawingObjects.lightColor);

    mat4.translate(modelViewMatrix, modelViewMatrix, [2, 0, 0]);
    mat4.scale(modelViewMatrix, modelViewMatrix, [0.5, 0.5, 0.5]);
    mat4.rotateZ(modelViewMatrix, modelViewMatrix, angle);
    mat3.normalFromMat4(normalMatrix, modelViewMatrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrixId, false, normalMatrix);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
    drawingObjects.solidSphereSC.draw(gl, ctx.aVertexPositionId, ctx.aVertexColorId, ctx.aVertexNormalId);

    mat4.rotateZ(modelViewMatrix, modelViewMatrix, -angle);
    mat4.scale(modelViewMatrix, modelViewMatrix, [2, 2, 2]);
    mat4.translate(modelViewMatrix, modelViewMatrix, [-4, 0, 0]);
    mat4.rotateZ(modelViewMatrix, modelViewMatrix, angle);
    mat3.normalFromMat4(normalMatrix, modelViewMatrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrixId, false, normalMatrix);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
    drawingObjects.solidCubeSC.draw(gl, ctx.aVertexPositionId, ctx.aVertexColorId, ctx.aVertexTextureCoordId, ctx.aVertexNormalId);

    mat4.rotateZ(modelViewMatrix, modelViewMatrix, -angle);
    mat4.translate(modelViewMatrix, modelViewMatrix, [2, -1, 0]);
    mat4.rotateZ(modelViewMatrix, modelViewMatrix, angle);
    mat3.normalFromMat4(normalMatrix, modelViewMatrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrixId, false, normalMatrix);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
    gl.uniform1i(ctx.uEnableTextureId, 1);
    drawingObjects.solidCubeTX.draw(gl, ctx.aVertexPositionId, ctx.aVertexColorId, ctx.aVertexTextureCoordId, ctx.aVertexNormalId);
    gl.uniform1i(ctx.uEnableTextureId, 0);

}

function drawAnimated(timeStamp) {
    draw(timeStamp);
    window.requestAnimationFrame(drawAnimated);
}