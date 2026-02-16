/*  */
import { Customer } from "./model.js";
const SERVICE_URL = "/CRUDBankServerSide/webresources/customer";
let selectedUser = null;
let h5pInstance = null;

/* =================================================
      ATTRIBUTES TO BE USED BY THIS CONTROLLER
   =================================================
*/
let usuariosLocales = []; 

// Referencias a los botones
const bComunes = document.getElementById("btnComunes");
const bAdmins = document.getElementById("btnAdmins");
const bTotales = document.getElementById("btnTotales");

// Referencias a los textos de resultado
const tComunes = document.getElementById("cuentaComunes");
const tAdmins = document.getElementById("cuentaAdmins");
const tTotales = document.getElementById("cuentaTotales");

/*=================================================*/

// Referencias a elementos del DOM
const formCrearUsuario = document.getElementById("formCrearUsuario");
const formEditarUsuario = document.getElementById("formEditarUsuario");
const modalCrear = document.getElementById("modalCrear");
const modalEditar = document.getElementById("modalEditar");
const crearUsuario = document.getElementById("crearUsuario");
const cerrarModalCrearBtn = document.getElementById("cerrarModalCrear");
const cerrarModalEditarBtn = document.getElementById("cerrarModalEditar");

// === LISTENERS EN TIEMPO REAL PARA CREAR USUARIO ===
const firstNameInput = document.getElementById("firstName");
const middleInitialInput = document.getElementById("middleInitial");
const lastNameInput = document.getElementById("lastName");
const streetInput = document.getElementById("street");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const zipInput = document.getElementById("zip");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");



window.addEventListener('load', buildUsersTable);

// Validaciones en tiempo real con el evento 'input'
firstNameInput.addEventListener("input", validateFirstName);
middleInitialInput.addEventListener("input", validateMiddleInitial);
lastNameInput.addEventListener("input", validateLastName);
streetInput.addEventListener("input", validateStreet);
cityInput.addEventListener("input", validateCity);
stateInput.addEventListener("input", validateState);
zipInput.addEventListener("input", validateZip);
phoneInput.addEventListener("input", validatePhone);
emailInput.addEventListener("input", validateEmail);

// === ABRIR MODAL CREAR ===
crearUsuario.addEventListener("click", () => {
    modalCrear.style.display = 'flex';
});

// === CERRAR MODAL CREAR ===
cerrarModalCrearBtn.addEventListener("click", () => {
    modalCrear.style.display = 'none';
    formCrearUsuario.reset();
});

// === ABRIR MODAL EDITAR ===
function abrirModalEditar(user) {
    if (!user) return;

    Object.keys(user).forEach(key => {
        const input = formEditarUsuario.elements[key];
        if (input) input.value = user[key];
    });

    modalEditar.style.display = 'flex';
}

// === CERRAR MODAL EDITAR ===
cerrarModalEditarBtn.addEventListener("click", () => {
    modalEditar.style.display = 'none';
    formEditarUsuario.reset();
    selectedUser = null;
});
/*
   =================================================
          LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
*/

// Asignación directa de eventos
bComunes.addEventListener("click", manejarComunes);
bAdmins.addEventListener("click", manejarAdmins);
bTotales.addEventListener("click", manejarTotales);

//Interactive video
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('showVideoCustomer');
    if (btn) {
        btn.addEventListener('click', showVideoHelpCustomer);
    }
});


// === FETCH USERS ===
async function fetchUsers() {
    try {
        const response = await fetch(SERVICE_URL, { method: "GET", headers: { "Accept": "application/json" } });
        if (!response.ok) throw new Error("Error al obtener usuarios");
        return await response.json();
    } catch (err) {
        console.error(err);
        alert("No se pudo obtener la lista de usuarios");
        return [];
    }
}

