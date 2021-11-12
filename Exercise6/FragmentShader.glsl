precision mediump float;

uniform bool uEnableTexture;
uniform bool uEnableLighting;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

varying vec3 vColor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

const float ambientFactor = 0.5;
const float shininess = 0.1;
const vec3 specularMaterialColor = vec3(0.4, 0.4, 0.4);

void main() {

    vec3 baseColor = vColor;
    if (uEnableTexture) {
        baseColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
    }

    if (uEnableLighting) {
        // calculate light direction as seen from the vertex position
        vec3 lightDirectionEye = vVertexPositionEye3;
        vec3 normal = normalize(vNormalEye);

        // ambient lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        // diffuse lighting
        float diffuseFactor = shininess;
        vec3 diffuseColor = baseColor.rgb * diffuseFactor * vec3(cos(normal.x), cos(normal.y), cos(normal.z));
/*
        // specular lighting
        vec3 specularColor = vec3(0, 0, 0);
        if (diffuseFactor > 0.0) {
           vec3 reflectionDir = uLightPosition;
           vec3 eyeDir = vNormalEye;
           float cosPhi = cos(normal);
           float specularFactor = 1.0;
           specularColor = reflectionDir*pow(cosPhi,specularFactor);
        }*/

        vec3 color = ambientColor;
        //vec3 color = ambientColor + diffuseColor + specularColor;
        gl_FragColor = vec4(color, 1.0);
    }
    else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}