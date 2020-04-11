precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

// float ball(vec2 p,float fx,float fy,float ax,float ay){
    //     vec2 r=vec2(p.x+sin(u_time*fx)*ax,p.y+cos(u_time*fy)*ay);
    //     return.09/length(r);
// }

float speed=6.;

float blob(float x,float y,float fx,float fy){
    float xx=x+sin(u_time*fx/speed)*.7;
    float yy=y+cos(u_time*fy/speed)*.7;
    
    return 20./sqrt(xx*xx+yy*yy);
}

vec3 palette(in float t,in vec3 a,in vec3 b,in vec3 c,in vec3 d)
{
    return a+b*cos(6.28318*(c*t+d));
}

void main(void){
    vec2 q=gl_FragCoord.xy/u_resolution.xy;
    // vec2 p=-1.+2.*q;
    // p.x*=u_resolution.x/u_resolution.y;
    vec2 position=(gl_FragCoord.xy/u_resolution.xy)-.5;
    
    float x=position.x*5.;
    float y=position.y*5.;
    
    float a=blob(y,x,7.3,5.2)+blob(x,y,3.9,3.)+blob(x,y,20.8,2.3);
    float b=blob(x,y,1.2,9.9)+blob(x,y,2.7,2.7)+blob(x,y,2.8,20.3);
    float c=blob(x,y,5.4,3.3)+blob(y,x,2.8,2.3)+blob(x,y,2.8,12.3);
    
    vec3 d=vec3(a,b,c)/100.;
    
    vec4 col1=vec4(1.,.51,.59,1.);
    vec4 col2=vec4(.03,.01,0.,1.);
    vec4 col3=vec4(1.,.31,0.,1.);
    vec4 col4=vec4(.14,.48,.56,1.);
    vec4 col5=vec4(1.,.44,.45,1.);
    vec4 col6=vec4(.17,.64,.58,1.);
    
    float mix_col1_6=distance(q,vec2(0,1));
    vec4 color=mix(col1,col6,mix_col1_6);
    
    // float col=0.;
    // col+=ball(p,1.,2.,.1,.2);
    // col+=ball(p,1.5,2.5,.2,.3);
    // col+=ball(p,2.,3.,.3,.4);
    // col+=ball(p,2.5,3.5,.4,.5);
    // col+=ball(p,3.,4.,.5,.6);
    // col+=ball(p,1.5,.5,.6,.7);
    // col+=ball(p,.1,.5,.6,.7);
    
    // col=max(mod(col,.4),min(col,2.));
    
    // gl_FragColor=vec4(col*.8,col*.3,col*.3,1.);
    // gl_FragColor=vec4(d.x,d.y,d.z,1.);
    gl_FragColor=vec4(d.x,d.y,d.z,1.);
}