async function buildUsersTable() {
    const users = await fetchUsers();

    usuariosLocales = users; // 👈 IMPORTANTE para poder recuperar el objeto

    const tbody = document.getElementById("usersTabletbody");
    const cardsContainer = document.getElementById("usersCardsContainer");

    if (!tbody || !cardsContainer) return;

    tbody.innerHTML = "";
    cardsContainer.innerHTML = "";

    const rowGen = customerRowGenerator(users, 'table');
    for (const row of rowGen) {
        tbody.appendChild(row);
    }

    const cardGen = customerRowGenerator(users, 'card');
    for (const card of cardGen) {
        cardsContainer.appendChild(card);
    }
}
// === GENERADOR DE FILAS ===
function* customerRowGenerator(customerList, mode) {
    for (const customer of customerList) {

        if (mode === 'table') {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.firstName}</td>
                <td>${customer.middleInitial || ''}</td>
                <td>${customer.lastName}</td>
                <td>${customer.street}</td>
                <td>${customer.city}</td>
                <td>${customer.state}</td>
                <td>${customer.zip}</td>
                <td>${customer.phone}</td>
                <td>${customer.email}</td>
                <td>
                    <div class="accion-iconos">
                        <button class="btn-edit" aria-label="Editar usuario">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-delete" aria-label="Borrar usuario">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            const btnEdit = tr.querySelector(".btn-edit");
            const btnDelete = tr.querySelector(".btn-delete");

            btnEdit.addEventListener("click", e => {
                e.stopPropagation();
                selectedUser = customer;
                abrirModalEditar(customer);   // 👈 abre el formulario de editar
            });

            btnDelete.addEventListener("click", e => {
                e.stopPropagation();
                selectedUser = customer;
                deleteSelectedUser();        // 👈 abre el modal de borrar
            });

            yield tr;
        }

        else {
            const card = document.createElement("div");
            card.className = "movement-card-item"; 
            card.innerHTML = `
                <div class="card-row"><strong>Nombre:</strong> <span>${customer.firstName} ${customer.lastName}</span></div>
                <div class="card-row"><strong>Email:</strong> <span>${customer.email}</span></div>
                <div class="card-row"><strong>Teléfono:</strong> <span>${customer.phone}</span></div>
                <div class="card-row"><strong>Ciudad:</strong> <span>${customer.city}</span></div>
                <div class="modal-actions-inline" style="margin-top:10px; gap:10px;">
                    <button class="btn-confirmar-modal">Editar</button>
                    <button class="btn-cancelar-modal" style="background:#8549ba">Borrar</button>
                </div>
            `;

            const btnEdit = card.querySelector(".btn-confirmar-modal");
            const btnDelete = card.querySelector(".btn-cancelar-modal");

            btnEdit.addEventListener("click", () => {
                selectedUser = customer;
                abrirModalEditar(customer);
            });

            btnDelete.addEventListener("click", () => {
                selectedUser = customer;
                deleteSelectedUser();
            });

            yield card;
        }
    }
}
// ====USUARIO PARA ELIMINAR OTRA VERSION ======
const modalEliminar = document.getElementById("modalEliminarUsuario");
const btnCancelar = document.getElementById("btnCancelarBorrar");
const btnConfirmar = document.getElementById("btnConfirmarBorrar");

//Esta es la función que llamas cuando tocas el icono de basura en la tabla
/*Gestiona el flujo de eliminación con validaciones de seguridad.*/
async function deleteSelectedUser() {
    // 1. Obtenemos el email de quien está usando la web ahora mismo
    const emailLogueado = sessionStorage.getItem("customer.email"); // Datos de sesión [cite: 2]
    const emailSeleccionado = selectedUser.email.toLowerCase();

    // 2. FILTRO 1: Evitar el "suicidio" de cuenta (Self-delete)
    if (emailSeleccionado === emailLogueado?.toLowerCase()) {
        alert("No puedes eliminar tu propia cuenta de administrador mientras estás logueado.");
        return; // Aquí se detiene y no interfiere con nada más
    }

    // 3. FILTRO 2: Evitar borrar otros administradores
    // Usamos la lógica de tu código original 
    if (emailSeleccionado.endsWith("@admin.com") || emailSeleccionado.endsWith("@admim.com")) {
        alert("Acceso denegado: Los usuarios administradores no pueden ser eliminados del sistema.");
        selectedUser = null; 
        return; // Se detiene aquí
    }

    // 4. Si pasa los filtros, mostramos el modal de confirmación
    modalEliminar.style.display = 'flex';
}

// Acción de Cancelar
btnCancelar.onclick = () => {
    modalEliminar.style.display = 'none';
};

