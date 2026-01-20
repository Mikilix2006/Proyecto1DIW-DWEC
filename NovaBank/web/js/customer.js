/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*import {Customer} from "./model.js";*/

const SERVICE_URL = "/CRUDBankServerSide/webresources/customer";

let selectedUser = null;

/**
 * Fetch users
 */
async function fetchUsers() {
  const response = await fetch(SERVICE_URL, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  return await response.json();
}

/**
 * Build users table
 */
async function buildUsersTable() {
  const users = await fetchUsers();
  const tbody = document.querySelector("#usersTabletbody");
  tbody.innerHTML = "";

  const rowGenerator = userRowGenerator(users);
  for (const row of rowGenerator) {
    tbody.appendChild(row);
  }
}

/**
 * Row generator
 */
function* userRowGenerator(users) {
  for (const user of users) {
    const tr = document.createElement("tr");

    [
      "id", "firstName", "lastName", "middleInitial",
      "street", "city", "state", "zip",
      "phone", "email"
    ].forEach(field => {
      const td = document.createElement("td");
      td.textContent = user[field];
      tr.appendChild(td);
    });

    // Selección de fila
    tr.addEventListener("click", () => {
      document
        .querySelectorAll("#usersTabletbody tr")
        .forEach(row => row.classList.remove("selected"));

      tr.classList.add("selected");
      selectedUser = user;
    });

    yield tr;
  }
}

// Cargar tabla al iniciar
buildUsersTable();

/**
 * Botón borrar
 */
document
  .getElementById("boton-borrar")
  .addEventListener("click", deleteSelectedUser);

/**
 * Delete selected user
 */
async function deleteSelectedUser() {
  if (!selectedUser) {
    alert("Selecciona un usuario de la tabla");
    return;
  }

  const adminEmail = sessionStorage.getItem("customer.email");
  if (selectedUser.email === adminEmail) {
    alert("No puedes borrarte a ti mismo");
    return;
  }

  if (!confirm(`¿Eliminar al usuario ${selectedUser.email}?`)) return;

  const response = await fetch(
    `${SERVICE_URL}/${selectedUser.id}`,
    {
      method: "DELETE"
    }
  );

  // 200 o 204 son respuestas válidas
  if (!response.ok) {
    alert("Error al eliminar el usuario");
    return;
  }

  alert("Usuario eliminado correctamente");

  selectedUser = null;
  buildUsersTable();
}



const modal = document.getElementById("modalCrearUsuario");
const botonCrear = document.getElementById("boton-crear");
const botonCerrar = document.getElementById("cerrarModal");
const formCrearUsuario = document.getElementById("formCrearUsuario");

// Abrir modal
botonCrear.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Cerrar modal
botonCerrar.addEventListener("click", () => {
  modal.classList.add("hidden");
  formCrearUsuario.reset();
});

// Crear usuario (POST)
formCrearUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formCrearUsuario);
  const newUser = Object.fromEntries(formData.entries());

  const response = await fetch(SERVICE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newUser)
  });

  if (!response.ok) {
    alert("Error al crear el usuario");
    return;
  }
   
  alert("Usuario creado correctamente");

  modal.classList.add("hidden");
  formCrearUsuario.reset();
  buildUsersTable();
});


const botonEditar = document.getElementById("boton-editar");
const modalEditar = document.getElementById("modalEditarUsuario");
const cerrarModalEditar = document.getElementById("cerrarModalEditar");
const formEditarUsuario = document.getElementById("formEditarUsuario");

// Abrir modal editar
botonEditar.addEventListener("click", () => {
  if (!selectedUser) {
    alert("Selecciona un usuario para editar");
    return;
  }

  // Rellenar formulario
  Object.keys(selectedUser).forEach(key => {
    const input = formEditarUsuario.elements[key];
    if (input) input.value = selectedUser[key];
  });

  modalEditar.classList.remove("hidden");
});

// Cerrar modal
cerrarModalEditar.addEventListener("click", () => {
  modalEditar.classList.add("hidden");
  formEditarUsuario.reset();
});

// Submit editar (PUT)
formEditarUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formEditarUsuario);
  const updatedUser = {
    ...selectedUser,
    ...Object.fromEntries(formData.entries())
  };

  const response = await fetch(
    `${SERVICE_URL}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updatedUser)
    }
  );

  if (!response.ok) {
    alert("Error al actualizar el usuario");
    return;
  }

  alert("Usuario actualizado correctamente");

  modalEditar.classList.add("hidden");
  formEditarUsuario.reset();
  selectedUser = null;
  buildUsersTable();
});


/* ACTUALIZAR */
/*document
  .getElementById("boton-update")
  .addEventListener("click", deleteSelectedUser);

async function updateSelectedUser() {
  if (!selectedUser) {
    alert("Selecciona un usuario de la tabla");
    return;
  }*/

  /*const adminEmail = sessionStorage.getItem("customer.email");
  if (selectedUser.email === adminEmail) {
    alert("No puedes borrarte a ti mismo");
    return;
  }*/

  /*if (!confirm(`¿Estás seguro que quieres actualizar a ${selectedUser.email}?`)) 
      
    return;

  const response = await fetch(SERVICE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      ...selectedUser,
      update: true   
    })
  });

  if (!response.ok) {
    alert("Error actualizar el usuario");
    return;
  }

  alert("Usuario actualizado correctamente");

  selectedUser = null;
  document.querySelector("#usersTabletbody").innerHTML = "";
  buildUsersTable();
}*/
