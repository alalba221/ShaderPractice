 //  by Iñigo Quiles
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define SPEED .0
#define TWO_PI 6.28318530718


float sdCircle( vec2 p, vec2 c, float r )
{
    return length(p-c) - r;
}

void main()
{
    
    vec2 uv =(2.0*gl_FragCoord.xy - u_resolution.xy)/u_resolution.yy;

    
    vec3 sunColor = vec3(1.0, 1.0, 0.0);
    float sunRadius = 0.1;
    float d = sdCircle(uv,vec2(0,-0.6),sunRadius);
    
    vec2 sunCenter = vec2(uv.x, uv.y);
    float isTheSun = step(d, sunRadius);
    
    vec3 sunset = vec3(1.0, uv.y, 0.0);
    // Output to screen
    vec3 col = mix(sunset, sunColor, isTheSun);
    gl_FragColor = vec4(col, 1.0);
}