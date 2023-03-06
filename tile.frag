 //  by Iñigo Quiles
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265358979323846


float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

// https://iquilezles.org/articles/distfunctions2d/
float dot2( in vec2 v ) { return dot(v,v); }
float sdHeart( in vec2 p )
{
    p.x = abs(p.x);

    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);

}

void main() {

    vec2 st = (gl_FragCoord.xy)/u_resolution.xy;

    st = tile(st, 8.0) ;
    //st = rotate2D(st,PI*0.25*u_time);
    
    st=(st-vec2(0.5));
    st*=4.0;

    

    float d = sdHeart(st);

    vec4 color;
    vec4 color2;  
    color = vec4( 1.0-smoothstep(.39,.41,d),0.0,0,1.0);
    color2 = vec4( vec3(box(st,vec2(4))),1.0);
    // circle mask  
    vec4 mixcolor = mix(color, color2, 0.3);

    gl_FragColor = mixcolor;
      
}