//  by Iñigo Quiles
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define SPEED .0
#define TWO_PI 6.28318530718




// ===============================================================================
// Ittan's Color Wheel remapping 
// based on "Paint Inspired Color Compositing" - Nathan Gossett, Baoquan Chen
// https://bahamas10.github.io/ryb/assets/ryb.pdf

float cubicLerp(float A, float B, float t)
{
    t = t*t*(3.0-2.0*t);
    return A+(B-A)*t;
}

vec2 cubicLerp(vec2 A, vec2 B, float t)
{
    t = t*t*(3.0-2.0*t);
    return A+(B-A)*t;
}

vec4 cubicLerp(vec4 A, vec4 B, float t)
{
    t = t*t*(3.0-2.0*t);
    return A+(B-A)*t;
}

vec3 ryb2rgb(vec3 ryb)
{
    vec3 rgb;
    //red
    vec4 X = cubicLerp(vec4(1.0), vec4(0.163, 0.0, 0.5, 0.2), ryb.z);
    vec2 Y = cubicLerp(X.xz, X.yw, ryb.y);
    rgb.r  = cubicLerp(Y.x, Y.y, ryb.x);
    //green
    X      = cubicLerp(vec4(1.0, 1.0, 0.0, 0.5), vec4(0.373, 0.66, 0.0, 0.094), ryb.z);
    Y      = cubicLerp(X.xz, X.yw, ryb.y);
    rgb.g  = cubicLerp(Y.x, Y.y, ryb.x);
    //blue
    X      = cubicLerp(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.6, 0.2, 0.5, 0.0), ryb.z);
    Y      = cubicLerp(X.xz, X.yw, ryb.y);
    rgb.b  = cubicLerp(Y.x, Y.y, ryb.x);
    return rgb;
}
// ===============================================================================


//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsl2rgb(in vec3 c) 
{
    vec3 rgb = clamp(abs(mod(c.x * 6. + vec3(0., 4., 2.), 6.) - 3.) - 1., 0., 1.);
    rgb = rgb * rgb * (3. - 2. * rgb);
    return c.z * mix(vec3(1.0, 1.0, 1.0), rgb, c.y);

}
// radius (0,1)
vec2 polar(in vec2 st) {
    vec2 c = vec2(.5) - st;
    float angle = atan(c.y, c.x) / TWO_PI + .5;
    float radius = length(c) * 2.;
    return vec2(angle, radius);
}

      
void main() {

    vec2 st = (gl_FragCoord.xy) / u_resolution;
    vec3 color ;
    if(st.y >0.5)
        color = hsl2rgb(vec3(st.x-0.08,1, 1));
    color = ryb2rgb(color);
    gl_FragColor = vec4(color, 1.);
      
}