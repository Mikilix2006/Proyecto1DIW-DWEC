/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Inicialización de variable password para que se vaya actualizando
// conforme el texto del input vaya cambiando
var isPassValid = false;

// Recuperación de datos del formulario
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
            isPassValid
        ) return true;
    // No todas las variables son válidas
    return false;
}

// Declaración de expresiones regulares globales
const lettersOnlyRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]+$");
const letterOnlyRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]$");
const numbersOnlyRegExp = new RegExp("^[0-9]+$");
const telephonesOnlyRegExp = new RegExp("^[\+]{0,1}[0-9]+$");
const hasToContainLettersRegExp = new RegExp("[a-zA-ZÁáÉéÍíÓóÚúÑñ]+");
const streetValidationRegExp = new RegExp("^[a-zA-ZÁáÉéÍíÓóÚúÑñ]+[,/]{0,1}[0-9]{0,}");
const hasToContainMinusLetterRegExp = new RegExp("[a-zñáéíóú]");
const hasToContainSpecialCharRegExp = new RegExp("[!#$%&]");
const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

function handleNameValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgName");
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
        //name.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //name.autofocus = true;
        return false;
    }
}

function handleSurnameValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgSurname");
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
        //surname.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //surname.autofocus = true;
        return false;
    }
}

function handleInitialValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgInitial");
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
        //initial.autofocus = true;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //initial.autofocus = true;
        return false;
    }
}

function handleStreetValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgStreet");
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
        if (streetValidationRegExp.exec(street.value.trim())===null) {
            throw new Error("La calle debe contener letras");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }
        
        // Activar variable para conocer que la calle es válida
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        //street.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //street.autofocus = true;
        return false;
    }
}

function handleCityValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgCity");
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
        //city.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //city.autofocus = true;
        return false;
    }
}

function handleStateValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgState");
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
        //state.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //state.autofocus = true;
        return false;
    }
}

function handleZipValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgZip");
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
        //zip.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //zip.autofocus = true;
        return false;
    }
}

function handleTelfValidations() {
    // Recuperación de los elementos del formulario
    const msgBox = document.getElementById("responseMsgTelf");
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
        if (telephonesOnlyRegExp.exec(telf.value.trim())===null) {
            throw new Error("El teléfono solo puede contener númerosy el '+', sin espacios");
        } else { // Oculta el div en caso de no haber error en la expresion
            msgBox.style.display = 'none';
        }       
        
        // Activar variable para conocer que el teléfono es válido
        // Si el código llega hasta aqui, quiere decir que no ha saltado ningún error
        //telf.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBox.style.color = "#ff0000";
        msgBox.style.marginTop = "5px";
        msgBox.textContent = e.message;
        msgBox.style.display = 'block';
        //telf.autofocus = true;
        return false;
    }
}

function handleMailValidations() {
    // Recuperación de los elementos del formulario
    const msgBoxMail = document.getElementById("responseMsgMail");
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
        //mail.autofocus = false;
        return true;
        
    } catch(e) {
        // TRATAMIENTO DE ERRORES
        msgBoxMail.style.color = "#ff0000";
        msgBoxMail.style.marginTop = "5px";
        msgBoxMail.textContent = e.message;
        msgBoxMail.style.display = 'block';
        //mail.autofocus = true;
        return false;
    }
}


