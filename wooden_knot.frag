// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                * 43758.5453123);
}


// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix( mix(a, b, u.x), mix(c, d, u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}


float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0,
                    .5+b*.5,
                    abs((sin(pos.x*3.1415)+b*2.0))*.5);
}

void main() 
{
    vec2 st = (gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.xx;
    
    st = st.xy*vec2(1.,4.);
    st = rotate2d( noise(st*.8) ) * st;
    
    float v0 = smoothstep(-1.0, 1.0, sin(st.x * 10.0 ));
    float v1 = random(st);
    float v2 = noise(st * vec2(200.0, 14.0)) - noise(st * vec2(1000.0, 64.0));

    vec3 col = vec3(0.860,0.806,0.574);
    col = mix(col, vec3(0.390,0.265,0.192), v0);
    col = mix(col, vec3(0.930,0.493,0.502), v1 * 0.5);
    col -= v2 * 0.2;
    gl_FragColor = vec4(col, 1.0);
}
