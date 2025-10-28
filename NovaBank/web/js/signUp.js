/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Inicialización de variables para control de submit
var isNameValid = false;
var isSurnameValid = false;
var isInitialValid = true;
var isStreetValid = false;
var isCityValid = false;
var isStateValid = false;
var isZipValid = false;
var isTelfValid = false;
var isMailValid = false;
var isPassValid = false;

function checkControlVariablesStatus() {
    // Si todas las variables indican que son válidas, devolverá true
    if (
            handleNameValidations() &&
            handleSurnameValidations() &&
            handleInitialValidations() &&
            handleStreetValidations() &&
            handleCityValidations() &&
            handleStateValidations() &&
            handleZipValidations() &&
            handleTelfValidations() &&
            handleMailValidations() &&
            handlePassValidations()
        ) return true;
    // No todas las variables son válidas
    return false;
}

// Declaración de expresiones regulares globales
const lettersOnlyRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]+$");
const letterOnlyRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]$");
const numbersOnlyRegExp = new RegExp("^[0-9]+$");
const hasToContainLettersRegExp = new RegExp("[a-zA-ZÁáÉéÍíÓóÚúÑñ]+");
const hasToContainMinusLetterRegExp = new RegExp("[a-zñáéíóú]");
const hasToContainSpecialCharRegExp = new RegExp("[!#$%&]");
const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

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
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isNameValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
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
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isSurnameValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
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
        return true;
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isInitialValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
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
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isStreetValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
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
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isCityValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
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
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isStateValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
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
            throw new Error("El código postal solo puede contener números");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }       
        
        // Activar variable para conocer que el código postal es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isZipValid = true;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isZipValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
    }
}

function handleTelfValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgTelf");
    const telf = document.getElementById("telf");
    try {        
        // VALIDACIONES CAMPO TELÉFONO
        // Comprobar si esta informado
        if (telf.value.trim()==="") {
            throw new Error("El teléfono debe ser rellenado o no son solo números");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBox.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (telf.value.trim().length>=255) {
            throw new Error("El teléfono debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBox.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (numbersOnlyRegExp.exec(telf.value.trim())===null) {
            throw new Error("El teléfono solo puede contener números");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }       
        
        // Activar variable para conocer que el teléfono es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isTelfValid = true;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isTelfValid = false;
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        return false;
    }
}

function handleMailValidations() {
    // Recuperación de los elementos del formulario
    const msgBoxMail = document.getElementById("responseMsgMail");
    const mail = document.getElementById("mail");
    try {
        // VALIDACIONES CAMPO CORREO ELECTRÓNICO
        // Comprobar si esta informado
        if (mail.value.trim()==="") {
            throw new Error("El correo electrónico debe ser rellenado");
        } else { // Oculta el div en caso de no haber error al estar informado
            msgBoxMail.style.display = 'none';
        }
        // Comprobar que no exceda la longitud permitida
        if (mail.value.trim().length>=255) {
            throw new Error("El correo electrónico debe tener menos de 255 caracteres");
        } else { // Oculta el div en caso de no haber error en la longitud
            msgBoxMail.style.display = 'none';
        }
        // Comprobar que lo introducido este permitido
        if (emailRegExp.exec(mail.value.trim())===null) {
            throw new Error("El formato del correo electrónico es inválido. Ejemplo: nova@bank.com");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBoxMail.style.display = 'none';
        }       
        
        // Activar variable para conocer que el correo electrónico es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        isMailValid = true;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        isMailValid = false;
        msgBoxMail.style.color = "#ff0000";
        msgBoxMail.style.marginTop = "5px";
        msgBoxMail.textContent = e.message;
        msgBoxMail.style.display = 'block';
        return false;
    }
}


// Recuperación de los elementos del formulario
const msgBoxPass = document.getElementById("responseMsgPass");
const msgBoxLength = document.getElementById("caracteres");
const msgBoxLetters = document.getElementById("letras");
const msgBoxChar = document.getElementById("caracterEspecial");
const pass = document.getElementById("pass");

// Variables de contorl para mensaje debajo del campo contraseña
var isLengthValid = false;
var areLettersValid = false;
var hasOneSpecialCharMin = false;

// Hacer validaciones de la contraseña mientras se cambia el contenido del input
pass.addEventListener('input', function() {
    // Mostramos los patornes de validación
    msgBoxPass.hidden = false;
    // VALIDACIONES CAMPO CONTRASEÑA
    // Comprobar que tenga un mínimo de 12 caracteres y maximo 50
    if (pass.value.trim().length<12 || pass.value.trim().length>50) {
        isLengthValid = false;
        msgBoxLength.style.color = "#ff0000";
    } else { // Marca como verdadera la condición de longitud
        isLengthValid = true;
        msgBoxLength.style.color = "#5620ad";
    }
    // Comprobar que mínimo una de sus letras sea minúscula
    if (hasToContainMinusLetterRegExp.exec(pass.value.trim())===null) {
        areLettersValid = false;
        msgBoxLetters.style.color = "#ff0000";
    } else { // Marca como verdadera la condición de letra minúscula
        areLettersValid = true;
        msgBoxLetters.style.color = "#5620ad";
    }
    // Comprobar que contenga como mínimo uno de estos caracteres (! # $ % &)
    if (hasToContainSpecialCharRegExp.exec(pass.value.trim())===null) {
        hasOneSpecialCharMin = false;
        msgBoxChar.style.color = "#ff0000";
    } else { // Marca como verdadera la condición de caracter especial
        hasOneSpecialCharMin = true;
        msgBoxChar.style.color = "#5620ad";
    }

    // Activar variable para conocer que la contraseña es válida
    if (isLengthValid && areLettersValid && hasOneSpecialCharMin) {
        // Activamos variable de contraseña correcta
        isPassValid = true;
        // Ocultamos los patornes de validación
        msgBoxPass.hidden = true;
    }
});


function handleSignUpOnClick(event) {
    // Detención del burbujeo
    event.preventDefault();
    event.stopPropagation();
    
    // Si todas las variables son verdaderas, devolverá true
    if (checkControlVariablesStatus()) {
        // Comienzo del bloque de validaciones
        try {
            // Recuperación del formulario
            const formulario = document.getElementById("formul");
        } catch (e) {
            // TRATAMIENTO DE ERRORES
        }
    } else {
        window.alert("La información del formulario no es válida, revísela y modifíquela.")
    }
    
}
