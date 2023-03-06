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
    
    vec2 uv = 2.0*(gl_FragCoord.xy-vec2(0,0.5))/u_resolution.xx;

    
    vec3 sunColor = vec3(1.0, 1.0, 1.0);
    float sunRadius = .1;

    float sin_utime = (1.+sin(u_time))/2.0;
    float d = sdCircle(uv,vec2(1.,2.0*(1.0-sin_utime)),sunRadius);
    
    vec2 sunCenter = vec2(uv.x, uv.y);
    float isTheSun = step(d, sunRadius);
    
    
    uv.y = 1.0*sin(uv.y*sin_utime);
    vec3 sunset = vec3(1.0, 1.0-uv.y, 0.0);
    // Output to screen
    vec3 col = mix(sunset, sunColor, isTheSun);
    gl_FragColor = vec4(col, 1.0);
}