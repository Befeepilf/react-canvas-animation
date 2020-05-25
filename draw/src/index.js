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

export {fill};

export const init = (_ctx, _width, _height) => {
  ctx = _ctx;
  width = _width;
  height = _height;
}

export const bg = (r,g,b) => {
  fill(r,g,b);
  ctx.fillRect(0, 0, width, height);
}

export const stroke = (r,g,b) => ctx.strokeStyle = argsToColor(r,g,b)

export const strokeWeight = w => ctx.lineWidth = w

export const translate = (x,y) => ctx.translate(x,y)

export const rotate = rad => ctx.rotate(rad)

export const scale = (x,y) => ctx.scale(x,y)

export const line = (x1,y1, x2,y2) => {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

export const rect = (x,y,w,h) => ctx.fillRect(x,y,w,h)

export const triangle = (x1,y1, x2,y2, x3,y3) => {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x3,y3);
  ctx.fill();
}

export const circle = (x,y,r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.fill();
}
