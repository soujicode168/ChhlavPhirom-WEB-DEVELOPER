const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

function downloadCV(event) {
  event.preventDefault();

  const link = document.createElement('a');
  link.href = './cv.pdf';
  link.download = 'cv.pdf';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}