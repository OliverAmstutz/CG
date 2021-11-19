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

const float ambientFactor = 0.2;
const float shininess = 10.0;//Tief = plastik // Hoch = Metallisch
const vec3 specularMaterialColor = vec3(0.4, 0.4, 0.4);//Anteil der spiegelnden Reflektion in den verschiednen Farbkanälen // zusammen sollte es nicht viel mehr als 1 sein!
//Wichtig! Die Farbe der Spiegelung hängt von der Lichtquelle ab, bzw kann mit diesem Faktor beeinflusst werden

void main() {
    //In Fragment shader is everything already in camera coordinate system
    vec3 baseColor = vColor;
    if (uEnableTexture) {
        baseColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
    }

    if (uEnableLighting) {
        // calculate light direction as seen from the vertex position
        vec3 lightDirectionEye = normalize(uLightPosition-vVertexPositionEye3);
        //vec3 lightDirectionEye = normalize(uLightPosition - vVertexPositionEye3);
        vec3 normal = normalize(vNormalEye);

        // ambient lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        // diffuse lighting
        float cos_angle = clamp(dot(normal, lightDirectionEye), 0.0, 1.0);
        vec3 diffuseColor = baseColor.rgb *uLightColor * cos_angle;

        // specular lighting
        float diffuseFactor = 0.5;
        vec3 specularColor = vec3(0, 0, 0);

        if (diffuseFactor > 0.0) {
            vec3 reflectionDir = normalize(reflect(lightDirectionEye, normal));
            vec3 eyeDir = normalize(vVertexPositionEye3);
            float cosPhi = clamp(dot(reflectionDir, eyeDir), 0.0, 1.0);
            float specularFactor = shininess;
            specularColor = normalize(specularMaterialColor+uLightColor)*pow(cosPhi, specularFactor);
        }

        vec3 color = ambientColor+ diffuseColor + specularColor;
        //vec3 color = specularColor;
        gl_FragColor = vec4(color, 1.0);
    }
    else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}