// Acción de Confirmar definitiva
btnConfirmar.onclick = async () => {
    // 1. Comprobación de integridad previa en el cliente
    const tieneCuentas = await checkCuentasAsociadas(selectedUser.id);
    
    // Si la función encuentra cuentas, mostramos el mensaje que pediste
    if (tieneCuentas) {
        alert("Error: No se puede borrar a un usuario si tiene cuentas asociadas.");
        modalEliminar.style.display = 'none';
        return; 
    }

    // 2. Si no encontró cuentas en la lista, intentamos el borrado real
    try {
        const response = await fetch(`${SERVICE_URL}/${selectedUser.id}`, { 
            method: "DELETE" 
        });

        // Si el servidor devuelve 409 (Conflicto) es porque hay cuentas o movimientos
        if (response.status === 409) {
            alert("Error de conflicto (409): El servidor detectó movimientos vinculados.");
            modalEliminar.style.display = 'none';
            return;
        }

        if (response.ok) {
            // Éxito: Limpiamos y actualizamos la tabla (RA6) 
            modalEliminar.style.display = 'none'; 
            selectedUser = null;
            await buildUsersTable(); 
            alert("Usuario eliminado correctamente.");
        } else {
            // Si el servidor falla por cualquier otra razón, también mostramos el mensaje de seguridad
            alert("Error: El servidor denegó la petición de borrado.");
            modalEliminar.style.display = 'none';
        }

    } catch (err) {
        console.error("Error en la petición DELETE:", err);
        alert("Hubo un fallo de comunicación con el servidor.");
    }
};

// === GENERAR CONTRASEÑA ===
function generarPassword(firstName, phone) {
    const simbolos = "!#$%&";
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minus = "abcdefghijklmnopqrstuvwxyz";

    const base = firstName.slice(0, 3) + phone.slice(-3);

    let password = base +
        mayus[Math.floor(Math.random() * mayus.length)] +
        minus[Math.floor(Math.random() * minus.length)] +
        simbolos[Math.floor(Math.random() * simbolos.length)];

    while (password.length < 12) {
        password += minus[Math.floor(Math.random() * minus.length)];
    }

    return password.slice(0, 12);
}

// === CREAR USUARIO ===
formCrearUsuario.onsubmit = async e => {
    e.preventDefault();

    if (!validateCreateUserForm()) return;

    const d = new FormData(formCrearUsuario);
    const customer = new Customer(
        null,
        d.get("firstName"),
        d.get("lastName"),
        d.get("middleInitial"),
        d.get("street"),
        d.get("city"),
        d.get("state"),
        d.get("zip"),
        d.get("phone"),
        d.get("email"),
        generarPassword(d.get("firstName"), d.get("phone"))
    );

    try {
        const response = await fetch(SERVICE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        });

        if (!response.ok) throw new Error("Error al crear usuario");

        modalCrear.style.display = 'none'; 
        formCrearUsuario.reset();
        document.querySelectorAll(".response-msg").forEach(msg => msg.style.display = 'none');
        await buildUsersTable();

    } catch (err) {
        console.error(err);
        alert("No se pudo crear el usuario");
    }
};

// === EDITAR USUARIO ===
formEditarUsuario.onsubmit = async e => {
    e.preventDefault();

    // NUEVO: Validar antes de enviar
    if (!validateEditUserForm()) {
        console.log("Formulario de edición no válido");
        return; // Se detiene aquí si hay errores
    }

    if (!selectedUser) return;
    const d = new FormData(formEditarUsuario);

    const customer = new Customer(
        selectedUser.id,
        d.get("firstName"),
        d.get("lastName"),
        d.get("middleInitial"),
        d.get("street"),
        d.get("city"),
        d.get("state"),
        d.get("zip"),
        d.get("phone"),
        d.get("email"),
        selectedUser.password
    );

    try {
        const response = await fetch(SERVICE_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        });

        if (!response.ok) throw new Error("Error al editar usuario");

        modalEditar.classList.add("hidden");
        formEditarUsuario.reset();
        selectedUser = null;
        buildUsersTable();
    } catch (err) {
        console.error(err);
        alert("No se pudo editar el usuario");
    }
};

/*LLAMADA A LAS FUNCIONES*/
function validateCreateUserForm() {
    return (
        validateFirstName() &&
        validateMiddleInitial() &&
        validateLastName() &&
        validateStreet() &&
        validateCity() &&
        validateState() &&
        validateZip() &&
        validatePhone() &&
        validateEmail()
    );
}

