//
// Computer Graphics
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
    // add local parameters for attributes and uniforms here
    aVertexPositionId: -1,
    aVertexColorId: -1,
    vertices: 1,
    colors: -1,
};

// we keep all the parameters for drawing a specific object together
var rectangleObject = {
    positionBuffer: -1,
    colorBuffer: -1,
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    // set the clear color here
    gl.clearColor(0.5,0.5,0.5,1);
    
    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    // add code here to get the ids of attributes and uniform variables from the shaders
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";

    // add code here to setup the buffers for drawing an object
    rectangleObject.positionBuffer = gl.createBuffer();
    ctx.vertices = [
        -0.4, -0.4,
        -0.4, 0.4,
        0.4, 0.4,

        -0.4, -0.4,
        0.4, 0.4,
        0.4, -0.4,
// ----------------
        -0.9, -0.9,
        -0.9, -0.4,
        -0.4, -0.4,

        -0.9, -0.9,
        -0.4, -0.4,
        -0.4, -0.9,
// --------------
        0.9, 0.9,
        0.9, 0.4,
        0.4, 0.4,

        0.9, 0.9,
        0.4, 0.4,
        0.4, 0.9,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ctx.vertices), gl.STATIC_DRAW);

    rectangleObject.colorBuffer = gl.createBuffer();
    ctx.colors = [
        0.0,  0.0,  1.0,  1.0,    // blue
        1.0,  0.0,  0.0,  1.0,    // red
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  0.0,  1.0,  1.0,    // blue
        0.0,  1.0,  0.0,  1.0,    // green
        1.0,  0.0,  0.0,  1.0,    // red
//---------------------------------
        0.0,  0.0,  1.0,  1.0,    // blue
        0.0,  0.0,  1.0,  1.0,    // blue
        0.0,  0.0,  1.0,  1.0,    // blue
        0.0,  0.0,  1.0,  1.0,    // blue
        0.0,  0.0,  1.0,  1.0,    // blue
        0.0,  0.0,  1.0,  1.0,    // blue
        //---------------------------------
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  1.0,  0.0,  1.0,    // green
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ctx.colors), gl.STATIC_DRAW);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT); //löscht ganzen Bildschirm
    // add drawing routines here
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.positionBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer); //<-- 1 buffer überobjekt mit unterbuffers! https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL
    gl.vertexAttribPointer(ctx.aVertexColorId, 4, gl.FLOAT, false, 0,0 );
    gl.enableVertexAttribArray(ctx.aVertexColorId);

    gl.drawArrays(gl.TRIANGLES, 0, (ctx.vertices.length/2) );


}