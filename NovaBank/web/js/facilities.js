//CHECK IF THERES SESSION STORAGE THEME
const themeLink = document.getElementById('theme-link');
const darkMode = sessionStorage.getItem('darkMode') === 'true';
if (darkMode) {
  themeLink.disabled = false; // SWITCH OSCURO.CSS
  document.body.classList.add('dark-mode');
} else {
  themeLink.disabled = true; // SWITCH STYLE.CSS
  document.body.classList.remove('dark-mode');
}
function changeTheme(){
  const isDark = !themeLink.disabled;
  if (isDark) {
    //CHANGE TO BRIGHT
    themeLink.disabled = true;
    document.body.classList.remove('dark-mode');
    sessionStorage.setItem('darkMode', false);
  } else {
    //CHANGE TO DARK
    themeLink.disabled = false;
    document.body.classList.add('dark-mode');
    sessionStorage.setItem('darkMode', true);
  }
    
}
  
//BURGER MENU DROP DOWN
function dropDownMenu(){
    const menuBtn = document.getElementById('menuBtn');
    const dropdown = document.getElementById('dropdownMenu');  
    dropdown.classList.toggle('show');
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    } 
}
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
        tooglePasswordImg.src='assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        tooglePasswordImg.src='assets/img/eye-svgrepo-com.svg';
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
        tooglePasswordImg.src='assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        tooglePasswordImg.src='assets/img/eye-svgrepo-com.svg';
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
        tooglePasswordImg.src='assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='assets/img/eye-svgrepo-com.svg';
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
        tooglePasswordImg.src='assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='assets/img/eye-svgrepo-com.svg';
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
        tooglePasswordImg.src='assets/img/eye-closed-svgrepo-com.svg';
        //tooglePassword.innerText = 'Ocultar';
    } else {
        passworInput.type = 'password';
        tooglePasswordImg.src='assets/img/eye-svgrepo-com.svg';
    }
}


//CERRR SESSION
function salirSession(){
    sessionStorage.clear();
    window.location = "index.html";
}

