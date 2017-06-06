const W = 600;
const H = 600;
const STEP = 0.5;
const MODEL_MIN_X = 2;
const MODEL_MAX_X = -2;
const MODEL_MIN_Y = -2;
const MODEL_MAX_Y = 2;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const points = [];

function initGeometry() {
  for (let x = -1; x <= 1; x += STEP) {
    for (let y = -1; y <= 1; y += STEP) {
      for (let z = -1; z <= 1; z += STEP) {
        points.push([x, y, z]);
      }
    }
  }
}

function project(point) {
  return [
    W * (point[0] - MODEL_MIN_X) / (MODEL_MAX_X - MODEL_MIN_X),
    H * (1 - (point[1] - MODEL_MIN_Y) / (MODEL_MAX_Y - MODEL_MIN_Y))
  ];
}

function renderPoint(point) {
  const projectedPoint = project(point);
  const x = projectedPoint[0];
  const y = projectedPoint[1];

  ctx.moveTo(x, y);
  ctx.lineTo(x + 1, y + 1);
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

function render() {
  ctx.clearRect(0, 0, W, H);

  points.forEach((point) => {
    renderPoint(point);
  });
  requestAnimationFrame(render);
}

initGeometry();
render();
