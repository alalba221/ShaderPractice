//  by Iñigo Quiles
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define SPEED .0
#define TWO_PI 6.28318530718


// radius (0,1)
vec2 polar(in vec2 st) {
    vec2 c = vec2(.5) - st;
    float angle = atan(c.y, c.x) / TWO_PI + .5;
    float radius = length(c) * 2.;
    return vec2(angle, radius);
}

      
void main() {

    vec2 st = (gl_FragCoord.xy) / u_resolution.yy;

    st = polar(st);  

    float x= st.x*5.0;
    float m = fract(x);//Take the remainder and obtain n regions with angles between (0,1)
    m = min(m,1.0-m);//The angles change from (0,1) to two regions, (0,0.5) and (0.5,0)
    
    float n = m + 0.2;
    float d = smoothstep(0.0,0.05,n-st.y);
    
    vec3 color;
    color = d*vec3(1.0,0.2,0.2);
    gl_FragColor = vec4(color, 1.);
      
}