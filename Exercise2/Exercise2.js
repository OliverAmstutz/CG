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
    aVertexPositionId: -1,//Position per Vertice Attribute
    //aColorId: -1,//Colors per Vertex Attribute
    aVertexTextureCoord: -1,//Texture Vertex Coordinate

    //Uniform Variables
    uSampler2DId: -1,//Uniform sampler2D
    //uColorId: -1,//Uniform Color Id

    //Definition with only 1 buffer (speed improvement)
    /*posAndColor: -1,
    myOnlyBuffer: -1,*/
};

// we keep all the parameters for drawing a specific object together
var rectangleObject = {
    positionBuffer: -1,
    vertices: -1,
    //colorBuffer: -1,
    //colors: -1,
    textureBuffer: -1,
};

var lennaTxt = {
    textureObj: {}
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();

    //draw();
    loadTexture(); //used for texture drawing instead of draw()

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
    gl.clearColor(0.5, 0.5, 0.5, 1);

    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms() {
    "use strict";
    // add code here to get the ids of attributes and uniform variables from the shaders
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    //ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");//Get Vertex Color Id from Fragment shader by varying from Vertex Shader
    ctx.aVertexTextureCoord = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");//get Vertex Texture coordinates Attribute
    //ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");//Get Uniform Color Id from Fragment Shader
    ctx.uSampler2DId = gl.getUniformLocation(ctx.shaderProgram, "uSampler");//Get Uniform Sampler ID
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers() {
    "use strict";

    // add code here to setup the buffers for drawing an object
    setupRectangleAndColorBuffer();

    setupTextureBuffer();

    //setupWithOnlyOneBuffer();
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT); //clears the complete screen

    // add drawing routines here
    //drawRectangleAndColorBuffer();

    drawTexture();

    //drawWithOnlyOneBuffer();
}

function setupRectangleAndColorBuffer() {
    rectangleObject.positionBuffer = gl.createBuffer();
    rectangleObject.vertices = [
        /*1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,*/
        -1.0, -1.0,
        0.0, -1.0,
        0.0, 0.0,
        -1.0, 0.0,
        /*1.0, 1.0,
        -1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0,*/
        /*0.5, 0.5,
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, -0.5,*/
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectangleObject.vertices), gl.STATIC_DRAW);

    /*rectangleObject.colorBuffer = gl.createBuffer();
    rectangleObject.colors = [
        0.0, 0.0, 1.0, 1.0,    // blue
        1.0, 0.0, 0.0, 1.0,    // red
        0.0, 1.0, 0.0, 1.0,    // green
        1.0, 0.0, 0.0, 1.0,    // red
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectangleObject.colors), gl.STATIC_DRAW);*/
}

function drawRectangleAndColorBuffer() {
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.positionBuffer); //sets buffer as the actual buffer
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    // Set Color per vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer(ctx.aColorId, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aColorId);

    //Set Color Uniformly
    //gl.uniform4f(ctx.uColorId, 1.0, 0.0, 0.0, 1.0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, (rectangleObject.vertices.length / 2)); //division 2 due to 2 parameter per vertex
}

function drawTexture() {

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.positionBuffer); //sets buffer as the actual buffer
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
    gl.uniform1i(ctx.uSampler2DId, 0);
    //is this the right location for assigning the buffer?
    gl.vertexAttribPointer(ctx.aVertexTextureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexTextureCoord);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, (rectangleObject.vertices.length / 2)); //division 2 due to 2 parameter per vertex
}

/* *
* Initialize a texture from an image
* @param image the loaded image
* @param textureObject WebGL Texture Object
*/
function initTexture(image, textureObject) {
    // create a new texture
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    // set parameters for the texture
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    // turn texture off again
    gl.bindTexture(gl.TEXTURE_2D, null);
}

/* *
* Load an image as a texture
*/
function loadTexture() {
    var image = new Image();
    // create a texture object
    lennaTxt.textureObj = gl.createTexture();
    image.onload = function () {
        initTexture(image, lennaTxt.textureObj);
        // make sure there is a redraw after the loading of the texture
        draw();
    };
    // setting the src will trigger onload
    image.src = "lena512.png";
}

function setupTextureBuffer() {

    //WebGL forces all the texture coordinates into a 0 to 1 range, where [0, 0] represents the top left-hand side corner of the texture and [1, 1] represents the bottom right-hand side corner
    var textureCoord = [
        /*1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,*/
        0.5, 0.5,
        0.0, 0.5,
        0.0, 0.0,
        0.5, 0.0,
    ];

    rectangleObject.textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);

}

function setupWithOnlyOneBuffer() {
    //with only 1 buffer:
    ctx.posAndColor = [
        -0.4, -0.4, 0.0, 0.0, 1.0, 1.0,    // blue
        -0.4, 0.4, 1.0, 0.0, 0.0, 1.0,    // red
        0.4, 0.4, 0.0, 1.0, 0.0, 1.0,    // green
        0.4, -0.4, 1.0, 0.0, 0.0, 1.0,    // red
    ];
    ctx.myOnlyBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.myOnlyBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ctx.posAndColor), gl.STATIC_DRAW);
}

function drawWithOnlyOneBuffer() {
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.myOnlyBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.vertexAttribPointer(ctx.aColorId, 4, gl.FLOAT, false, 24, 8);
    gl.enableVertexAttribArray(ctx.aColorId);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, (ctx.posAndColor.length / 6)); //Fan-out combines always lines (only 4 points necessary)
}