//desplegable
const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdownMenu');

menuBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});
window.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
});

//css alternativa
const themeBtn = document.getElementById('themeToggle');
const themeLink = document.getElementById('theme-link');
const body = document.body;

// Verifica si el usuario ya tiene un tema guardado
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    themeLink.setAttribute('href', 'oscuro.css');
    body.classList.add('dark-mode');
  }

  // Alterna el tema
  themeBtn.addEventListener('click', () => {
    const isDark = themeLink.getAttribute('href') === 'oscuro.css';
    if (isDark) {
      themeLink.setAttribute('href', 'style.css');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      themeLink.setAttribute('href', 'oscuro.css');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  });

//ojito de contraseña