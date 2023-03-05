uniform vec3 uColor;
uniform float uProgress;

varying vec2 vUv;

void main() {
    float gridDim = 8.0;
    float maxOpacity = 0.85;

    vec2 gridUv = floor(vUv * gridDim) / gridDim;
    float opacity = min(maxOpacity, (uProgress - gridUv.x) * gridDim);

    gl_FragColor = vec4(uColor, opacity);
}