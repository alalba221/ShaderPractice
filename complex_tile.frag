 //  by Iñigo Quiles
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265358979323846
#define TWO_PI 6.28318530718
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

// https://iquilezles.org/articles/distfunctions2d/
vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);

}


// radius (0,1)
vec2 polar(in vec2 st) {
    vec2 c = vec2(.5) - st;
    float angle = atan(c.y, c.x) / TWO_PI + .5;
    float radius = length(c) * 2.;
    return vec2(angle, radius);
}

void main() {

    vec2 st = (gl_FragCoord.xy)/u_resolution.xy;
    st = tile(st, 8.0) ;

    st = polar(st);
    
    float x= st.x*5.0;
    float m = fract(x);//Take the remainder and obtain n regions with angles between (0,1)
    m = min(m,1.0-m);//The angles change from (0,1) to two regions, (0,0.5) and (0.5,0)
    
    float n = m + 0.2;
    float d = smoothstep(0.0,0.05,n-st.y);
    


    vec3 color;
    color = d*vec3(0.6627, 0.2392, 0.2392);
    // circle mask  


    gl_FragColor = vec4(color,1);
      
}