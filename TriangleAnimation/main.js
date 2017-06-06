document.addEventListener('DOMContentLoaded', () => {
  const time = 1 / 300;
  const btn = document.getElementById('btn');
  let height = 0;
  let width = 0;
  let color = '#' + Math.floor(Math.random()*16777215).toString(16);
  while (color.length !== 7) {
    color = '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  function animate() {
    const triangle = document.getElementById('triangle');

    height += window.innerHeight * time;
    width += window.innerWidth * time;

    triangle.style.borderBottom = `${height}px solid ${color}`;
    triangle.style.borderLeft = `${width}px solid transparent`;

    if (height <= window.innerHeight * 2
      || width <= window.innerWidth * 2) {
        setTimeout(() => animate(), time);
      }
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
