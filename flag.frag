
// follow the toturial https://www.youtube.com/watch?v=q-gXr6XrgWk&ab_channel=Shadron

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define TAU 6.283185307179586476925286766559

const vec3 WHITE = vec3(1.0, 1.0, 1.0);
const vec3 RED = vec3(0.698, 0.132, 0.203);
const vec3 BLUE = vec3(0.234, 0.233, 0.430);

#define A 1.0
#define B 1.9
#define C (7.0/13.0*A)
#define D (0.4*B)
#define E (0.1*C)
#define F E
#define G (1.0/12.0*D)
#define H G
#define L (1.0/13.0*A)
#define K (0.8*L)

float starPlane(vec2 pos, float shift, int i, float pixelSize) {
	float angle = TAU/5.0*float(i);
	vec2 a = vec2(cos(angle), sin(angle));
	vec2 n = vec2(a.y, -a.x);
	return clamp((dot(pos-a, n)+shift)/(A*pixelSize)+0.5, 0.0, 1.0);
}

float star(vec2 pos, float radius, float pixelSize) {
	float shift = 0.25*(sqrt(5.0)-1.0)*radius;
	float total =
		starPlane(pos, shift, 0, pixelSize) +
		starPlane(pos, shift, 1, pixelSize) +
		starPlane(pos, shift, 2, pixelSize) +
		starPlane(pos, shift, 3, pixelSize) +
		starPlane(pos, shift, 4, pixelSize);
	return clamp(total-3.0, 0.0, 1.0);
}

float starPattern(vec2 pos, vec2 offset, vec2 size, float pixelSize) {
	return star(mod(clamp(pos-offset, vec2(0.0), size), 2.0*vec2(H, F))-vec2(G, E), 0.5*K, pixelSize);
}

vec3 usFlag(vec2 coord, float pixelSize) {
	vec2 pos = vec2(B, A)*coord;
	float canton = min(1.0-step(D, pos.x), step(A-C, pos.y));
	float starFill = starPattern(pos, vec2(0.0, A-C), vec2(D, C), pixelSize) +
		starPattern(pos, vec2(H, A-C+F), vec2(D, C)-2.0*vec2(H, F), pixelSize);
	vec3 stars = mix(BLUE, WHITE, starFill);
	vec3 stripes = mix(RED, WHITE, step(L, mod(pos.y, 2.0*L)));
	return mix(stripes, stars, canton);
}

void main() 
{
	vec2 coord = gl_FragCoord.xy/u_resolution.xy-0.5;
	float pixelSize = 1.0/u_resolution.y;
	float aspect = A/B*u_resolution.x/u_resolution.y;
	coord.x *= max(aspect, 1.0);
	coord.y /= min(aspect, 1.0);
	pixelSize /= min(aspect, 1.0);
	coord += 0.5;
	float stencil = 1.0-step(1.0e-6, distance(coord, fract(coord)));
	gl_FragColor = stencil*vec4(usFlag(coord, pixelSize), 1.0);
}
