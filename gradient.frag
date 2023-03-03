#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float dot2( in vec2 v ) { return dot(v,v); }
float sdCircle( vec2 p, vec2 c, float r )
{
    return length(p-c) - r;
}

// https://iquilezles.org/articles/distfunctions2d/
float sdCross( in vec2 p, vec2 c, in vec2 b, float r ) 
{
    p = abs(p); p = (p.y>p.x) ? p.yx : p.xy;
    vec2  q = p - b;
    float k = max(q.y,q.x);
    vec2  w = (k>0.0) ? q : vec2(b.y-p.x,-k);
    return sign(k)*length(max(w,0.0)) + r;
}

void main() {
    
    vec2 st = (gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

	vec2 si = 0.5 + 0.3*cos(0.9+vec2(0.0,1.57) ); if( si.x<si.y ) si=si.yx;

    float ra = 0.1*sin(1.2);

    float d0 = -sdCross(st,vec2(0),si,ra);
    float d1 = sdCircle(st, vec2(0),0.2);
    
    float d = min(d0,d1);
    
    vec3 color = vec3(smoothstep(-0.1, 0.1,d));

    gl_FragColor = vec4(color,1.0);
}
