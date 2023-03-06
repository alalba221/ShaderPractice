#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// based on https://www.shadertoy.com/view/XsX3zl

#define RADIANS 0.017453292519943295
const int zoom = 40;
const float brightness = 0.975;
float fScale = 1.25;

float cosRange(float degrees, float range, float minimum) {
	return (cos(degrees * RADIANS));
}



void main() {
    
    float time = 18.0 * 10.25;
	vec2 uv =2.0*(gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.yy;

	float ct = cosRange(time*5.0, 3.0, 1.1);
	float xBoost = cosRange(time*0.2, 5.0, 5.0);
	float yBoost = cosRange(time*0.1, 10.0, 5.0);
	
	fScale = cosRange(time * 15.5, 1.25, 0.5);
	
	for(int i=1;i<122;i++) {
		float _i = float(i);
		vec2 newp=uv;
		newp.x+=0.25/_i*sin(_i*uv.y+time*cos(ct)*0.5/20.0+0.005*_i)*fScale+xBoost;		
		newp.y+=0.25/_i*sin(_i*uv.x+time*ct*0.3/40.0+0.03*float(i+15))*fScale+yBoost;
		uv=newp;
	}
	
	vec3 col=vec3(0.5*sin(3.0*uv.x)+0.5);
	col *= brightness;
    
    // Add border
    float vigAmt = 5.0;
    float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));
	float extrusion = (col.x + col.y + col.z) / 4.0;
    extrusion *= 1.5;
    extrusion *= vignette;
    
	gl_FragColor = vec4(col, extrusion);
}
