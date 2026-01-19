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
const currentAccount = '{"balance":300.0,"beginBalance":100.0,"beginBalanceTimestamp":"2019-01-14T19:28:28+01:00","creditLine":1000.0,"customers":[{"city":"Philadelphia","email":"awallace@gmail.com","firstName":"Ann","id":299985563,"lastName":"Wallace","middleInitial":"M.","password":"qwerty*9876","phone":16665984477,"state":"Pennsylvania","street":"Main St.","zip":10056}],"description":"Check Account with Credit Line","id":3252214522,"movements":[{"amount":100.0,"balance":300.0,"description":"Deposit","id":53,"timestamp":"2026-01-16T09:23:28+01:00"},{"amount":100.0,"balance":100.0,"description":"Deposit","id":6,"timestamp":"2019-02-02T16:56:44+01:00"},{"amount":100.0,"balance":200.0,"description":"Deposit","id":7,"timestamp":"2019-02-02T16:57:40+01:00"}],"type":"CREDIT"}';
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
//addMovementBtn.addEventListener('click', () => createNewMovement(100.0, "Deposit"));
//addMovementBtn.addEventListener('click', () => createNewMovement(100.0, "Deposit"));
deleteMovementBtn.addEventListener('click', deleteLastMovement);

const form = document.getElementById("formMovement");
if (form) {
    form.addEventListener('submit', handlerCreateMov);
}

/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */
/*BUILD MOVEMENT CONTENT TABLE - LOAD PAGE*/
async function buildMovementsTable() {
    movements = await fetchMovements();
    const tbody = document.querySelector("#contentMovements");
    if (!tbody) return; //mostrar mensaje
    tbody.innerHTML = "";
    const rowGenerator = movementRowGenerator(movements);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}

/*SHOW THE CREATE NEW MOVEMENT FORM LAYER - CLICK ADD MOV  */



async function handlerCreateMov(e) {
    e.preventDefault();

    const inputAmount = document.getElementById("newAmount");
    const inputType = document.getElementById("newTypeAmount");

    // 2. Convertir el valor a número flotante
    const amount = parseFloat(inputAmount.value);
    const description = inputType.value;

    // 3. Validación básica
    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingrese un monto válido mayor a 0.");
        return;
    }

    if (!description) {
        alert("Por favor, seleccione un tipo de movimiento.");
        return;
    }

    // 4. Llamar a tu función de creación (la que hicimos antes)
    console.log("Enviando:", amount, description);
    await createNewMovement(amount, description);

    // 5. Limpiar el formulario tras el éxito
    form.reset();
}

/*SHOW THE DELETE LAST MOVEMENT LAYER - CLICK BIN TRASH  */

/*GO BACK ACCOUNT TABLE, CLEANING SESSION STORAGE - CLICK*/
/*CONFIRM CREATE NEW MOVEMENT*/
/*CONFIRM DELETE LAST MOVEMENT*/

async function createNewMovement(amount, description) {
    try {
        const accountData = JSON.parse(currentAccount);
        //const accountData = JSON.parse(sessionStorage.getItem("account"));
        if (!accountData) throw new Error("No se encontró información de la cuenta.");
        const idAccount = accountData.id;
        let newBalance;
        if(description === "Deposit"){
            newBalance = accountData.balance + amount;
        }else{
            newBalance = accountData.balance - amount;
        }
        const movObj = new Movements(amount, newBalance, description);
        const resMov = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idAccount)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(movObj)
        });
        if (!resMov.ok) throw new Error("Error al crear movimiento");
        accountData.balance = newBalance;
        await updateAccountBalance(accountData);

        // 5. Refrescar UI
        await buildMovementsTable();
        alert("Movimiento creado y saldo actualizado.");

    } catch (error) {
        console.error("Error:", error);
    }
}

/*DELETE LAST MOVEMENT FUNCTION*/
async function deleteLastMovement() {
    if (movements.length === 0) return; //mostrar mensaje
    //En lastMov guardamos la posición de la última instancia del objeto y 
    //recuperamos el ID del movimiento
    const lastMov = movements[movements.length - 1];
    const idMovement = lastMov.id;
    try {
        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idMovement)}`, {
            method: "DELETE",
            headers: { "Accept": "application/json" }
        });
        if (!response.ok) throw new Error("Error en el borrado.");
        const accountData = JSON.parse(sessionStorage.getItem("account"));
        if(accountData.description === "Deposit"){
            accountData.balance -= lastMov.amount;
        }else{
            accountData.balance += lastMov.amount;
        }
        // Revertimos el balance
        //Llamamos a la función updateAccountBalance para poder actualizar
        //el balance de cuentas, par. la cuenta con el balance modificado.
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
    const idAccount = accountData ? accountData.id : "3252214522"; //luego dejarlo solo por el session storage

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