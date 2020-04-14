#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define SHOW_NOISE 0
#define SRGB 0
// 0: Addition, 1: Screen, 2: Overlay, 3: Soft Light, 4: Lighten-Only
#define BLEND_MODE 0
#define SPEED 2.
#define INTENSITY.75
// What gray level noise should tend to.
#define MEAN 0.
// Controls the contrast/variance of noise.
#define VARIANCE.5

//for noise grain
vec3 channel_mix(vec3 a,vec3 b,vec3 w){
    return vec3(mix(a.r,b.r,w.r),mix(a.g,b.g,w.g),mix(a.b,b.b,w.b));
}

float gaussian(float z,float u,float o){
    return(1./(o*sqrt(2.*3.1415)))*exp(-(((z-u)*(z-u))/(2.*(o*o))));
}

vec3 madd(vec3 a,vec3 b,float w){
    return a+a*b*w;
}

vec3 screen(vec3 a,vec3 b,float w){
    return mix(a,vec3(1.)-(vec3(1.)-a)*(vec3(1.)-b),w);
}

vec3 overlay(vec3 a,vec3 b,float w){
    return mix(a,channel_mix(
            2.*a*b,
            vec3(1.)-2.*(vec3(1.)-a)*(vec3(1.)-b),
            step(vec3(.5),a)
        ),w);
    }
    
    vec3 soft_light(vec3 a,vec3 b,float w){
        return mix(a,pow(a,pow(vec3(2.),2.*(vec3(.5)-b))),w);
    }
    
    float noise(vec2 seed)
    {
        float x=(seed.x/3.14159+4.)*(seed.y/13.+4.)*((fract(u_time)+1.)*10.);
        return mod((mod(x,13.)+1.)*(mod(x,123.)+1.),.01)-.005;
    }
    
    // cosine based palette, 4 vec3 params from IQ
    vec3 palette(in float t,in vec3 a,in vec3 b,in vec3 c,in vec3 d)
    {
        return a+b*cos(6.28318*(c*t+d));
    }
    
    void main(){
        vec2 coord=gl_FragCoord.xy/u_resolution.xy;
        vec2 ps=vec2(1.)/u_resolution.xy;
        vec2 uv=coord*ps;
        vec4 noiseCol=pow(vec4(.1,.1,.1,1.),vec4(2.));
        
        float t=u_time*float(SPEED);
        float seed=dot(uv,vec2(12.9898,78.233));
        float noise=fract(sin(seed)*43758.5453+t);
        noise=gaussian(noise,float(MEAN),float(VARIANCE)*float(VARIANCE));
        float w=float(INTENSITY);
        vec3 grain=vec3(noise)*(1.-noiseCol.rgb);
        
        noiseCol.rgb+=grain*w;
        
        // normalized rgba colors from gradient
        vec4 col1=vec4(1.,.51,.59,1.);
        vec4 col2=vec4(.03,.01,0.,1.);
        vec4 col3=vec4(1.,.31,0.,1.);
        vec4 col4=vec4(.14,.48,.56,1.);
        vec4 col5=vec4(1.,.44,.45,1.);
        vec4 col6=vec4(.17,.64,.58,1.);
        
        // IQ color gradient function
        vec3 colGrad=palette(coord.x,vec3(.5,.5,.5),vec3(.5,.5,.5),vec3(2.,1.,0.),vec3(0.,1.,.8667));
        
        noiseCol=pow(noiseCol,vec4(.2/3.2));
        
        // float t=u_time*.04;
        float pal_time=u_time*.04;
        
        float color=2.;
        color+=sin(coord.x*50.+cos(u_time/20.+coord.y*5.*sin(coord.x*5.+u_time/20.))*2.6);
        color+=cos(coord.x*20.+sin((u_time/10.)+coord.y*5.*cos(coord.x*5.+u_time/20.))*.4);
        color+=sin(coord.x*30.+cos((u_time/40.)+coord.y/5.+sin(coord.x*5.+u_time/20.))*2.);
        color+=cos(coord.x*10.5+sin(u_time-coord.y*5.+cos(coord.x*5.+u_time/2.))*2.);
        
        // color+=tan(coord.y*10.5+sin(u_time*coord.y/5.+cos(coord.x*5.+u_time/2.))*2.);
        // color+=cos(coord.y/10.5-sin(u_time *+cos(coord.x*5.+u_time/2.))*2.);
        
        color-=1.2;
        gl_FragColor=vec4(colGrad,1.);
        
        gl_FragColor*=((vec4(vec3(color+coord.y,color+coord.x,coord.x+coord.y),1.))*noiseCol);
        
        // alternate colors
        // gl_FragColor*=((vec4(vec3(color-coord.x-(abs(sin(u_time*.3))*.2)*.52,coord.x-.42,coord.x+color+coord.y-.5),1.))*noiseCol);
    }