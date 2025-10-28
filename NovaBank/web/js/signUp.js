/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Inicialización de variables para control de submit
var isNameValid = false;
var isSurnameValid = false;
var isInitialValid = false;
var isStreetValid = false;
var isCityValid = false;
var isStateValid = false;
var isZipValid = false;
var isTelfValid = false;
var isMailAndPassValid = false;

// Inicialización de variable para desbloquear el botón de REGISTRARSE
var isRegisterButtonUnlocked = false;

// Si todas las variables indican que son válidas, desbloquea el botón de REGISTRARSE
if (
        isNameValid &&
        isSurnameValid &&
        isInitialValid &&
        isStreetValid &&
        isCityValid &&
        isStateValid &&
        isZipValid &&
        isTelfValid &&
        isMailAndPassValid
    ) 
    {
    isRegisterButtonUnlocked = true;
}

// Declaración de expresiones regulares globales
const lettersOnlyRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]+$");
const letterOnlyRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]$");
const hasToContainLettersRegExp = new RegExp("[a-zA-ZÁáÉéÍíÓóÚúÑñ]+");
const numbersOnlyRegExp = new RegExp("^[0-9]+$");

function handleNameValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgName");
    const name = document.getElementById("name");
    try {        
        // VALIDACIONES CAMPO NOMBRE
        // Comprobar si esta informado
        if (name.value.trim()==="") {
            throw new Error("El nombre debe ser rellenado");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (name.value.trim().length>=255) {
            throw new Error("El nombre debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (lettersOnlyRegExp.exec(name.value.trim())===null) {
            throw new Error("El nombre solo puede contener letras");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }
        
        // Activar variable para conocer que el nombre es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isNameValid = true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isNameValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleSurnameValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgSurname");
    const surname = document.getElementById("surname");
    try {        
        // VALIDACIONES CAMPO APELLIDO
        // Comprobar si esta informado
        if (surname.value.trim()==="") {
            throw new Error("El apellido debe ser rellenado");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (surname.value.trim().length>=255) {
            throw new Error("El apellido debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (lettersOnlyRegExp.exec(surname.value.trim())===null) {
            throw new Error("El apellido solo puede contener letras");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }
        
        // Activar variable para conocer que el apellido es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isSurnameValid = true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isSurnameValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleInitialValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgInitial");
    const initial = document.getElementById("initial");
    try {        
        // VALIDACIONES CAMPO INICIAL
        // Comprobar que no exceda la longitud permitida
        if (initial.value.trim().length>1) {
            throw new Error("La inicial debe tener solo una letra");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        // Si la inicial está vacía, no pasa nada y sale del if
        if (initial.value.trim()!=="") {
            if (letterOnlyRegExp.exec(initial.value.trim())===null) {
                throw new Error("La inicial solo puede contener letras");
            } else { // Oculta el div en caso de no haber error en la expresion
                msgBox.style.display = 'none';
            }
        }
        
        // Activar variable para conocer que la inicial es válida
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isInitialValid = true;
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isInitialValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleStreetValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgStreet");
    const street = document.getElementById("street");
    try {        
        // VALIDACIONES CAMPO CALLE
        // Comprobar si esta informado
        if (street.value.trim()==="") {
            throw new Error("La calle debe ser rellenada");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (street.value.length>=255) {
            throw new Error("La calle debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (hasToContainLettersRegExp.exec(street.value.trim())===null) {
            throw new Error("La calle debe contener letras");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }
        
        // Activar variable para conocer que la calle es válida
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isStreetValid = true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isStreetValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleCityValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgCity");
    const city = document.getElementById("city");
    try {        
        // VALIDACIONES CAMPO CIUDAD
        // Comprobar si esta informado
        if (city.value.trim()==="") {
            throw new Error("La ciudad debe ser rellenada");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (city.value.length>=255) {
            throw new Error("La ciudad debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (lettersOnlyRegExp.exec(city.value.trim())===null) {
            throw new Error("La ciudad debe contener solo letras");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }
        
        // Activar variable para conocer que la calle es válida
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isCityValid = true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isCityValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleStateValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgState");
    const state = document.getElementById("state");
    try {        
        // VALIDACIONES CAMPO ESTADO
        // Comprobar si esta informado
        if (state.value.trim()==="") {
            throw new Error("El estado debe ser rellenado");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (state.value.trim().length>=255) {
            throw new Error("El estado debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (lettersOnlyRegExp.exec(state.value.trim())===null) {
            throw new Error("El estado solo puede contener letras");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }
        
        // Activar variable para conocer que el estado es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isStateValid = true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isStateValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleZipValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgZip");
    const zip = document.getElementById("zip");
    try {        
        // VALIDACIONES CAMPO CODIGO POSTAL
        // Comprobar si esta informado
        if (zip.value.trim()==="") {
            throw new Error("El código postal debe ser rellenado o no son solo números");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (zip.value.trim().length>=255) {
            throw new Error("El código postal debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (numbersOnlyRegExp.exec(zip.value.trim())===null) {
            throw new Error("El estado solo puede contener números");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }       
        
        // Activar variable para conocer que el código postal es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isZipValid = true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isZipValid = false;
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
    }
}

function handleTelfValidations() {
    
}


   
function handleSignUpOnClick(event) {

    // Comienzo del bloque de validaciones
    try {
        
        // Recuperación del formulario
        const formulario = document.getElementById("formul");

        // Recuperación de los elementos del formulario
        const name = document.getElementById("name");
        const surname = document.getElementById("surname");
        const initial = document.getElementById("initial");
        const street = document.getElementById("street");
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const zip = document.getElementById("zip");
        const telf = document.getElementById("telf");
        const mail = document.getElementById("mail");
        const pass = document.getElementById("pass");

        // Declaración de Expresiones Regulares para validar los datos introducidos
        const lettersOnlyRegExp = new RegExp("");
        const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        const passRegExp = new RegExp("");

        // Detención del burbujeo
        event.preventDefault();
        event.stopPropagation();
        
        // VALIDACIONES CAMPO NOMBRE
        // Comprobar si esta informado
        if (name.value.trim()==="") {
            throw new Error("El nombre debe ser rellenado");
        }
        // Comprobar que no exceda la longitud permitida
        if (name.value.length>=255) {
            window.alert("Nombre debe tener menos de 255 caracteres");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }
        // Comprobar que lo introducido este permitido
        if (lettersOnlyRegExp.exec(name.value.trim())===null) {
            window.alert("Nombre solo puede contener letras");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }
        
        // VALIDACIONES CAMPO APELLIDO
        // Comprobar si esta informado
        if (surname.value.trim()==="") {
            window.alert("Apellido debe ser rellenado");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }
        // Comprobar que no exceda la longitud permitida
        if (surname.value.length>=255) {
            window.alert("Apellido debe tener menos de 255 caracteres");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }
        // Comprobar que lo introducido este permitido
        if (lettersOnlyRegExp.exec(name.value.trim())===null) {
            window.alert("Nombre solo puede contener letras");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }

        // VALIDACIONES CAMPO INICIAL
        // Comprobar si esta informado
        // Comprobar que no exceda la longitud permitida
        // Comprobar que lo introducido este permitido

        // VALIDACIONES CAMPO CALLE
        // Comprobar si esta informado
        // Comprobar que no exceda la longitud permitida
        // Comprobar que lo introducido este permitido

        // VALIDACIONES CAMPO CIUDAD
        // Comprobar si esta informado
        // Comprobar que no exceda la longitud permitida
        // Comprobar que lo introducido este permitido

        // VALIDACIONES CAMPO ESTADO
        // Comprobar si esta informado
        // Comprobar que no exceda la longitud permitida
        // Comprobar que lo introducido este permitido

        // VALIDACIONES CAMPO CODIGO POSTAL
        // Comprobar si esta informado
        // Comprobar que no exceda la longitud permitida
        // Comprobar que lo introducido este permitido

        // VALIDACIONES CAMPO TELEFONO
        // Comprobar si esta informado
        // Comprobar que no exceda la longitud permitida
        // Comprobar que lo introducido este permitido

        // VALIDACIONES COMUNES DE EMAIL Y CONTRASEÑA
        // Comprobar si estan informados
        if (mail.trim()===""||pass.trim()==="") {
            window.alert("Email y contraseña deben ser rellenados");
            return;
                // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }

        // Validaciones Campo Email
        // Comprobar que no exceda la longitud permitida
        if (mail.value.length>255) {
            window.alert("Email no debe superar 255 caracteres");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }
        // Comprobar que lo introducido este permitido
        if (emailRegExp.exec(mail.value.trim())===null) {
            window.alert("El email no tiene un formato correcto");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }

        // Validaciones Campo Constraseña
        // Comprobar que no exceda la longitud permitida
        if (pass.value.length>255) {
            window.alert("Conrtaseña no debe superar 255 caracteres");
            return;
            // LANZAR UN ERROR Y ATRAPARLO EN SECCIÓN DE CÓDIGO 'CATCH'
        }
        // Comprobar que lo introducido este permitido
        
        
        
        
    } catch (e) {
        // TRATAMIENTO DE ERRORES
        const msgBox = document.getElementById("responseMsg");
        msgBox.className = 'error';
        msgBox.style.color = "red";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = 'Error: ' + e.message;
        msgBox.style.display = 'block';
    }
    
    
    /*
    const valueTfEmail = mail.value.trim();
    const valueTfPassword = pass.value.trim();
    formulario.action = formulario.action+`${encodeURIComponent(valueTfEmail)}/${encodeURIComponent(valueTfPassword)}`;
    formulario.submit();
    */
}
