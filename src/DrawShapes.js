// ColoredCube_singleColor.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

var mvpMatrix;
var currentAngle = 0;
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl,1.0);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Set the clear color and enable the depth test
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage location of u_MvpMatrix
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  if (!u_MvpMatrix) {
    console.log('Failed to get the storage location of u_MvpMatrix');
    return;
  }

  // Set the eye point and the viewing volume
  mvpMatrix = new Matrix4();
  mvpMatrix.setPerspective(30, 1, 1, 100);
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);


  // // Pass the model view projection matrix to u_MvpMatrix
  // gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
  //
  // // Clear color and depth buffer
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //
  // // Draw the cube
  // gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

  draw(gl);
  var angle=document.getElementById('rSlider');
  angle.oninput = function(){
    rotation = angle.value;
    mvpMatrix.setPerspective(30, 1, 1, 100);
    mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
    mvpMatrix.rotate(rotation, 0 ,1 ,0);
    // // Pass the model view projection matrix to u_MvpMatrix
    // gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
    //
    // // Clear color and depth buffer
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //
    // // Draw the cube
    // gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    draw(gl);

  }

  //taken from ch 4 of book
  var tick = function() {
    currentAngle = animate(currentAngle);  // Update the rotation angle
    draw(gl);   // Draw the triangle
    requestAnimationFrame(tick);   // Request that the browser ?calls tick
  };
  tick();
 }

 function draw(gl){
   // Clear color and depth buffer
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   // Get the storage location of u_MvpMatrix
   // var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
   //first cube
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.0, 0.0, 0.0];
   var scaleMatrix = [0.5, 0.4, 0.63];
   var color = [1.0,0.52,0.87];
   var axis = [0,0,1];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //head
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.0, 0.3, 0.75];
   var scaleMatrix = [0.35, 0.35, 0.35];
   var color = [1.0,0.63,0.98];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //nose
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.0, 0.26, 1.05];
   var scaleMatrix = [0.21, 0.16, 0.16];
   var color = [1.0,0.52,0.87];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.13, 0.3, 1.06];
   var scaleMatrix = [0.05, 0.05, 0.16];
   var color = [0.52,0.2,0.36];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [-0.13, 0.3, 1.06];
   var scaleMatrix = [0.05, 0.05, 0.16];
   var color = [0.52,0.2,0.36];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //left eye
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [-0.25, 0.55, 0.95];
   var scaleMatrix = [0.05, 0.05, 0.16];
   var color = [0.0,0.0,0.0];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [-0.15, 0.55, 0.95];
   var scaleMatrix = [0.05, 0.05, 0.16];
   var color = [1.0,1.0,1.0];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //right eye
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.25, 0.55, 0.95];
   var scaleMatrix = [0.05, 0.05, 0.16];
   var color = [0.0,0.0,0.0];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.15, 0.55, 0.95];
   var scaleMatrix = [0.05, 0.05, 0.16];
   var color = [1.0,1.0,1.0];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //right leg
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.3, -0.5, 0.4];
   var scaleMatrix = [0.14, 0.3, 0.15];
   var color = [1.0,0.63,0.98];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //left leg
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [-0.3, -0.5, 0.4];
   var scaleMatrix = [0.14, 0.3, 0.15];
   var color = [1.0,0.63,0.98];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,-1*currentAngle,axis);
   //back left leg
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [-0.3, -0.5, -0.4];
   var scaleMatrix = [0.14, 0.3, 0.15];
   var color = [1.0,0.63,0.98];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,-1*currentAngle,axis);
   //back right leg
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.3, -0.5, -0.4];
   var scaleMatrix = [0.14, 0.3, 0.15];
   var color = [1.0,0.63,0.98];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   //tail
   var rotateMatrix = [10.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.0, 0.0, -0.75];
   var scaleMatrix = [0.05, 0.05, 0.18];
   var color = [1.0,0.63,0.98];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,-1*currentAngle,axis);
   //ears
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [0.3, 0.7, 0.8];
   var scaleMatrix = [0.1, 0.1, 0.05];
   var color = [1.0,0.52,0.87];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
   var rotateMatrix = [0.0, 1.0, 0.0, 0.0];
   var translateMatrix = [-0.3, 0.7, 0.8];
   var scaleMatrix = [0.1, 0.1, 0.05];
   var color = [1.0,0.52,0.87];
   var axis = [1,0,0];
   drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,currentAngle,axis);
 }

 function drawCube(gl,rotateMatrix,translateMatrix,scaleMatrix,color,degree,axis){
   var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
   // Set the vertex information
   var n = initVertexBuffers(gl,color);
   if (n < 0) {
     console.log('Failed to set the vertex information');
     return;
   }
   //will be used for all the alpine transformation
   var transformationMatrix = new Matrix4();
   //result matrix after transform
   var finalMatrix = new Matrix4();
   //////
   transformationMatrix.setRotate(degree, axis[0] , axis[1] , axis[2]);
   transformationMatrix.rotate(rotateMatrix[0],rotateMatrix[1],rotateMatrix[2],rotateMatrix[3]);
   transformationMatrix.translate(translateMatrix[0],translateMatrix[1],translateMatrix[2]);
   transformationMatrix.scale(scaleMatrix[0],scaleMatrix[1],scaleMatrix[2]);
   finalMatrix.set(mvpMatrix).multiply(transformationMatrix);
   // Pass the model view projection matrix to u_MvpMatrix
   gl.uniformMatrix4fv(u_MvpMatrix, false, finalMatrix.elements);
   // Draw the cube
   gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
 }

function initVertexBuffers(gl,c) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  var vertices = new Float32Array([   // Vertex coordinates
     1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
     1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
     1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
     1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
  ]);

  var colors = new Float32Array([     // Colors
    // 1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v0-v1-v2-v3 front(white)
    // 1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v0-v3-v4-v5 right(white)
    // 1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v0-v5-v6-v1 up(white)
    // 1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v1-v6-v7-v2 left(white)
    // 1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down(white)
    // 1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0   // v4-v7-v6-v5 back(white)

    c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  // v0-v1-v2-v3 front(white)
    c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  // v0-v3-v4-v5 right(white)
    c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  // v0-v5-v6-v1 up(white)
    c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  // v1-v6-v7-v2 left(white)
    c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  // v7-v4-v3-v2 down(white)
    c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2],  c[0], c[1], c[2]   // v4-v7-v6-v5 back(white)
  ]);

  var indices = new Uint8Array([       // Indices of the vertices
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  // Create a buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer)
    return -1;

  // Write the vertex coordinates and color to the buffer object
  if (!initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position'))
    return -1;

  if (!initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color'))
    return -1;

  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, num, type, attribute) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
// Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return true;
}
//var g_last = Date.now()
var begin = 1;
//variable used to indicate beginning of animation

function animate(angle) {
  // // Calculate the elapsed time
  //  var now = Date.now();
  //  var elapsed = now - g_last;
  //  g_last = now;
  // // // Update the current rotation angle (adjusted by the elapsed time)
  //  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  /////////////////////////////



  if (begin == 1){
    if(angle < -5 ){
      begin = 0;
    }
    return angle - 0.2;
  }else {
    if(angle > 5){
      begin = 1;
    }
    return angle+0.2;
  }

  //////////////////////////////


  //return newAngle %= 360;
}
