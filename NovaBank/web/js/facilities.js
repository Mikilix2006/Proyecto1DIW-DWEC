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
document.addEventListener("Click", () => {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("tfPassword");
  const eyeIcon = document.getElementById("eyeIcon");

  if (togglePassword && passwordInput && eyeIcon) {
    togglePassword.addEventListener("click", () => {

      // Si la contraseña está oculta, la mostramos
      if (passwordInput.type === "password") {
        passwordInput.type = "text";

        // Cambiamos el icono a ojo cerrado
        eyeIcon.innerHTML = `
          <path d="M1 1l22 22M12 5c-7.633 0-11 7-11 7s3.367 7 11 7c1.816 0 3.486-.342 5.01-.96M15 15a3 3 0 0 1-4.24-4.24M9 9a3 3 0 0 1 4.24 4.24"/>
        `;
      } 
      // Si está visible, la volvemos a ocultar
      else {
        passwordInput.type = "password";

        // Cambiamos el icono a ojo abierto
        eyeIcon.innerHTML = `
          <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
        `;
      }

    });
  }
});
