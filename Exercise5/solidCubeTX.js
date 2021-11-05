/**
 * Solid Cube SC (Side Color)
 */
function SolidCubeTX(gl) {

    /*     7__________6
          /|         /|
         3_|________2 |
         | |        | |
         | 4________|_5
         |/_________|/
        0           1            */


    function defineVertices(gl) {
        // define the vertices of the cube We need 3 Vertices for every corner in order ro fill the sides with a color
        var vertices = [
            // Square 1 (Front)     corner  index
            0.5, -0.5, -0.5,        // 0    0
            0.5, 0.5, -0.5,         // 1    1
            0.5, 0.5, 0.5,          // 2    2
            0.5, -0.5, 0.5,         // 3    3
            //Square 2 (Right)      corner  index
            0.5, 0.5, -0.5,         // 1    4
            -0.5, 0.5, -0.5,        // 5    5
            -0.5, 0.5, 0.5,         // 6    6
            0.5, 0.5, 0.5,          // 2    7
            // Square 3 (Back)      corner  index
            -0.5, 0.5, -0.5,        // 5    8
            -0.5, -0.5, -0.5,       // 4    9
            -0.5, -0.5, 0.5,        // 7    10
            -0.5, 0.5, 0.5,         // 6    11
            // Square 4 (Left)      corner  index
            -0.5, -0.5, -0.5,       // 4    12
            0.5, -0.5, -0.5,        // 0    13
            0.5, -0.5, 0.5,         // 3    14
            -0.5, -0.5, 0.5,        // 7    15
            // Square 5 (Top)       corner  index
            0.5, -0.5, 0.5,         // 3    16
            0.5, 0.5, 0.5,          // 2    17
            -0.5, 0.5, 0.5,         // 6    18
            -0.5, -0.5, 0.5,        // 7    19
            // Square 6 (Bottom)    corner  index
            0.5, -0.5, -0.5,        // 0    20
            -0.5, -0.5, -0.5,       // 4    21
            -0.5, 0.5, -0.5,        // 5    22
            0.5, 0.5, -0.5,         // 1    23
        ];


        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    /*         7__________6
              /|         /|
             3_|________2 |
             | |        | |
             | 4________|_5
             |/_________|/
            0           1      */


    function defineSides(gl) {
        // define the sides for the cube, there are 6 Sides each has 2 triangles, each is a fan of 2x3 points
        var vertexIndices = [
            0, 1, 2, 0, 2, 3,       //front  (0,1,2,3)
            4, 5, 6, 4, 6, 7,       //right  (4,5,6,7)
            8, 9, 10, 8, 10, 11,    //back   (8,9,10,11)
            12, 13, 14, 12, 14, 15, //left   (12,13,14,15)
            16, 17, 18, 16, 18, 19,  //top    (16,17,18,19)
            20, 21, 22, 20, 22, 23   //bottom (20,21,22,23)
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);

        return buffer;
    }

    function defineTextureCoordinates(gl) {

        var vertices = [
            // vorne
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // hinten
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // oben
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // unten
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // rechts
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // links
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        return buffer
    }

    /* *
    * Initialize a texture from image
    */
    function initTextures() {
        textures.crate = gl.createTexture();
        cubeImage = new Image();
        cubeImage.onload = function () {
            handleTextureLoaded(cubeImage, textures.crate);
        }
        cubeImage.src = "crate.jpg";
    }

    function handleTextureLoaded(image, texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    var textures = {
        crate: {}
    };

    initTextures()

    return {
        bufferVertices: defineVertices(gl),
        bufferSides: defineSides(gl),
        bufferTexture: defineTextureCoordinates(gl),

        draw: function (gl, aVertexPositionId, aVertexTextureId, uEnableTextureId) {
            // bind the buffer, so that the cube vertices are used
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);
            
            // Enable texture painting
            gl.uniform1i(uEnableTextureId, 1);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textures.crate);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTexture);

            gl.vertexAttribPointer(aVertexTextureId, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexTextureId);


            gl.frontFace(gl.CCW);
            gl.cullFace(gl.BACK);
            gl.enable(gl.CULL_FACE);

            // bind the element array
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferSides);
            gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

            gl.disableVertexAttribArray(aVertexTextureId);
            // disable texture painting
            gl.uniform1i(uEnableTextureId, 0);
        }
    }
}
