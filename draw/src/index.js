import Canvas from '@react-canvas-animation/core';

/*
  converts arguments to CSS compatible color values
  accepts either 1 or 3 arguments
  for 1 argument:
    if r is a string return r
    if r is a number treat g & b values as being equal to r
  for 3 arguments: threat them as red, green & blue values
*/
function argsToColor(r, g, b) {
  if(r !== undefined && g === undefined && b == undefined) {
    g = b = r;
  }
  return typeof r === 'string' ? r : `rgb(${r},${g},${b})`;
}

/*
  Adds a function to the prototype of Canvas
  To keep track of which custom functions has been added to its prototype add the function's name to an array in this prototype
  We need to keep track of added functions because inside Canvas they are lifted to the instance's this and
    Canvas is a React component so we only want to lift these custom functions and don't mess around with React specific functions
*/
function addToProto(name, func) {
  Canvas.prototype[name] = func;

  if(!Canvas.prototype.customFunctions) {
    Canvas.prototype.customFunctions = [];
  }
  Canvas.prototype.customFunctions.push(name);
}


addToProto('fill', function (r,g,b) {
  this.ctx.fillStyle = argsToColor(r,g,b);
});

addToProto('bg', function(r,g,b) {
  this.fill(r,g,b);
  this.ctx.fillRect(0, 0, this.width, this.height);
});

addToProto('stroke', function(r,g,b) {
  this.ctx.strokeStyle = argsToColor(r,g,b);
});

addToProto('strokeWeight', function(w) {
  this.ctx.lineWidth = w
});

addToProto('translate', function(x,y) {
  this.ctx.translate(x,y)
});

addToProto('rotate', function(rad) {
  this.ctx.rotate(rad);
});

addToProto('scale', function(x,y) {
  this.ctx.scale(x,y);
});

addToProto('line', function(x1,y1, x2,y2) {
  this.ctx.beginPath();
  this.ctx.moveTo(x1,y1);
  this.ctx.lineTo(x2,y2);
  this.ctx.stroke();
});

addToProto('rect', function(x,y,w,h) {
  this.ctx.fillRect(x,y,w,h);
});

addToProto('triangle', function(x1, y1, x2, y2, x3, y3) {
  this.ctx.beginPath();

  // if only 3 arguments are present
  // (x1, y1) = coordinate of the center of triangle's base
  // x2 = side length
  if(y2 === undefined && x3 === undefined && y3 === undefined) {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x1 + x2 / 2, y1); // right corner
    this.ctx.lineTo(x1, y1 - x2 * Math.sqrt(3) / 2); // top corner
    this.ctx.lineTo(x1 - x2 / 2, y1); // left corner
  }
  // if all arguments are present
  else {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
  }
  this.ctx.fill();
});

addToProto('circle', function(x,y,r) {
  this.ctx.beginPath();
  this.ctx.arc(x, y, r, 0, 2 * Math.PI);
  this.ctx.fill();
});

addToProto('drawVector', function(v) {
  this.line(0, 0, v.x, v.y);
  this.ctx.save();
  this.translate(v.x, v.y);
  this.rotate(-v.angle() + Math.PI / 2);
  this.triangle(0, 0, 20);
  this.ctx.restore();
});
