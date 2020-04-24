#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

float random1f(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float map(float v,float a,float b,float c,float d){
    float nv=(v-a)/(b-a);
    nv=pow(nv,3.);
    float o=nv*(d-c)+c;
    
    return o;
}

void main()
{
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    uv=uv*2.-1.;
    uv.y/=u_resolution.x/u_resolution.y;
    
    vec2 A=vec2(.151,-.2);
    vec2 B=vec2(-.7,-.28);
    vec2 C=vec2(.83,-.9);
    vec2 D=vec2(1.,-.96);
    vec2 E=vec2(.9,.79);
    
    vec2 F=vec2(.9,-.9);
    
    float k1=.7;// size
    float k2=3.;// shape
    
    // warp domains
    vec2 uvA=uv*vec2(.2,.1);
    uvA.x+=sin(uv.y*4.+u_time)*.05;
    vec2 uvB=uv*vec2(.4,.3);
    uvB.y+=sin(uv.y*3.+u_time)*.15;
    vec2 uvC=uv*vec2(.6,.8);
    uvC.y+=sin(uv.x*4.+u_time)*.1;
    vec2 uvD=uv*vec2(-1.2,-.9);
    uvD.y+=sin(uv.x*11.+u_time)*.05;
    vec2 uvE=uv*vec2(-1.1,.9);
    uvE.x+=sin(uv.y*4.+u_time)*.1;
    
    vec2 uvF=uv*vec2(1.1,-.45);
    uvF.x+=sin(uv.y*4.+u_time)*.1;
    
    // create shaped gradient
    float dA=max(0.,1.-pow(distance(uvA,A)/k1,k2));
    float dB=max(0.,1.-pow(distance(uvB,B)/k1,k2));
    float dC=max(0.,1.-pow(distance(uvC,C)/k1,k2));
    float dD=max(0.,1.-pow(distance(uvD,D)/k1,k2));
    float dE=max(0.,1.-pow(distance(uvE,E)/k1,k2));
    
    float dF=max(0.,1.-pow(distance(uvF,F)/k1,k2));
    
    // smooth in, out
    dA=smoothstep(0.,1.3,dA);
    dB=smoothstep(0.,1.,dB);
    dC=smoothstep(0.,1.,dC);
    dD=smoothstep(0.,1.,dD);
    dE=smoothstep(0.,1.,dE);
    
    dF=smoothstep(0.,1.,dF);
    
    // define colors
    
    vec3 blue=vec3(35.,122.,144.)/255.;
    vec3 pink=vec3(255.,122.,114.)/255.;
    vec3 green=vec3(44.,162.,148.)/255.;
    vec3 black=vec3(20.,10.,0.)/255.;
    vec3 orange=vec3(255.,78.,0.)/255.;
    
    vec3 vanta=vec3(-25,-25,-25)/255.;
    
    // lay in color blobs
    vec3 color=vec3(0.);
    color=mix(color,blue,dA);
    color=mix(color,black,dC);
    color=mix(color,pink,dB);
    color=mix(color,green,dD);
    // color=mix(color,orange,dE);
    
    color=mix(color,pink,dF);
    
    // add noise
    color+=vec3(
        random1f(uv),
        random1f(uv+1.),
        random1f(uv+2.)
    )*.2;
    
    gl_FragColor=vec4(color,1.);
}
