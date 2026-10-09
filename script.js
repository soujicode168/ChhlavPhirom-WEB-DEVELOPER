// =====================================
// MOBILE NAVIGATION
// =====================================

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');

  menuBtn.setAttribute('aria-expanded', isOpen);
  menuBtn.setAttribute(
    'aria-label',
    isOpen ? 'Close menu' : 'Open menu'
  );
});

// Close menu after selecting a navigation link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});


// =====================================
// DARK / LIGHT MODE
// =====================================

const themeBtn = document.querySelector('.theme-btn');
const themeIcon = themeBtn.querySelector('i');
const themeLabel = themeBtn.querySelector('span');

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);

  // Update icon
  themeIcon.classList.toggle('fa-moon', !isDark);
  themeIcon.classList.toggle('fa-sun', isDark);

  // Update accessibility label
  themeBtn.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );

  themeBtn.setAttribute(
    'title',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );

  if (themeLabel) {
    themeLabel.textContent = 'Theme';
  }

  // Remember selected theme
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (error) {
    // Theme still works if storage is unavailable
  }
}

// Load saved theme
let savedTheme = 'light';

try {
  savedTheme = localStorage.getItem('theme') || 'light';
} catch (error) {
  // Use light mode by default
}

setTheme(savedTheme === 'dark');

// Switch theme when clicked
themeBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  setTheme(isDark);
});