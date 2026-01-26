/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Customer } from "./model.js";

const SERVICE_URL = "/CRUDBankServerSide/webresources/customer";

let selectedUser = null;

// Referencias a elementos del DOM
const formCrearUsuario = document.getElementById("formCrearUsuario");
const formEditarUsuario = document.getElementById("formEditarUsuario");
const modalCrear = document.getElementById("modalCrear");
const modalEditar = document.getElementById("modalEditar");
const crearUsuario = document.getElementById("crearUsuario");
const cerrarModalCrearBtn = document.getElementById("cerrarModalCrear");
const cerrarModalEditarBtn = document.getElementById("cerrarModalEditar");

window.addEventListener('load', buildUsersTable);

// === ABRIR MODAL CREAR ===
crearUsuario.addEventListener("click", () => {
    modalCrear.classList.remove("hidden");
});

// === CERRAR MODAL CREAR ===
cerrarModalCrearBtn.addEventListener("click", () => {
    modalCrear.classList.add("hidden");
    formCrearUsuario.reset();
});

// === CERRAR MODAL EDITAR ===
cerrarModalEditarBtn.addEventListener("click", () => {
    modalEditar.classList.add("hidden");
    formEditarUsuario.reset();
    selectedUser = null;
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

// === BUILD USERS TABLE ===
async function buildUsersTable() {
    const users = await fetchUsers();
    const tbody = document.querySelector("#usersTabletbody");
    tbody.innerHTML = "";

    for (const row of userRowGenerator(users)) {
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

// === ABRIR MODAL EDITAR ===
function abrirModalEditar(user) {
    if (!user) return;

    Object.keys(user).forEach(key => {
        const input = formEditarUsuario.elements[key];
        if (input) input.value = user[key];
    });

    modalEditar.classList.remove("hidden");
}

// === ELIMINAR USUARIO ===
async function deleteSelectedUser() {
    if (!selectedUser) {
        alert("Selecciona un usuario de la tabla");
        return;
    }

    if (!confirm(`¿Eliminar al usuario ${selectedUser.email}?`)) return;

    const response = await fetch(`${SERVICE_URL}/${selectedUser.id}`, { method: "DELETE" });

    if (!response.ok) {
        alert("Error al eliminar el usuario");
        return;
    }

    alert("Usuario eliminado correctamente");
    selectedUser = null;
    buildUsersTable();
}

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
        const response = await fetch(`${SERVICE_URL}/${selectedUser.id}`, {
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
