void main() {
    float opacityPowFactor = 1.5;
    vec3 color = vec3(0.75);
    
    float distFromCenter = distance(vec2(0.5), gl_PointCoord);
    float opacity = max(0.0, pow(sqrt(0.5) - distFromCenter, opacityPowFactor));

    gl_FragColor = vec4(color, opacity);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
}