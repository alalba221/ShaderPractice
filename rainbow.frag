#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsl2rgb(in vec3 c) {
     vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
    
    vec2 st = (gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    float angle = atan(st.y, st.x);
    float radius = length(st)*2.0;
    radius = fract(radius);
    
    vec3 color;
    //if(radius>0.1)
    color = hsl2rgb(vec3( radius, 1.0, 1.0));
    gl_FragColor = vec4(color, 1.0);
}
