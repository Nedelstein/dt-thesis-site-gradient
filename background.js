"use strict";

//////////////////////////////////////////////
// Vertex shader program
const VS_SOURCE = `
    precision highp float;

    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec4 aVertexUV;
    
    varying vec4 vColor;
    varying vec4 vUV;
    
    void main(void) {
      vUV = aVertexUV;
      vColor = aVertexColor;
      gl_Position = aVertexPosition;
    }
`;

//////////////////////////////////////////////
// Fragment shader program
const FS_SOURCE = `
precision highp float;
uniform float u_time;
varying vec4 vUV;
varying vec4 vColor;

float random1f(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float map(float v,float a,float b,float c,float d){
    float nv=(v-a)/(b-a);
    nv=pow(nv,3.);
    float o=nv*(d-c)+c;
    
    return o;
}

void main(void){
    vec2 uv=vUV.xy;
    
    vec2 A=vec2(-.5,-.2);
    vec2 B=vec2(.5,-.2);
    vec2 C=vec2(0,.5);
    vec2 D=vec2(.5,-.8);
    vec2 E=vec2(.9,.79);
    
    float k1=.7;// size
    float k2=3.;// shape
    
    // warp domains
    vec2 uvA=uv*vec2(.69,.8);
    uvA.x+=sin(uv.y*5.+u_time)*.06;
    vec2 uvB=uv*vec2(.7,.4);
    uvB.x+=sin(uv.y*4.+u_time)*.06;
    vec2 uvC=uv*vec2(.6,.8);
    uvC.y+=sin(uv.x*4.+u_time)*.06;
    vec2 uvD=uv*vec2(.2,.8);
    uvD.y+=sin(uv.x*4.+u_time)*.06;
    vec2 uvE=uv*vec2(-1.1,.9);
    uvE.x+=sin(uv.y*4.+u_time)*.06;
    
    // create shaped gradient
    float dA=max(0.,1.-pow(distance(uvA,A)/k1,k2));
    float dB=max(0.,1.-pow(distance(uvB,B)/k1,k2));
    float dC=max(0.,1.-pow(distance(uvC,C)/k1,k2));
    float dD=max(0.,1.-pow(distance(uvD,D)/k1,k2));
    float dE=max(0.,1.-pow(distance(uvE,E)/k1,k2));
    
    // smooth in, out
    dA=smoothstep(0.,1.,dA);
    dB=smoothstep(0.,1.,dB);
    dC=smoothstep(0.,1.,dC);
    dD=smoothstep(0.,1.,dD);
    dE=smoothstep(0.,1.,dE);
    
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
    color=mix(color,vanta,dC);
    color=mix(color,pink,dB);
    color=mix(color,green,dD);
    color=mix(color,orange,dE);
    
    // add noise
    color+=vec3(
        random1f(uv),
        random1f(uv+1.),
        random1f(uv+2.)
    )*.3;

    gl_FragColor=vec4(color,1.);
    }
`;

main();

function main() {
  console.log("Hello, WebGL!");
  window.addEventListener("resize", resize, false);

  //////////////////////////////////////////////
  // create the context
  const canvas = document.querySelector("#glcanvas");

  const gl = canvas.getContext("webgl");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function resize() {
    console.log("resize");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }

  // compile vertex shader
  const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertex_shader, VS_SOURCE);
  gl.compileShader(vertex_shader);

  // compile fragment shader
  const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragment_shader, FS_SOURCE);
  gl.compileShader(fragment_shader);

  // link fragment and vertex shader
  const shader_program = gl.createProgram();
  gl.attachShader(shader_program, vertex_shader);
  gl.attachShader(shader_program, fragment_shader);
  gl.linkProgram(shader_program);

  //////////////////////////////////////////////
  // query the shaders for attibute and uniform "locations"
  const vertex_position_location = gl.getAttribLocation(
    shader_program,
    "aVertexPosition"
  );
  const vertex_color_location = gl.getAttribLocation(
    shader_program,
    "aVertexColor"
  );
  const vertex_uv_location = gl.getAttribLocation(shader_program, "aVertexUV");
  const u_time_location = gl.getUniformLocation(shader_program, "u_time");

  // vertex position data
  const position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
  const positions = [
    1.0,
    1.0, // right top
    -1.0,
    1.0, // left top
    1.0,
    -1.0, // right bottom
    -1.0,
    -1.0, // left bottom
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vertex_position_location, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertex_position_location);

  // vertex color data
  const color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, // white
    1.0,
    0.0,
    0.0,
    1.0, // red
    0.0,
    1.0,
    0.0,
    1.0, // green
    0.0,
    0.0,
    1.0,
    1.0, // blue
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vertex_color_location, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertex_color_location);

  // vertex position data
  const uv_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
  const uvs = [
    1.0,
    1.0, // right top
    -1.0,
    1.0, // left top
    1.0,
    -1.0, // right bottom
    -1.0,
    -1.0, // left bottom
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vertex_uv_location, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertex_uv_location);

  //////////////////////////////////////////////
  // configure gl
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  //////////////////////////////////////////////
  // draw

  // clear the background
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //////////////////////////////////////////////
  // set up animation loop
  let start_time = Date.now();
  //   resize();

  function render() {
    // activate our program
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(shader_program);

    //update uniforms
    gl.uniform1f(u_time_location, (Date.now() - start_time) * 0.001);

    // draw the geometry
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
