uniform sampler2D uPositionTexture;
uniform float uParticleSize;

void main() {
    vec4 curPosition = texture2D(uPositionTexture, uv);
    float life = curPosition.w;

    vec4 modelViewPosition = viewMatrix * modelMatrix * vec4(curPosition.xyz, 1.0);

    float scale = life < 0.5 ? 2.0 * life : (1.0 - life) * 2.0;

    gl_PointSize = scale * uParticleSize / -modelViewPosition.z;
    gl_Position = projectionMatrix * modelViewPosition;
}