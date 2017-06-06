document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  let height = 0;
  let width = 0;
  const color = '#' + Math.floor(Math.random()*16777215).toString(16);

  function animate() {
    const triangle = document.getElementById('triangle');

    height += 5;
    width += 5;

    triangle.style.borderBottom = `${height}px solid ${color}`;
    triangle.style.borderLeft = `${width}px solid transparent`;

    if (height <= window.innerHeight * 2
      || width <= window.innerWidth * 2) setTimeout(() => animate(), 10);
  }

  btn.addEventListener('click', () => {
    const triangle = document.createElement('div');
    triangle.id = 'triangle';
    triangle.style.position = 'absolute';
    triangle.style.width = 0;
    triangle.style.height = 0;
    triangle.style.bottom = 0;
    triangle.style.right = 0;

    document.body.appendChild(triangle);

    animate(triangle);
  });
});
