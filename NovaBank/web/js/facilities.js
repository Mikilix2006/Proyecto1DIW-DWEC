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
//ojito de contraseña

//CERRR SESSION
function salirSession(){
    document.getElementById('botonCerrarSesion').addEventListener('click', function() {
    event.preventDefault();
    event.stopPropagation();
    sessionStorage.removeItem('customer.id');
    sessionStorage.removeItem('customer.firstName');
    sessionStorage.removeItem('customer.lastName');
    sessionStorage.removeItem('customer.middleInitial');
    sessionStorage.removeItem('customer.street');
    sessionStorage.removeItem('customer.city');
    sessionStorage.removeItem('customer.state');
    sessionStorage.removeItem('customer.zip');
    sessionStorage.removeItem('customer.phone');
    sessionStorage.removeItem('customer.email');
    sessionStorage.removeItem('customer.password');

    window.location.href = 'index.html'; 
    });
}