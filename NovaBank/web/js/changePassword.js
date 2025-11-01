/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// === VALIDAR CONTRASEÑA ACTUAL ===
function validar_PasswordActual() {
    const passwordActual = document.getElementById("password");
    const passwordGuardada = sessionStorage.getItem("customer.password");

    if (!passwordGuardada)
        throw new Error("No se encontró la contraseña actual en la sesión. Inicie sesión nuevamente.");

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
    const patronPassword = /^[a-zA-Z0-9.!#$*%&]+$/;

    if (nuevaPassword.value.trim() === "")
        throw new Error("Debe ingresar una nueva contraseña.");

    if (nuevaPassword.value.length > 50)
        throw new Error("La nueva contraseña no puede tener más de 50 caracteres.");

    if (!patronPassword.test(nuevaPassword.value.trim()))
        throw new Error("La nueva contraseña contiene caracteres no permitidos.");

    if (nuevaPassword.value.trim() === passwordActual.value.trim())
        throw new Error("La nueva contraseña no puede ser igual a la actual.");

    return true;
}

// === VALIDAR CONFIRMACIÓN DE CONTRASEÑA ===
function validar_ConfirmarPassword() {
    const nuevaPassword = document.getElementById("nueva_password");
    const confirmarPassword = document.getElementById("confimar_password"); 
    if (confirmarPassword.value.trim() === "")
        throw new Error("Debe confirmar su nueva contraseña.");

    if (confirmarPassword.value.trim() !== nuevaPassword.value.trim())
        throw new Error("Las contraseñas no coinciden. Verifique los campos.");

    return true;
}

// === ENVIAR SOLICITUD AL SERVIDOR ===
function sendRequestAndProcessResponse() {
    const formulario = document.getElementById("changePasswordForm");
    const cuadroMensaje = document.getElementById("mensajeRespuesta");
    const email = sessionStorage.getItem("customer.email");
    const nuevaContrasena = document.getElementById("nueva_password").value.trim();

    // Verificar que el email del usuario esté en sesión
    if (!email)
        throw new Error("No se encontró información del usuario en la sesión. Inicie sesión nuevamente.");

    // Enviar solicitud al backend
    // cambiar la url del put 
    fetch(formulario.action, {
        method: 'PUT', // PUT porque estamos cambiando un dato existente
        headers: { 'Content-Type': 'application/xml' }
        // agregar el body con toda la información de la sesión 
    })
        .then(response => {
            if (response.status === 401)
                throw new Error("No autorizado. La sesión ha expirado o las credenciales son incorrectas.");
            else if (response.status === 500)
                throw new Error("Error interno del servidor. Intente nuevamente más tarde.");
            else if (!response.ok)
                throw new Error("Error inesperado en la solicitud de cambio de contraseña.");

            return response.text();
        })
        .then(data => {
            cuadroMensaje.className = "success";
            cuadroMensaje.textContent = "La contraseña fue actualizada correctamente.";
            cuadroMensaje.style.display = "block";

            // Actualizar contraseña almacenada en sesión
            sessionStorage.setItem("customer.password", nuevaContrasena);
        })
        .catch(error => {
            cuadroMensaje.className = "error";
            cuadroMensaje.textContent = "Error: " + error.message;
            cuadroMensaje.style.display = "block";
        });
}

// === FUNCIÓN PRINCIPAL ===
function validarCambioPassword(event) {
    event.preventDefault();
    event.stopPropagation();

    const mensaje = document.getElementById("mensajeRespuesta");

    try {
        validar_PasswordActual();
        validar_NewPassword();
        validar_ConfirmarPassword();

        mensaje.className = "success";
        mensaje.textContent = "Validación exitosa. Actualizando contraseña...";
        mensaje.style.display = "block";

        // Llamar al servidor solo si todo fue válido
        sendRequestAndProcessResponse();

        return true;
    } catch (error) {
        mensaje.className = "error";
        mensaje.textContent = "Error: " + error.message;
        mensaje.style.display = "block";
        return false;
    }
}