/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
   =================================================
      ATTRIBUTES TO BE USED BY THIS CONTROLLER
   =================================================
 */
import { Movements } from './model.js';
const SERVICE_URL_MOV= "/CRUDBankServerSide/webresources/movement/";
const SERVICE_URL_ACC = "/CRUDBankServerSide/webresources/account/";
const newMovement = '{"balance":200.0,"beginBalance":100.0,"beginBalanceTimestamp":"2019-01-14T19:28:28+01:00","creditLine":1000.0,"customers":[{"city":"Philadelphia","email":"awallace@gmail.com","firstName":"Ann","id":299985563,"lastName":"Wallace","middleInitial":"M.","password":"qwerty*9876","phone":16665984477,"state":"Pennsylvania","street":"Main St.","zip":10056}],"description":"Check Account with Credit Line","id":3252214522,"movements":[{"amount":100.0,"balance":100.0,"description":"Deposit","id":6,"timestamp":"2019-02-02T16:56:44+01:00"},{"amount":100.0,"balance":200.0,"description":"Deposit","id":7,"timestamp":"2019-02-02T16:57:40+01:00"}],"type":"CREDIT"}';
let movements = [];
const addMovementBtn = document.getElementById("addMovement");
const deleteMovementBtn = document.getElementById("deleteLastMovement");

//const idAccount1 = sessionStorage.getItem("account.id"); 
//const idAccount = "3252214522"; //sacar el id del account del session storage
/*
   =================================================
         LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
 */
//This listener load the R procedure of the app. Show all the movements of the current acount
window.addEventListener('load', buildMovementsTable);
//Adding and deleting confirm listeners, trigger by click action
addMovementBtn.addEventListener('click', () => createNewMovement(100.0, "Deposit"));
deleteMovementBtn.addEventListener('click', deleteLastMovement);

/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */
async function buildMovementsTable() {
    movements = await fetchMovements();
    const tbody = document.querySelector("#contentMovements");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    const rowGenerator = movementRowGenerator(movements);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}

async function createNewMovement(amount, description) {
    try {
        // 1. Obtener datos de la cuenta desde SessionStorage
        const accountData = JSON.parse(newMovement);
        //const accountData = JSON.parse(sessionStorage.getItem("account"));
        if (!accountData) throw new Error("No se encontró información de la cuenta.");

        const idAccount = accountData.id;
        const newBalance = accountData.balance + amount;

        // 2. Crear objeto usando el modelo
        const movObj = new Movements(amount, newBalance, description);

        // 3. POST: Crear movimiento
        const resMov = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idAccount)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(movObj)
        });

        if (!resMov.ok) throw new Error("Error al crear movimiento");

        // 4. PUT: Actualizar Balance de la cuenta
        accountData.balance = newBalance;
        await updateAccountBalance(accountData);

        // 5. Refrescar UI
        await buildMovementsTable();
        alert("Movimiento creado y saldo actualizado.");

    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteLastMovement() {
    if (movements.length === 0) return;
    
    const lastMov = movements[movements.length - 1];
    const idMovement = lastMov.id;

    try {
        // 1. DELETE: Movimiento
        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idMovement)}`, {
            method: "DELETE",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) throw new Error("Error en el borrado.");

        // 2. Actualizar objeto Account localmente y en servidor
        const accountData = JSON.parse(sessionStorage.getItem("account"));
        accountData.balance -= lastMov.amount; // Revertimos el balance
        
        await updateAccountBalance(accountData);
        await buildMovementsTable();
        
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}
/*
   =================================================
                   OTHER FUNCTIONS
   =================================================
 */
//Functions related to generate and load movementss content
async function updateAccountBalance(accountObj) {
    const response = await fetch(`${SERVICE_URL_ACC}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(accountObj)
    });
    
    if (response.ok) {
        // Actualizar el storage para que persista el cambio
        sessionStorage.setItem("account", JSON.stringify(accountObj));
    } else {
        throw new Error("No se pudo actualizar la cuenta en el servidor.");
    }
}

async function fetchMovements() {
    const accountData = JSON.parse(sessionStorage.getItem("account"));
    const idAccount = accountData ? accountData.id : "3252214522";

    try {
        const response = await fetch(`${SERVICE_URL_MOV}account/${encodeURIComponent(idAccount)}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
        return response.ok ? await response.json() : [];
    } catch (error) {
        return [];
    }
}

function* movementRowGenerator(movementsList) {
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/;
    for (const movement of movementsList) {
        const tr = document.createElement("tr");
        ["timestamp", "description", "amount", "balance"].forEach(field => {
            const td = document.createElement("td");
            let value = movement[field] ?? "N/A";

            if (field === "timestamp" && value !== "N/A") {
                const match = String(value).match(isoRegex);
                if (match) value = `${match[3]}/${match[2]}/${match[1]} ${match[4]}`;
            }

            if (field === "amount" && parseFloat(value) < 0) td.style.color = "red";
            
            td.textContent = value;
            tr.appendChild(td);
        });
        yield tr;
    }
}