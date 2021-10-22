attribute vec3 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelMatrix;

void main() {
    vec4 position = uModelMatrix * vec4(aVertexPosition, 1);
    gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}