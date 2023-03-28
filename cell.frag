// Author: @patriciogv - 2015
// Title: Cell

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


vec2 random2f( vec2 p )
{

    // procedural white noise	
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec2 voronoi( in vec2 x )
{
    vec2 p = floor( x );
    vec2  f = fract( x );

    vec2 res = vec2( 8.0 );
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2 b = vec2(i, j);
        vec2  r = vec2(b) - f + random2f(p + b);
        float d = dot(r, r);

        if( d < res.x )
        {
            res.y = res.x;
            res.x = d;
        }
        else if( d < res.y )
        {
            res.y = d;
        }
    }

    return sqrt( res );
}

float getBorder( in vec2 p )
{
    vec2 c = voronoi( p );

    float dis = c.y - c.x;

    return 1.0 - smoothstep(0.0,0.05,dis);
}

void main(void) {

    vec2 st = (gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.xx;
	
    float F = getBorder(st*10.0);
    
	gl_FragColor = vec4(F, F, F, 1.0);
}
