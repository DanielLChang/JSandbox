document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');

  btn.addEventListener('click', () => {
    const triangle = document.createElement('div');
    triangle.style.position = 'absolute';
    triangle.style.width = 0;
    triangle.style.height = 0;
    // triangle.style.borderBottom = '100px solid black';
    // triangle.style.borderLeft = '100px solid transparent';

    triangle.style.bottom = 0;
    triangle.style.right = 0;

    document.body.appendChild(triangle);
  });
});
