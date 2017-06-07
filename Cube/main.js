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
const triangles = [];

function makeTriangle(a, b, c) {
  return [a, b, c];
}

function initGeometry() {
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        points.push([x, y, z]);
      }
    }
  }

  for (let dimension = 0; dimension <= 2; dimension++) {
    for (let side = -1; side <= 1; side += 2) {
      const sidePoints = points.filter((point) => {
        return point[dimension] === side;
      });

      const a = sidePoints[0];
      const b = sidePoints[1];
      const c = sidePoints[2];
      const d = sidePoints[3];

      triangles.push(makeTriangle(a, b, c));
      triangles.push(makeTriangle(d, b, c));
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

function renderTriangle(triangle) {
  const projectedTriangle = triangle.map(project);
  const a = projectedTriangle[0];
  const b = projectedTriangle[1];
  const c = projectedTriangle[2];

  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.lineTo(c[0], c[1]);
  ctx.lineTo(a[0], a[1]);
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
  triangles.forEach((triangle) => {
    const rotatedTriangle = triangle.map((point) => {
      point = rotateY(point, theta);
      point = rotateX(point, 0.43 * theta);
      return point;
    });
    renderTriangle(rotatedTriangle);
  });
  requestAnimationFrame(render);
}

initGeometry();
render();
