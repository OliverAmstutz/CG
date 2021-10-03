precision mediump float;
//vec4 aColor = vec4(1.0, 1.0, 1.0, 1.0);
//uniform vec4 uColor; //Uniform Color
varying vec4 vColor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
    //gl_FragColor = vec4(0.7, 0.3, 0.1, 0.5); //RGBA
    //gl_FragColor = uColor; //Uniform Color
    //gl_FragColor = vColor;
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}