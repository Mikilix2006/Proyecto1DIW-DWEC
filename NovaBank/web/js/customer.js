/*  */
import { Customer } from "./model.js";
const SERVICE_URL = "/CRUDBankServerSide/webresources/customer";
let selectedUser = null;

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

// === BUILD USERS TABLE ===
/*async function buildUsersTable() {
    const users = await fetchUsers();
    const tbody = document.querySelector("#usersTabletbody");
    tbody.innerHTML = "";

    for (const row of userRowGenerator(users)) {
        tbody.appendChild(row);
    }
}*/

async function buildUsersTable() {
    const users = await fetchUsers(); 

    usuariosLocales = users; 
    
    const tbody = document.querySelector("#usersTabletbody");
    if (!tbody) return; 
    tbody.innerHTML = "";
 
    for (const row of userRowGenerator(usuariosLocales)) {
        tbody.appendChild(row);
    }
}
// === GENERADOR DE FILAS ===
function* userRowGenerator(users) {
    for (const user of users) {
        const tr = document.createElement("tr");

        // Celdas de datos
        ["id", "firstName", "middleInitial", "lastName", "street", "city", "state", "zip", "phone", "email"].forEach(field => {
            const td = document.createElement("td");
            td.textContent = user[field] ?? "";
            tr.appendChild(td);
        });

        // Celdas de acciones
        const tdActions = document.createElement("td");
        tdActions.classList.add("actions");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn-edit");
        btnEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        btnEdit.addEventListener("click", e => {
            e.stopPropagation();
            selectedUser = user;
            abrirModalEditar(user);
        });

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn-delete");
        btnDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        btnDelete.addEventListener("click", e => {
            e.stopPropagation();
            selectedUser = user;
            deleteSelectedUser();
        });

        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);

        // Selección de fila
        tr.addEventListener("click", () => {
            document.querySelectorAll("#usersTabletbody tr").forEach(r => r.classList.remove("selected"));
            tr.classList.add("selected");
            selectedUser = user;
        });

        yield tr;
    }
}

// ====USUARIO PARA ELIMINAR OTRA VERSION ======
const modalEliminar = document.getElementById("modalEliminarUsuario");
const btnCancelar = document.getElementById("btnCancelarBorrar");
const btnConfirmar = document.getElementById("btnConfirmarBorrar");

 //Esta es la función que llamas cuando tocas el icono de basura en la tabla
async function deleteSelectedUser() {
    if (!selectedUser) {
        alert("Selecciona un usuario de la tabla");
        return;
    }
    // Mostramos el modal personalizado
    modalEliminar.style.display = 'flex';
}

// Acción de Cancelar
btnCancelar.onclick = () => {
    modalEliminar.style.display = 'none';
};

// Acción de Confirmar (Eliminación real)
btnConfirmar.onclick = async () => {
    const response = await fetch(`${SERVICE_URL}/${selectedUser.id}`, { method: "DELETE" });

    if (!response.ok) {
        alert("Error al eliminar el usuario");
        return;
    }

    modalEliminar.style.display = 'none'; // Cerramos el modal
    selectedUser = null;
    buildUsersTable(); // Refrescamos la tabla
    alert("Usuario eliminado correctamente");
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

        modalCrear.classList.add("hidden");
        formCrearUsuario.reset();
        buildUsersTable();
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