// Recuperación de los elementos del formulario
const msgBoxPass = document.getElementById("responseMsgPass");
const msgBoxLength = document.getElementById("caracteres");
const msgBoxLetters = document.getElementById("letras");
const msgBoxChar = document.getElementById("caracterEspecial");

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
        isPassValid = false;
        msgBoxLength.style.color = "#ff0000";
    } else { // Marca como verdadera la condición de longitud
        isLengthValid = true;
        msgBoxLength.style.color = "#5620ad";
    }
    // Comprobar que mínimo una de sus letras sea minúscula
    if (hasToContainMinusLetterRegExp.exec(pass.value.trim())===null) {
        areLettersValid = false;
        isPassValid = false;
        msgBoxLetters.style.color = "#ff0000";
    } else { // Marca como verdadera la condición de letra minúscula
        areLettersValid = true;
        msgBoxLetters.style.color = "#5620ad";
    }
    // Comprobar que contenga como mínimo uno de estos caracteres (! # $ % &)
    if (hasToContainSpecialCharRegExp.exec(pass.value.trim())===null) {
        hasOneSpecialCharMin = false;
        isPassValid = false;
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
        // Recuperación del formulario
        //window.alert("La información del formulario es válida.");
        const formularioSignUp = document.getElementById("signUpForm");
        const msgBoxSignUp = document.getElementById("responseMsgSignUp");
        // Crear objeto customer en xml
        const xml = `
                    <customer>
                        <id>${formularioSignUp.id.value.trim()}</id>
                        <firstName>${name.value.trim()}</firstName>
                        <lastName>${surname.value.trim()}</lastName>
                        <middleInitial>${initial.value.trim()}</middleInitial>
                        <street>${street.value.trim()}</street>
                        <city>${city.value.trim()}</city>
                        <state>${state.value.trim()}</state>
                        <zip>${zip.value.trim()}</zip>
                        <phone>${telf.value.trim()}</phone>
                        <email>${mail.value.trim()}</email>
                        <password>${pass.value.trim()}</password>
                    </customer>
                `.trim();
        // ENVIO DE DATOS
        // CREAR POST REQUEST Y PROCESAR RESPUESTAS HTTP
        fetch(formularioSignUp.action,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml'
                },
                body: 
                        xml
            }).then(response => {
                // PROCESADO DE RESPUESTA 403
                // Correo existente en la base de datos
                if (response.status===403) {
                    return response.text().then(text => {
                        throw new Error("Ese correo electrónico ya está en uso");
                    }); // Fin del return
                } // Fin del if
                // PROCESADO DE RESPUESTA 500
                // Ha habido un error en la conexión
                else if (response.status===500) {
                    return response.text().then(text => {
                        throw new Error("No ha sido posible conectar con el servidor, intentalo mas tarde");
                    }); // Fin del return
                } // Fin del if
                // PROCESADO DE RESPUESTA 201
                // Se ha creado el usuario
                else if (response.status===201) {
                    window.location.href = '/signUp.html';
                } // Fin del if
                // PROCESADO DE RESPUESTA DESCONOCIDA
                // Ha habido un error inesperado
                else if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text || "Ha ocurrido un error inesperado");
                    }); // Fin del return
                } // Fin del if
                // Si llega hasta aqui, no ha habido ningún error
                // Código 200
                return response;
            })
            // PROCESAR RESPUESTA OK
                .then(data => {
                    // Guardar los datos
                    //guardarDatosEnXML(data);
                    
                    msgBoxSignUp.style.color = "#5620ad";
                    msgBoxSignUp.textContent = "Se ha registrado al usuario correctamente";
                    msgBoxSignUp.style.display = 'block';
            })
            // MOSTRAR ERRORES
                .catch(e => {
                    msgBoxSignUp.style.color = "#ff0000";
                    msgBoxSignUp.textContent = "Error: " + e.message;
                    msgBoxSignUp.style.display = 'block';
            });
    } else {
        window.alert("La información del formulario no es válida, revísela y modifíquela.");
        // Crear funcion que haga focus al primer campo vacio para que el usuario lo rellene
    }
    
}
/*
function guardarDatosEnXML(xmlString) {
    //Create XML parser
    const parser = new DOMParser();
    //Parse response XML data
    const xmlDoc=parser.parseFromString(xmlString,"application/xml");
    //Create Customer object with data received in response
    const customer=new Customer(
        xmlDoc.getElementsByTagName("id")[0].textContent,
        xmlDoc.getElementsByTagName("firstName")[0].textContent,
        xmlDoc.getElementsByTagName("lastName")[0].textContent,
        xmlDoc.getElementsByTagName("middleInitial")[0].textContent,
        xmlDoc.getElementsByTagName("street")[0].textContent,
        xmlDoc.getElementsByTagName("city")[0].textContent,
        xmlDoc.getElementsByTagName("state")[0].textContent,
        xmlDoc.getElementsByTagName("zip")[0].textContent,
        xmlDoc.getElementsByTagName("phone")[0].textContent,
        xmlDoc.getElementsByTagName("email")[0].textContent,
        xmlDoc.getElementsByTagName("password")[0].textContent,
    );
    // Save data to sessionStorage
    sessionStorage.setItem("customer.id", customer.id);
    sessionStorage.setItem("customer.firstName", customer.firstName);
    sessionStorage.setItem("customer.lastName", customer.lastName);
    sessionStorage.setItem("customer.middleInitial", customer.middleInitial);
    sessionStorage.setItem("customer.street", customer.street);
    sessionStorage.setItem("customer.city", customer.city);
    sessionStorage.setItem("customer.state", customer.state);
    sessionStorage.setItem("customer.zip", customer.zip);
    sessionStorage.setItem("customer.phone", customer.phone);
    sessionStorage.setItem("customer.email", customer.email);
    sessionStorage.setItem("customer.password", customer.password);
}
*/