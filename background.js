"use strict";

//////////////////////////////////////////////
// Vertex shader program
var VS_SOURCE = `
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
// const FS_SOURCE =

//////////////////////////////////////////////
// Fragment shader program
var FS_SOURCE = `
precision highp float;
uniform float u_time;
varying vec4 vUV;
varying vec4 vColor;
uniform float randShape[13];
uniform float randSize[13]; 
uniform float randStart[23]; 
//animation variables
 float offsetMultiplier =-4.; 
 float speed = .06; 
 //all the colors
vec3 colors[14]; 
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
    
    vec2 A = vec2(randStart[0], randStart[1]);
    vec2 B = vec2(randStart[2], randStart[3]);
    vec2 C = vec2(randStart[4], randStart[5]);
    vec2 D = vec2(randStart[6], randStart[7]);
    vec2 E = vec2(randStart[8], 1.);
    vec2 F = vec2(randStart[9], 1.);
    vec2 G = vec2(randStart[11], randStart[12]);
    vec2 H = vec2(randStart[13], randStart[14]);
    vec2 I = vec2(-1. , randStart[16]);
    vec2 J = vec2(randStart[17], randStart[18]);
    vec2 K = vec2(randStart[19], randStart[20]);
    vec2 L = vec2(1., randStart[22]);
    
    // warp domains
vec2 uvA = uv * vec2(randStart[22], randStart[22]);
uvA.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvA.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvB = uv * vec2(randStart[20], randStart[21]);
uvB.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvB.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvC = uv * vec2(randStart[18], randStart[19]);
uvC.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvD = uv * vec2(randStart[16], randStart[17]);
uvD.y += sin(uv.x * offsetMultiplier + u_time) * speed;
uvD.x += sin(uv.y * offsetMultiplier + u_time) * speed;
vec2 uvE = uv * vec2(randStart[14], randStart[15]);
uvE.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvE.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvF = uv * vec2(randStart[12], randStart[13]);
uvF.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvF.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvG = uv * vec2(randStart[10], randStart[11]);
uvG.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvH = uv * vec2(randStart[8], randStart[9]);
uvH.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvH.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvI = uv * vec2(randStart[6], randStart[7]);
uvI.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvI.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvJ = uv * vec2(randStart[4], randStart[5]);
uvJ.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvJ.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvK = uv * vec2(randStart[2], randStart[3]);
uvK.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvK.y += sin(uv.x * offsetMultiplier + u_time) * speed;
vec2 uvL = uv * vec2(randStart[0], randStart[1]);
uvL.x += sin(uv.y * offsetMultiplier + u_time) * speed;
uvL.y += sin(uv.x * offsetMultiplier + u_time) * speed;
    
    // create shaped gradient
    float dA = max(0., 1. - pow(distance(uvA, A) / randSize[0], randShape[0]));
    float dB = max(0., 1. - pow(distance(uvB, B) / randSize[1], randShape[1]));
    float dC = max(0., 1. - pow(distance(uvC, C) / randSize[2], randShape[2]));
    float dD = max(0., 1. - pow(distance(uvD, D) / randSize[3], randShape[3]));
    float dE = max(0., 1. - pow(distance(uvE, E) / randSize[4], randShape[4]));
    float dF = max(0., 1. - pow(distance(uvF, F) / randSize[5], randShape[5]));
    float dG = max(0., 1. - pow(distance(uvG, G) / randSize[6], randShape[6]));
    float dH = max(0., 1. - pow(distance(uvH, H) / randSize[7], randShape[7]));
    float dI = max(0., 1. - pow(distance(uvI, I) / randSize[8], randShape[8]));
    float dJ = max(0., 1. - pow(distance(uvJ, J) / randSize[9], randShape[9]));
    float dK = max(0., 1. - pow(distance(uvK, K) / randSize[10], randShape[10]));
    float dL = max(0., 1. - pow(distance(uvL, L) / randSize[11], randShape[11]));
    
    // smooth in, out
    dA=smoothstep(0.,1.,dA);
    dB=smoothstep(0.,1.,dB);
    dC=smoothstep(0.,1.,dC);
    dD=smoothstep(0.,1.,dD);
    dE=smoothstep(0.,1.,dE);
    dF = smoothstep(0., 1., dF);
    dG = smoothstep(0., 1., dG);
    dH = smoothstep(0., 1., dH);
    dI = smoothstep(0., 1., dI);
    dJ = smoothstep(0., 1., dJ);
    dK = smoothstep(0., 1., dK);
    dL = smoothstep(0., 1., dL);
    
    // define colors
    
