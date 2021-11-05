attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
attribute vec2 aVertexTexture;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uModelMatrix;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main() {
    gl_Position = uProjectionMatrix *  uModelViewMatrix * uModelMatrix * vec4 (aVertexPosition, 1.0);
    vColor = vec4(aVertexColor, 1.0);
    vTextureCoord = aVertexTexture;
}