function validateEditUserForm() {
    // Retorna TRUE solo si todas las validaciones pasan
    return (
        validateFirstName("editFirstName", "editResponseMsgName") &&
        validateMiddleInitial("editmiddleInitial", "editResponseMsgInitial") &&
        validateLastName("editLastName", "editResponseMsgLastName") &&
        validateStreet("editStreet", "editResponseMsgStreet") &&
        validateCity("editCity", "editResponseMsgCity") &&
        validateState("editState", "editResponseMsgState") &&
        validateZip("editZip", "editResponseMsgZip") &&
        validatePhone("editPhone", "editResponseMsgPhone") &&
        validateEmail("editEmail", "editResponseMsgEmail")
    );
}

/*VALIDAR NOMBRE*/
function validateFirstName(idInput = "firstName", idMsg = "responseMsgName") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const onlyLettersRegExp = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "El nombre es obligatorio");
        return false;
    }
    if (input.value.length > 255) {
        showError(msgBox, "Máximo 255 caracteres");
        return false;
    }
    if (!onlyLettersRegExp.test(input.value.trim())) {
        showError(msgBox, "El nombre solo puede contener letras");
        return false;
    }
    return true;
}

/*VALIDAR INICIAL SEGUNDO NOMBRE*/
function validateMiddleInitial(idInput = "middleInitial", idMsg = "responseMsgInitial") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const singleLetterRegExp = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ]$/;
    msgBox.style.display = "none";
    
    if (input.value.trim() === "") {
        showError(msgBox, "La inicial del segundo nombre es obligatoria");
        return false;
    }
    if (input.value.trim() !== "" && !singleLetterRegExp.test(input.value.trim())) {
        showError(msgBox, "Debe ser una sola letra");
        return false;
    }
    return true;
}

/*VALIDAR APELLIDO*/
function validateLastName(idInput = "lastName", idMsg = "responseMsgLastName") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const onlyLettersRegExp = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "El apellido es obligatorio");
        return false;
    }
    if (input.value.length > 255) {
        showError(msgBox, "Máximo 255 caracteres");
        return false;
    }
    if (!onlyLettersRegExp.test(input.value.trim())) {
        showError(msgBox, "El apellido solo puede contener letras");
        return false;
    }
    return true;
}

/* VALIDAR CALLE*/
function validateStreet(idInput = "street", idMsg = "responseMsgStreet") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const streetRegExp = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ0-9\s.,/-]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "La calle es obligatoria");
        return false;
    }
    if (input.value.length > 255) {
        showError(msgBox, "Máximo 255 caracteres");
        return false;
    }
    if (!streetRegExp.test(input.value.trim())) {
        showError(msgBox, "La calle puede contener letras y números");
        return false;
    }
    return true;
}

/* VALIDAR CIUDAD */
function validateCity(idInput = "city", idMsg = "responseMsgCity") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const onlyLettersRegExp = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "La ciudad es obligatoria");
        return false;
    }
    if (input.value.length > 255) {
        showError(msgBox, "Máximo 255 caracteres");
        return false;
    }
    if (!onlyLettersRegExp.test(input.value.trim())) {
        showError(msgBox, "La ciudad solo puede contener letras");
        return false;
    }
    return true;
}

/* VALIDAR ESTADO */
function validateState(idInput = "state", idMsg = "responseMsgState") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const onlyLettersRegExp = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "El estado es obligatorio");
        return false;
    }
    if (input.value.length > 255) {
        showError(msgBox, "Máximo 255 caracteres");
        return false;
    }
    if (!onlyLettersRegExp.test(input.value.trim())) {
        showError(msgBox, "El estado solo puede contener letras");
        return false;
    }

    return true;
}

/*VALIDAR CODIGO POSTAL*/
function validateZip(idInput = "zip", idMsg = "responseMsgZip") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const numbersOnlyRegExp = /^[0-9]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "El código postal es obligatorio");
        return false;
    }
    if (!numbersOnlyRegExp.test(input.value.trim())) {
        showError(msgBox, "Solo números");
        return false;
    }
    return true;
}

/*VALIDAR TELEFONO*/
function validatePhone(idInput = "phone", idMsg = "responseMsgPhone") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const phoneRegExp = /^[+]{0,1}[0-9]+$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "El teléfono es obligatorio");
        return false;
    }
    if (input.value.trim().length < 9) {
        showError(msgBox, "Debe tener al menos 9 dígitos");
        return false;
    }
    if (!phoneRegExp.test(input.value.trim())) {
        showError(msgBox, "Formato inválido");
        return false;
    }
    return true;
}

