uniform float uTime;

varying vec2 vUv;

void main() {
    float timeMultiplier = 1.5;
    vec2 displacementFactor = vec2(0.075, 0.05);

    vec3 localPosition = position;
    localPosition.xz += localPosition.y * sin(uTime * timeMultiplier) * displacementFactor;

    vec4 modelViewPosition = viewMatrix * modelMatrix * vec4(localPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    
    vUv = uv;
}