uniform float uDayTimeMix;
uniform sampler2D uTextureMorning;
uniform sampler2D uTextureNight;

varying vec2 vUv;

void main() {
    vec4 morningColor = texture2D(uTextureMorning, vUv);
    vec4 nightColor = texture2D(uTextureNight, vUv);

    gl_FragColor = mix(morningColor, nightColor, uDayTimeMix);
    
    #include <tonemapping_fragment>
    #include <encodings_fragment>
}
