let ctx, width, height;

function argsToColor(r,g,b) {
  if(r !== undefined && g === undefined && b == undefined) {
    g = b = r;
  }
  return typeof r === 'string' ? r : `rgba(${r},${g},${b})`;
}

function fill(r,g,b) {
  ctx.fillStyle = argsToColor(r,g,b);
}

module.exports = {
  init: (_ctx, _width, _height) => {
    ctx = _ctx;
    width = _width;
    height = _height;
  },
  bg: (r,g,b) => {
    fill(r,g,b);
    ctx.fillRect(0, 0, width, height);
  },
  fill,
  stroke: (r,g,b) => ctx.strokeStyle = argsToColor(r,g,b),
  strokeWeight: w => ctx.lineWidth = w,
  translate: (x,y) => ctx.translate(x,y),
  rotate: rad => ctx.rotate(rad),
  scale: (x,y) => ctx.scale(x,y),
  line: (x1,y1, x2,y2) => {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
  },
  rect: (x,y,w,h) => ctx.fillRect(x,y,w,h),
  triangle: (x1,y1, x2,y2, x3,y3) => {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.fill();
  },
  circle: (x,y,r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
  }
};
