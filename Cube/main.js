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

function perspectiveProjection(point) {
  const x = point[0];
  const y = point[1];
  const z = point[2];

  return [
    x / (z + 4),
    y / (z + 4)
  ];
}

function project(point) {
  const perspectivePoint = perspectiveProjection(point);
  const x = perspectivePoint[0];
  const y = perspectivePoint[1];

  return [
    W * (x - MODEL_MIN_X) / (MODEL_MAX_X - MODEL_MIN_X),
    H * (1 - (y  - MODEL_MIN_Y) / (MODEL_MAX_Y - MODEL_MIN_Y))
  ];
}

function renderPoint(point) {
  const projectedPoint = project(point);
  const x = projectedPoint[0];
  const y = projectedPoint[1];

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 1, y + 1);
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

function rotateY(point, theta) {
  const x = point[0];
  const y = point[1];
  const z = point[2];

  return [
    Math.cos(theta) * x - Math.sin(theta) * z,
    y,
    Math.sin(theta) * x + Math.cos(theta) * z
  ];
}

function rotateX(point, theta) {
  const x = point[0];
  const y = point[1];
  const z = point[2];

  return [
    x,
    Math.cos(theta) * y - Math.sin(theta) * z,
    Math.sin(theta) * y + Math.cos(theta) * z
  ];
}

let theta = 0;
const dtheta = 0.02;

function render() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, W, H);

  theta += dtheta;
  points.forEach((point) => {
    point = rotateY(point, theta);
    point = rotateX(point, 0.43 * theta);
    renderPoint(point);
  });
  requestAnimationFrame(render);
}

initGeometry();
render();
