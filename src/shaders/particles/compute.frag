#include ../utils/perlin4d.glsl

uniform float uTime;
uniform sampler2D uBasePositionTexture;

void main() {
    float lifeTime = 0.25;
    float timeMultiplier = 0.1;
    float noiseMultiplier = 0.04;

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 basePosition = texture2D(uBasePositionTexture, uv);
    vec4 curPosition = texture2D(uPositionTexture, uv);

    float life = mod(uTime * lifeTime + basePosition.w, 1.0);

    if (life < curPosition.w) {
        curPosition = basePosition;
        curPosition.w = 0.0;
    }

    else curPosition.w = life;

    vec4 newPosition = curPosition;
    newPosition.x += noiseMultiplier * cnoise(vec4(curPosition.xyz                   , uTime * timeMultiplier));
    newPosition.y += noiseMultiplier * cnoise(vec4(curPosition.xyz + vec3(1, 2, 3)   , uTime * timeMultiplier));
    newPosition.z += noiseMultiplier * cnoise(vec4(curPosition.xyz + vec3(10, 20, 30), uTime * timeMultiplier));

    gl_FragColor = newPosition;
}