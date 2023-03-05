#include ../utils/perlin3d.glsl;

uniform float uTime;

void main() {
    float uvMultiplier = 1.0;
    float timeMultiplier = 0.5;
    float noiseMultiplier = 0.01;
    
    vec3 localPosition = position;
    localPosition.x += noiseMultiplier * cnoise(vec3(uv * uvMultiplier             , uTime * timeMultiplier));
    localPosition.y += noiseMultiplier * cnoise(vec3(uv * uvMultiplier + vec2(2, 4), uTime * timeMultiplier));

    vec4 modelViewPosition = viewMatrix * modelMatrix * vec4(localPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}