#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// https://www.shadertoy.com/vie//  https://www.shadertoy.com/view/MsS3Wcw/MsS3Wc
vec3 hsl2rgb(in vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}


void main() {
    
    vec2 st = 2.0*(gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.yy;
        
    float y = 1.0*cos(3.14*0.16*st.x);
   
    float hue ;
    vec3 color = vec3(1.0);
   
    if(abs(st.y-y) <1.)
    {
        hue = (st.y-y);
        color = hsl2rgb(vec3(hue, 1.0, 1.0));
    }
    gl_FragColor = vec4(color, 1.0);
}
