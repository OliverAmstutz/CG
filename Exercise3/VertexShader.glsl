attribute vec2 aVertexPosition;
uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

void main() {
    vec3 pos = uProjectionMat * uModelMat * vec3(aVertexPosition, 1);// vec3(aVertexPosition, 1) transformation to homogenic coordinates (Vector3!)
    gl_Position = vec4(pos.xy / pos.z, 0, 1);
}