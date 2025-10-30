//css alternativa
  const themeBtn = document.getElementById('themeToggle');
  const themeLink = document.getElementById('theme-link');
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    themeLink.disabled = false; // activa oscuro.css
    document.body.classList.add('dark-mode');
  } else {
    themeLink.disabled = true; // usa claro.css
    document.body.classList.remove('dark-mode');
  }
  // Evento del botón de alternancia
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = !themeLink.disabled;
      if (isDark) {
        // Cambiar a claro
        themeLink.disabled = true;
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', false);
      } else {
        // Cambiar a oscuro
        themeLink.disabled = false;
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', true);
      }
    });
  }
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
//ojito de contraseña
