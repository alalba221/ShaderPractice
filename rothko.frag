#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
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


#define OCTAVES 10
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

vec2 sdBox( in vec2 p, vec2 c,in vec2 b )
{
    p = p-c;
    vec2 d = abs(p)-b;
   
    float distance = length(max(d,0.0)) + min(max(d.x,d.y),0.0) + fbm(p*10.)*0.05;
    
    return vec2(1.0-smoothstep(0.1,.2,distance),distance);
}


void main() 
{
    vec2 st = (gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.xx;
   
    float box1 = sdBox(st , vec2(-.0,0.), vec2(.2,.45)).x;
    float box2 = sdBox(st , vec2(.65,0.), vec2(.2,.45)).x;
    float box3 = sdBox(st , vec2(-.65,0.), vec2(.2,.45)).x;
 
    vec3 color = box1 * vec3(.4, .1,.0) + box2*vec3(.5, .0,.1) + box3*vec3(.9, .6,.35);
    gl_FragColor = vec4(color,1.);

}