// // define colors
vec3 blue = vec3(35., 122., 144.) / 255.;
vec3 pink = vec3(255., 122., 114.) / 255.;
vec3 green = vec3(44., 162., 148.) / 255.;
vec3 black = vec3(20., 10., 0.) / 255.;
vec3 orange = vec3(255., 78., 0.) / 255.;
vec3 vanta = vec3(-25., -25., -25.) / 255.;
vec3 purple = vec3(198., 177., 250.) / 255.;
vec3 brightPink= vec3(239., 142., 161.) / 255.;
vec3 liteTurquoise = vec3(255., 110., 116.) / 255.;
vec3 mediumBlue = vec3(0., 100., 140.) / 255.;
vec3 darkBLue = vec3(0., 30., 42.) / 255.;
vec3 liteBlue = vec3(8., 216., 234.) / 255.;
vec3 darkPink = vec3(252., 66., 79.) / 255.;
vec3 darkTurquoise = vec3(32., 59., 53.) / 255.;
    
    // lay in color blobs
    vec3 color=vec3(0.);
    color=mix(color,blue,dA);
    color=mix(color,darkPink,dC);
    color=mix(color,green,dB);
    color = mix(color, darkTurquoise, dD);
    color = mix(color,orange,dE);
    color = mix(color, purple, dF);
     color = mix(color, brightPink, dG);
      color = mix(color, vanta, dH);
       color = mix(color, liteTurquoise, dI);
        color = mix(color, mediumBlue, dJ);
         color = mix(color, darkBLue, dK);
          color = mix(color, liteBlue, dL);
    
    // add noise
    color+=vec3(
        random1f(uv)*.5,
        random1f(uv+1.)*.5,
        random1f(uv+2.)*.5
    )*.3;
    gl_FragColor=vec4(color,1.);
    }
`;

main();

function getRand(min, max) {
  return Math.random() * (max - min) + min;
}

function main() {
  console.log("Hello, WebGL!");
  window.addEventListener("resize", resize, false);

  //////////////////////////////////////////////
  // create the context
  var canvas = document.querySelector("#glcanvas");

  var gl = canvas.getContext("webgl");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function resize() {
    console.log("resize");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }

  // compile vertex shader
  var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertex_shader, VS_SOURCE);
  gl.compileShader(vertex_shader);

  // compile fragment shader
  var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragment_shader, FS_SOURCE);
  gl.compileShader(fragment_shader);

  // link fragment and vertex shader
  var shader_program = gl.createProgram();
  gl.attachShader(shader_program, vertex_shader);
  gl.attachShader(shader_program, fragment_shader);
  gl.linkProgram(shader_program);

  //////////////////////////////////////////////
  // query the shaders for attibute and uniform "locations"
  var vertex_position_location = gl.getAttribLocation(
    shader_program,
    "aVertexPosition"
  );
  var vertex_color_location = gl.getAttribLocation(
    shader_program,
    "aVertexColor"
  );
  var vertex_uv_location = gl.getAttribLocation(shader_program, "aVertexUV");
  var u_time_location = gl.getUniformLocation(shader_program, "u_time");

  // vertex position data
  var position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
  var positions = [
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
  var color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  var colors = [
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
  var uv_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
  var uvs = [
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
  var start_time = Date.now();
  //   resize();

  //get random shapes of blobs
  var randomShapes = new Float32Array(13);
  console.log("random Shape values");
  for (var i = 0; i < randomShapes.length; i++) {
    randomShapes[i] = getRand(0.5, 4);
    console.log(randomShapes[i]);
  }
  console.log("random Size values");
  var randomSizes = new Float32Array(13);
  for (var i = 0; i < randomSizes.length; i++) {
    randomSizes[i] = getRand(0.6, 0.8);
    console.log(randomSizes[i]);
  }
  // var randColIndx = new Float32Array(7);
  // for (var i = 0; i < randColIndx.length; i++) {
  //     randColIndx[i] = Math.round(getRand(0, 13));
  //     console.log(randColIndx[i]);
  // }
  console.log("random start values");
  var randomStart = new Float32Array(23);
  for (var i = 0; i < randomStart.length; i++) {
    randomStart[i] = getRand(-1.0, 1.0);
    // randomStart[i + 1] = getRand(-1, 1);
    console.log(randomStart[i]);
  }

  // console.log("random frequency");
  // var randomFreq = new Float32Array(13);
  // for (var i = 0; i < randomStart.length; i++) {
  //     randomStart[i] = getRand(-8., 9.);
  //     // randomStart[i + 1] = getRand(-1, 1);
  //     console.log(randomStart[i]);
  // }

  function render() {
    // activate our program
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(shader_program);

    //update uniforms
    gl.uniform1f(u_time_location, (Date.now() - start_time) * 0.001);

    //set random shapes for blobs
    var locationOfFoo = gl.getUniformLocation(shader_program, "randShape");
    if (locationOfFoo != -1) {
      gl.uniform1fv(locationOfFoo, randomShapes);
    }
    var locationOfSize = gl.getUniformLocation(shader_program, "randSize");
    if (locationOfSize != -1) {
      gl.uniform1fv(locationOfSize, randomSizes);
    }
    var locationOfStart = gl.getUniformLocation(shader_program, "randStart");
    if (locationOfStart != -1) {
      gl.uniform1fv(locationOfStart, randomStart);
    }
    // draw the geometry
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
