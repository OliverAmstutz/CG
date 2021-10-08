attribute vec2 aVertexPosition;
uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

void main() {
    //gl_Position = vec4((uProjectionMatId * uModelMatId * vec3(aVertexPosition, 1)).xy, 0, 1);
    vec3 pos = uProjectionMat * uModelMat * vec3(aVertexPosition, 1);
    gl_Position = vec4(pos.xy / pos.z, 0, 1);
}