/* VALIDAR EMAIL*/
function validateEmail(idInput = "email", idMsg = "responseMsgEmail") {
    const input = document.getElementById(idInput);
    const msgBox = document.getElementById(idMsg);
    
    if (!input || !msgBox) return true;
    
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    msgBox.style.display = "none";

    if (input.value.trim() === "") {
        showError(msgBox, "El correo es obligatorio");
        return false;
    }
    if (!emailRegExp.test(input.value.trim())) {
        showError(msgBox, "Formato de correo inválido");
        return false;
    }
    return true;
}

/* FUNCION ERRORES*/
function showError(msgBox, message) {
    msgBox.textContent = message;
    msgBox.style.color = "#ff0000";
    msgBox.style.marginTop = "5px";
    msgBox.style.display = "block";
}

const customerName = sessionStorage.getItem("customer.firstName");
const customerMidIn = sessionStorage.getItem("customer.middleInitial");
const h2 = document.getElementById("sessionNombre");

if (h2) {
    if (customerName) {
        h2.textContent = `¡Hola, ${customerName} ${customerMidIn}!`;
    } else {
        h2.textContent = "¡Hola!";
    }
}

// === REFERENCIAS A LOS BOTONES Y LECTORES ===
/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
*/

function manejarComunes() {
    if (tComunes.style.display === "flex") {
        tComunes.style.display = "none";
    } else {
        const filtrados = usuariosLocales.filter(u => 
            !u.email.toLowerCase().endsWith("@admin.com")
        );
        tComunes.textContent = `Cantidad: ${filtrados.length}`;
        tComunes.style.display = "flex";
    }
}

function manejarAdmins() {
    if (tAdmins.style.display === "flex") {
        tAdmins.style.display = "none";
    } else {
        const filtrados = usuariosLocales.filter(u => 
            u.email.toLowerCase().endsWith("@admin.com")
        );
        tAdmins.textContent = `Cantidad: ${filtrados.length}`;
        tAdmins.style.display = "flex";
    }
}

function manejarTotales() {
    if (tTotales.style.display === "flex") {
        tTotales.style.display = "none";
    } else {
        tTotales.textContent = `Total: ${usuariosLocales.length}`;
        tTotales.style.display = "flex";
    }
}

/*INTERACTIVE VIDEO CUSTOMER*/
function showVideoHelpCustomer() {
    const el = document.getElementById('h5p-container');
    if (!h5pInstance) {
    const options = {
        h5pJsonPath: '/NovaBank/assets/h5p-content', 
        frameJs: '/NovaBank/assets/h5p-player/frame.bundle.js',
        frameCss: '/NovaBank/assets/h5p-player/styles/h5p.css',
        librariesPath: '/NovaBank/assets/h5p-libraries' 
        };
    h5pInstance = new H5PStandalone.H5P(el, options);
        el.style.display = "flex";
        document.body.style.overflow = "hidden"; 
    setupClickOutside();    
    return;
    }
    toggleDisplay(el);
}

function toggleDisplay(el) {
    if (window.getComputedStyle(el).display === "none") {
        el.style.setProperty("display", "flex", "important");
        document.body.style.overflow = "hidden";
    } else {
        el.style.setProperty("display", "none", "important");
        document.body.style.overflow = "auto";
    }
}

function setupClickOutside() {
    const el = document.getElementById('h5p-container');
    el.addEventListener('click', (e) => {
        if (e.target === el) {
            toggleDisplay(el);
        }
    });
}


/*  Verifica si el cliente tiene cuentas asociadas.*/

async function checkCuentasAsociadas(id) {
    try {
        // AÑADIMOS HEADERS para forzar el formato JSON
        const response = await fetch("/CRUDBankServerSide/webresources/account", {
            method: "GET",
            headers: {
                "Accept": "application/json" // Esto le dice al servidor: "No me des XML, dame JSON"
            }
        });
        
        if (!response.ok) return false;
        
        const todasLasCuentas = await response.json();
        
        return todasLasCuentas.some(cuenta => 
            cuenta.customers.some(c => Number(c.id) === Number(id))
        );
    } catch (err) {
        console.error("Error técnico:", err);
        return true; // Bloqueamos por seguridad si hay error de formato
    }
}