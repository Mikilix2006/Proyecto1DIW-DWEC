/*
   =================================================
      ATTRIBUTES TO BE USED BY THIS CONTROLLER
   =================================================
 */
import { Movements } from './model.js';
const SERVICE_URL_MOV= "/CRUDBankServerSide/webresources/movement/";
const SERVICE_URL_ACC = "/CRUDBankServerSide/webresources/account/";
let movements = [];
const addMovementBtnController = document.getElementById("confirmAddMov");
const deleteMovementController = document.getElementById("confirmDeleteMov");
const goBackBtnController = document.getElementById("goBackAccount");
const deleteMovementBtn = document.getElementById("deleteLastMovement");
const cancelDeleteBtn = document.getElementById("cancelDeleteMovement");
const addNewMovement = document.getElementById("addMovement");
const showGeneralBalance = document.getElementById("btnShowSummary");
const summaryDiv = document.getElementById("summaryDisplay");
let h5pInstance = null;
/*
   =================================================
         LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
 */
//This listener load the R procedure of the app. Show all the movements of the current acount
window.addEventListener('DOMContentLoaded', buildMovementsTable);
//Show CREATE and DELETE window
addMovementBtnController.addEventListener('click', handlerFormCreateMovement);
deleteMovementController.addEventListener('click', handlerFormDeleteMovement);
//Adding and deleting confirm listeners, trigger by click action
addNewMovement.addEventListener('click', createNewMovement);
deleteMovementBtn.addEventListener('click', deleteLastMovement);
cancelDeleteBtn.addEventListener('click', cerrarDeleteForm);
showGeneralBalance.addEventListener('click', toggleSummary);
goBackBtnController.addEventListener('click',goBackAccounts);
//Interactive video
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('showVideoMov');
    if (btn) {
        btn.addEventListener('click', showVideoHelpMovment);
    }
});
/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */
/*BUILD MOVEMENT CONTENT TABLE - LOAD PAGE*/
async function buildMovementsTable() {
    accountHeader();
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
function handlerFormCreateMovement() {
    const formContainer = document.getElementById("newMovementForm");
    const creditDisplay = document.getElementById("creditInfoDisplay");
    const accountData = JSON.parse(sessionStorage.getItem("account")) || JSON.parse(currentAccount);
    const { balance, type, creditLine } = accountData;

    creditDisplay.innerHTML = "";
    if (type === "CREDIT") {
        const totalDisponible = balance + creditLine;
        
        creditDisplay.innerHTML = `
                <p ><strong>Saldo:</strong> ${currencyFormatter.format(balance)}</p>
                <p ><strong>Línea de Crédito:</strong> ${currencyFormatter.format(creditLine)}</p>
                <p ><strong>Disponible total:</strong> ${currencyFormatter.format(totalDisponible)}</p>
        `;
    } else {
        // Si es una cuenta de débito, solo mostrar saldo
        creditDisplay.innerHTML = `<p><strong>Saldo actual:</strong> ${currencyFormatter.format(balance)}</p>`;
    }
    formContainer.style.display = 'flex';
    formContainer.addEventListener('click', (e) => {
        if (e.target.id === "newMovementForm") {
            cerrarFormulario();
        }
    });
}
/*CONFIRM CREATE NEW MOVEMENT*/
async function createNewMovement(e) {
    e.preventDefault();
    try {
        const inputAmount = document.getElementById("newAmount");
        const inputType = document.getElementById("newTypeAmount");
        const amountStr = inputAmount.value.trim();
        const amount = parseFloat(amountStr);
        const description = inputType.value;

        const accountData = JSON.parse(sessionStorage.getItem("account")) || JSON.parse(currentAccount);
        const { balance, type, creditLine } = accountData;
        //VALIDACIONES INICIALES
        if (amountStr === "" || isNaN(amount)) throw new Error("Por favor, ingrese un monto numérico.");
        if (amount <= 0) throw new Error("El monto debe ser mayor a cero.");
        if (amountStr.includes(".") && amountStr.split(".")[1].length > 2) {
            throw new Error("No se permiten más de dos decimales.");
        }
        if (!description) throw new Error("Debe seleccionar un tipo de movimiento.");

        if (description === "Payment") {
            let totalDisponible = balance;
            if (type === "CREDIT") {
                totalDisponible += creditLine;
            }
            if (amount > totalDisponible) {
                let mensajeError = `Fondos insuficientes. Su saldo actual es ${currencyFormatter.format(balance)}.`;
                if (type === "CREDIT") {
                    mensajeError += ` Sumando su crédito, el máximo permitido es ${currencyFormatter.format(totalDisponible)}.`;
                }
                throw new Error(mensajeError);
            }
        }
        await fetchCreateNewMovement(amount, description);
        cerrarFormulario(); 

    } catch (error) {
        const msgBox = document.getElementById("responseMsg");
        msgBox.className = 'error';
        msgBox.textContent = error.message;
        msgBox.style.display = 'block';
    }
}
/*SHOW THE DELETE LAST MOVEMENT LAYER - CLICK BIN TRASH  */
function handlerFormDeleteMovement(){
    const deleteFormContainer = document.getElementById("confirmDelete");
    deleteFormContainer.style.display = 'flex';
}
/*CONFIRM DELETE LAST MOVEMENT*/
/*FETCH DELETE MOVEMENT*/
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
        if(lastMov.description === "Deposit"){
            accountData.balance -= lastMov.amount;
        }else{
            accountData.balance += lastMov.amount;
        }
        // Revertimos el balance
        //Llamamos a la función updateAccountBalance para poder actualizar
        //el balance de cuentas, par. la cuenta con el balance modificado.
        await updateAccountBalance(accountData);
        await buildMovementsTable();
        cerrarDeleteForm();
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

/*GO BACK ACCOUNT TABLE, CLEANING SESSION STORAGE - CLICK*/
function goBackAccounts(){
    sessionStorage.removeItem("account");
    window.location.href = "/NovaBank/html/main.html"; 
}

/*SHOW TOTAL BALANCE*/
function toggleSummary() {
    if (summaryDiv.style.display === "none") {
        calculateTotals();
        summaryDiv.style.display = "flex";
    } else {
        summaryDiv.style.display = "none";
    }
}

/*HELP INTERACTIVE VIDEO*/
function showVideoHelpMovment() {
    const el = document.getElementById('h5p-container');
    if (!h5pInstance) {
    const options = {
        h5pJsonPath: '/NovaBank/assets/help_mov', 
        frameJs: '/NovaBank/assets/h5p-player/frame.bundle.js',
        frameCss: '/NovaBank/assets/h5p-player/styles/h5p.css',
        librariesPath: '/NovaBank/assets/h5p-libraries' 
        };
    h5pInstance = new H5PStandalone.H5P(el, options);
        el.style.display = "flex";
        document.body.style.overflow = "hidden"; // Evita scroll al abrir
        
        // Configuramos el listener de cierre SOLO una vez al crear la instancia
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

/*
   =================================================
                   OTHER FUNCTIONS
   =================================================
 */
const currencyFormatter = new Intl.NumberFormat(undefined, {
        style: 'currency', currency: 'EUR', minimumFractionDigits: 2
    });
const dateFormatter = new Intl.DateTimeFormat(undefined, {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
});
/*FETCH CREATE RESOURCE*/
async function fetchCreateNewMovement(amount, description) {
    try {
        const accountData = JSON.parse(sessionStorage.getItem("account"));
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
        await buildMovementsTable();
        cerrarFormulario();

    } catch (error) {
        console.error("Error:", error);
    }
}

/*FETCH UPDATE ACCOUNT RESOURCE*/
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
    //const idAccount = accountData ? accountData.id : "3252214522"; //luego dejarlo solo por el session storage
    const idAccount = accountData.id;
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
    
    for (const movement of movementsList) {
        const tr = document.createElement("tr");
        ["timestamp", "description", "amount", "balance"].forEach(field => {
            const td = document.createElement("td");
            let value = movement[field];
            if (field === "timestamp" && value) {
                value = dateFormatter.format(new Date(value));
            } 
            else if ((field === "amount" || field === "balance") && value !== undefined) {
                if (field === "amount" && parseFloat(value) < 0) {
                    td.style.color = "red";
                    td.style.fontWeight = "bold";
                }
                value = currencyFormatter.format(value);
            }
            td.textContent = value ?? "N/A";
            tr.appendChild(td);
        });
        yield tr;
    }
}
/**/
function cerrarFormulario() {
    const formContainer = document.getElementById("newMovementForm");
    formContainer.style.display = 'none';
    document.getElementById("newAmount").value = "";
    document.getElementById("newTypeAmount").selectedIndex = 0;
}

function cerrarDeleteForm() {
    document.getElementById("confirmDelete").style.display = 'none';
}
/*INFORMACIÓN ADICIONAL DE LA CUENTA*/
function accountHeader() {
    const accountData = JSON.parse(sessionStorage.getItem("account"));
    if (!accountData) return;
    const spanId = document.getElementById("display-id");
    const spanType = document.getElementById("display-type");
    const containerCredit = document.getElementById("display-credit-container");
    const spanCredit = document.getElementById("display-credit");

    spanId.textContent = accountData.id;
    spanType.textContent = accountData.type;
    if (accountData.type === "CREDIT") {
        containerCredit.style.display = "block";
        spanCredit.textContent = currencyFormatter.format(accountData.creditLine);
    } else {
        containerCredit.style.display = "none";
    }
}
/*CALCULAR BALANCE GENERAL - FUNC AGREGADAS*/
function calculateTotals() {
    const totalDeposits = movements
        .filter(m => m.description === "Deposit")
        .reduce((sum, m) => sum + Math.abs(m.amount), 0);
    const totalPayments = movements
        .filter(m => m.description === "Payment")
        .reduce((sum, m) => sum + Math.abs(m.amount), 0);
    document.getElementById("totalDeposits").textContent = currencyFormatter.format(totalDeposits);
    document.getElementById("totalPayments").textContent = currencyFormatter.format(totalPayments);
}