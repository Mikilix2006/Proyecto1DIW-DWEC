function applyTheme() {
    const themeLink = document.getElementById('theme-link');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        themeLink.disabled = false;
        document.body.classList.add('dark-mode');
    } else {
        themeLink.disabled = true;
        document.body.classList.remove('dark-mode');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applyTheme(); // Aplicamos el tema guardado inmediatamente

    const changeThemeButton = document.getElementById('themeToggle');
    const dropMenuBttn = document.getElementById('menuBtn');
    const salirSessionBttn = document.getElementById('botonCerrarSesion');

    if (changeThemeButton) changeThemeButton.addEventListener('click', changeTheme);
    if (dropMenuBttn) dropMenuBttn.addEventListener('click', dropDownMenu);
    if (salirSessionBttn) salirSessionBttn.addEventListener('click', salirSession);
});

function changeTheme() {
    const themeLink = document.getElementById('theme-link');
    const turningDark = themeLink.disabled; // Si está desactivado, vamos a activarlo

    if (turningDark) {
        themeLink.disabled = false;
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        themeLink.disabled = true;
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
}
  
//BURGER MENU DROP DOWN
function dropDownMenu() {
    const menu = document.getElementById("dropdownMenu");
    const btn = document.getElementById("menuBtn");
    if (!menu || !btn) return; // Seguridad

    const isVisible = menu.style.display === "block";
    menu.style.display = isVisible ? "none" : "block";
    btn.setAttribute("aria-expanded", !isVisible);
    
    if (!isVisible) {
        const exitBtn = document.getElementById("botonCerrarSesion");
        if (exitBtn) exitBtn.focus();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const menu = document.getElementById("dropdownMenu");
        const btn = document.getElementById("menuBtn");
        menu.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
        btn.focus(); // Devolvemos el foco al botón
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
        tooglePasswordImg.src='/NovaBank/assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-svgrepo-com.svg';
    }
}
// SHOW AND HIDE THE SIGNUP PASSWORD
function signUpShowHidePassword(){
    //CAPTURE THE BUTTON AND PASSWORD FIELD
    const passwordInput = document.getElementById('pass');
    const tooglePassword = document.getElementById('togglePassword');
    //IMG VALUE
    const tooglePasswordImg = document.getElementById('eyeIcon');
    //JUST CHANGE THE PASSWORD INPUT'S ATRIBUTE TYPE
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-svgrepo-com.svg';
    }
}

// SHOW AND HIDE THE SIGNUP DUPPLICATED PASSWORD
function signUpShowHideDuppedPassword(){
    //CAPTURE THE BUTTON AND PASSWORD FIELD
    const passwordInput = document.getElementById('duppedPass');
    const tooglePassword = document.getElementById('toggleDuppedPassword');
    //IMG VALUE
    const tooglePasswordImg = document.getElementById('eyeIcon-dupped');
    //JUST CHANGE THE PASSWORD INPUT'S ATRIBUTE TYPE
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-svgrepo-com.svg';
    }
}

// *******  CHANGE PASSWORD   ******** //
//SHOW AND HIDE CURRENTPASSWORD
function showHiCurrentPassword(){
    //CAPTURE THE BUTTON AND PASSWORD FIELD
    const passworInput = document.getElementById('password');
    const tooglePassword = document.getElementById('toggleCurrentPassword');
    //IMG VALUE
    const tooglePasswordImg = document.getElementById('eyeIconCurrent');
    //JUST CHANGE THE PASSWORD INPUT'S ATRIBUTE TYPE
    if (passworInput.type === 'password') {
        passworInput.type = 'text';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-svgrepo-com.svg';
    }
}

//SHOW AND HIDE THE NEWPASSWORD 
function showHiNewPassword(){
    //CAPTURE THE BUTTON AND PASSWORD FIELD
    const passworInput = document.getElementById('nueva_password');
    const tooglePassword = document.getElementById('toggleNewPassword');
    //IMG VALUE
    const tooglePasswordImg = document.getElementById('eyeIconNew');
    //JUST CHANGE THE PASSWORD INPUT'S ATRIBUTE TYPE
    if (passworInput.type === 'password') {
        passworInput.type = 'text';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-svgrepo-com.svg';
    }
}

//SHOW AND HIDE THE VERIFYPASSWORD
function showHiVerifyPassword(){
    //CAPTURE THE BUTTON AND PASSWORD FIELD
    const passworInput = document.getElementById('confirmar_password');
    const tooglePassword = document.getElementById('toggleVerifyPassword');
    //IMG VALUE
    const tooglePasswordImg = document.getElementById('eyeIconVerify');
    //JUST CHANGE THE PASSWORD INPUT'S ATRIBUTE TYPE
    if (passworInput.type === 'password') {
        passworInput.type = 'text';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='/NovaBank/assets/img/eye-svgrepo-com.svg';
    }
}
//CERRR SESSION
function salirSession(){
    sessionStorage.clear();
    window.location = "/NovaBank/index.html";
}
