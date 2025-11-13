/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Prueba
function validar_PasswordActual() {
    const passwordActual = document.getElementById("password");
    const passwordGuardada = sessionStorage.getItem("customer.password");

    if (!passwordGuardada)
        throw new Error("No se encontró la contraseña actual en la sesión. Inténtelo de nuevo.");

    if (passwordActual.value.trim() === "")
        throw new Error("Debe ingresar su contraseña actual.");

    if (passwordActual.value.trim() !== passwordGuardada)
        throw new Error("La contraseña actual no coincide con la registrada.");

    return true;
}

// === VALIDAR NUEVA CONTRASEÑA ===
function validar_NewPassword() {
    const nuevaPassword = document.getElementById("nueva_password");
    const passwordActual = document.getElementById("password");

    const valor = nuevaPassword.value.trim();
    const patronPassword = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ!#$%&]*$/;

    const requisitos = `
    Requisitos:
    - Mínimo 12 caracteres y máximo 50.
    - Al menos una letra mayúscula.
    - Al menos una letra minúscula.
    - Al menos uno de los siguientes símbolos: ! # $ % &.
    `;

    if (valor === "")
        throw new Error("Debe ingresar una nueva contraseña.\n" + requisitos);

    if (valor.length < 12)
        throw new Error("La nueva contraseña debe tener al menos 12 caracteres.\n" + requisitos);

    if (valor.length > 50)
        throw new Error("La nueva contraseña no puede tener más de 50 caracteres.\n" + requisitos);

    if (!patronPassword.test(valor))
        throw new Error("La nueva contraseña contiene caracteres no permitidos.\n" + requisitos);

    if (!/[A-ZÁÉÍÓÚÜÑ]/.test(valor))
        throw new Error("La nueva contraseña debe contener al menos una letra mayúscula.\n" + requisitos);

    if (!/[a-záéíóúüñ]/.test(valor))
        throw new Error("La nueva contraseña debe contener al menos una letra minúscula.\n" + requisitos);

    if (!/[!#$%&]/.test(valor))
        throw new Error("La nueva contraseña debe contener al menos uno de los siguientes símbolos: ! # $ % &.\n" + requisitos);

    if (valor === passwordActual.value.trim())
        throw new Error("La nueva contraseña no puede ser igual a la actual.\n" + requisitos);

    return true;
}

// === VALIDAR CONFIRMACIÓN DE CONTRASEÑA ===
function validar_ConfirmarPassword() {
    const nuevaPassword = document.getElementById("nueva_password");
    const confirmarPassword = document.getElementById("confirmar_password"); 

    if (confirmarPassword.value.trim() === "")
        throw new Error("Debe confirmar su nueva contraseña.");

    if (confirmarPassword.value.trim() !== nuevaPassword.value.trim())
        throw new Error("Las contraseñas no coinciden. Verifique los campos.");

    return true;
}

function sendRequestAndProcessResponse() {
    const formulario = document.getElementById("changePasswordForm");
    const cuadroMensaje = document.getElementById("mensajeRespuesta");
    const nuevaContrasena = document.getElementById("nueva_password").value.trim();
    
    const xml = `
    <customer> 
        <id>${sessionStorage.getItem("customer.id")}</id>
        <firstName>${sessionStorage.getItem("customer.firstName")}</firstName>
        <lastName>${sessionStorage.getItem("customer.lastName")}</lastName>
        <middleInitial>${sessionStorage.getItem("customer.middleInitial")}</middleInitial>
        <street>${sessionStorage.getItem("customer.street")}</street>
        <city>${sessionStorage.getItem("customer.city")}</city>
        <state>${sessionStorage.getItem("customer.state")}</state>
        <zip>${sessionStorage.getItem("customer.zip")}</zip>
        <phone>${sessionStorage.getItem("customer.phone")}</phone>
        <email>${sessionStorage.getItem("customer.email")}</email>
        <password>${nuevaContrasena}</password>    
    </customer>
    `;

    fetch(formulario.action, { 
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/xml' 
        },
        body: xml
    })
    .then(response => {
        if (response.status >=400 && response.status < 500)
            throw new Error("No autorizado. La sesión ha expirado o las credenciales son incorrectas.");
        else if (response.status >= 500)
            throw new Error("Error interno del servidor. Intente nuevamente más tarde.");
        else if (!response.ok)
            throw new Error("Error inesperado en la solicitud de cambio de contraseña.");

        return response.text();
    })
    .then(data => {
        sessionStorage.setItem("customer.password", nuevaContrasena);
        window.location.href = "main.html";
    })
    .catch(error => {
        mostrarError(error.message);
    });
}

// === MOSTRAR ERROR ===
function mostrarError(mensajeError) {
    const cuadroMensaje = document.getElementById("mensajeRespuesta");
    cuadroMensaje.className = "error";
    cuadroMensaje.innerHTML = "Error:<br>" + mensajeError.replace(/\n/g, "<br>");
    cuadroMensaje.style.display = "block";
}

// === FUNCIÓN PRINCIPAL ===
function validarCambioPassword(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
        validar_PasswordActual();
        validar_NewPassword();
        validar_ConfirmarPassword();

        sendRequestAndProcessResponse();
        return true;

    } catch (error) {
        mostrarError(error.message);
        return false;
    }
}
