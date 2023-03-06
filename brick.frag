 //  by Iñigo Quiles
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265358979323846
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}


// https://iquilezles.org/articles/distfunctions2d/
float sdPentagon( in vec2 p, in float r )
{
    const vec3 k = vec3(0.809016994,0.587785252,0.726542528);
    p.x = abs(p.x);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
    p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);    
    return length(p)*sign(p.y);
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);

}

void main() {

    vec2 st = (gl_FragCoord.xy)/u_resolution.xy;

    st = tile(st, 8.0) ;
    st = rotate2D(st,PI*0.25*u_time);
    
    st=(st-vec2(0.5));
    st*=2.0;

    

    float d = sdPentagon(st,0.4);

    vec4 color;  

    color = vec4(vec3(1.0-smoothstep(.39,.41,d)),1.0);
    // circle mask  


    gl_FragColor = color;
      
}