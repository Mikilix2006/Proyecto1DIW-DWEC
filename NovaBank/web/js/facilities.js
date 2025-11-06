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
  
//BURGER MENU INTERACTIVE
const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdownMenu');
//SHOW CSS CALSSLIST PROPERTIES
menuBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});
window.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
});

//SHOW AND HIDE THE PASSWORD INPUT VALUE - USING SVG AS ICONS
function showHidePassword(){
    //CAPTURE THE BUTTON AND PASSWORD FIELD
    const passworInput = document.getElementById('tfPassword');
    const tooglePassword = document.getElementById('togglePassword');
    //IMG VALUE
    const tooglePasswordImg = document.getElementById('eyeIcon');
    //JUST CHANGE THE PASSWORD INPUT'S ATRIBUTE TYPE
    if (passworInput.type === 'password') {
        passworInput.type = 'text';
        tooglePasswordImg.src='assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='assets/img/eye-svgrepo-com.svg';
    }
}