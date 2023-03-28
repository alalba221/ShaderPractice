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

float sdCircle( vec2 p, vec2 c, float r )
{
    return length(p-c) - r;
}


void main() 
{
    vec2 st = (gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.xx;
   
    vec3 color = vec3(0.101961,0.619608,0.666667);

    float dist = sdCircle(st,vec2(sin(u_time*0.5)),0.3);

    float noise = fbm(st );

    dist += noise;

    color = color*(1.0 - dist);
    gl_FragColor = vec4(color,1.);

}
