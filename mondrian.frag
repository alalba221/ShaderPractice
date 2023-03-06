#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec4 rect(vec2 p, float x1, float y1, float x2, float y2, vec3 base_color) {
  vec2 bl = min(floor(vec2(x1, y1) * vec2(1./48., 1./56.) - p), vec2(0.));
  vec2 tr = min(floor(p - vec2(x2, y2) * vec2(1./48., 1./56.)), vec2(0.));

  float l = bl.x * bl.y;
  l *= tr.x * tr.y;

  vec4 color = vec4(l * base_color, 1.);
  return color;
}

vec4 mondrian(vec2 p, vec4 color) {
  vec4 c = rect(p, 0., 0., 48., 56.,vec3(1.));
  color = vec4(1.-c.x, 1.-c.y, 1.-c.z, 1.0);
  // Red
  color += rect(p, 0., 47., 3., 56., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 4., 47., 10., 56., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 0., 36., 3., 46., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 4., 36., 10., 46., vec3(1.0, 0.4824, 0.0));
  // Yellow
  color += rect(p, 47., 47., 48., 56., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 47., 36., 48., 46., vec3(1.0, 0.4824, 0.0));
  // blue
  color += rect(p, 47., 0., 48., 4., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 36., 0., 46., 4., vec3(1.0, 0.4824, 0.0));
  //white
  color += rect(p, 0., 0., 10., 35., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 11., 0., 35., 4., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 11., 5., 35., 35., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 11., 36., 35., 46., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 11., 47., 35., 56., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 36., 47., 46., 56., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 36., 36., 46., 46., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 36., 5., 46., 35., vec3(1.0, 0.4824, 0.0));
  color += rect(p, 47., 5., 48., 35., vec3(1.0, 0.4824, 0.0));

  return color;
}

void main() {
    
    vec2 uv = 1.0*(gl_FragCoord.xy*1.0 )/u_resolution.yy;
    
    vec4 color = vec4(1.);
    color *= mondrian(uv, color);
   
    gl_FragColor = vec4(color);
}
