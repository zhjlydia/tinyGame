export function divideCoordinate(w, h, row, col) {
  var i, j, cw = w / col, ch = h / row, r = [];
  for (i = 0; i < row; i++) {
    var c = [];
    for (j = 0; j < col; j++) {
      c.push({ x: cw * j, y: ch * i });
    }
    r.push(c);
  }
  return r;
};