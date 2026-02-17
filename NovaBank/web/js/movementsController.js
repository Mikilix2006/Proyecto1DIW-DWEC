/*
   =================================================
      ATTRIBUTES TO BE USED BY THIS CONTROLLER
   =================================================
 */
import { Movement } from './model.js';
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
    const cardsContainer = document.querySelector("#contentMovementsCards");
    
    if (!tbody || !cardsContainer) return; //mostrar mensaje
    
    tbody.innerHTML = "";
    cardsContainer.innerHTML = "";
    const rowGenerator = movementRowGenerator(movements,'table');
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
    
    const cardsGenerator = movementRowGenerator(movements, 'card');
    for (const card of cardsGenerator) {
        cardsContainer.appendChild(card);
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
    const msgBox = document.getElementById("responseMsg");
    msgBox.style.display = 'none';
    try {
        const inputAmount = document.getElementById("newAmount");
        const inputType = document.getElementById("newTypeAmount");
        const rawAmount = inputAmount.value.trim();
        const description = inputType.value;

        //TODO Validar el formato de los importes mediante la siguiente RegExp
        const esAmountRegex = /^(?:\d{1,15}|\d{1,3}(?:\.\d{3}){1,4})(?:,\d{1,2})?$/;
        if (!esAmountRegex.test(rawAmount)) {
            throw new Error("Formato de monto inválido. Use el formato 1.234,56 o 1234 (Hasta 15 números)");
        }

        /* Explicación de esAmountRegex
        ^
            (?:                         # integer part options
               \d{1,15}                 # 1 to 15 digits without thousand separator
             | \d{1,3}(?:\.\d{3}){1,4}  # 1–3 digits, then 1–4 groups of ".ddd"
            )
            (?:,\d{1,2})?               # optional decimal with 1 or 2 digits
            $
         */        
        const normalizedAmount = parseFloat(rawAmount.replace(/\./g, "").replace(",", "."));

        if (isNaN(normalizedAmount) || normalizedAmount <= 0) {
            throw new Error("El monto debe ser un valor numérico positivo.");
        }
        if (normalizedAmount.length > 15) {
            throw new Error("El monto puede contener como máximo 15 dígitos.");
        }
        
        if (!description) throw new Error("Debe seleccionar un tipo de movimiento.");

        const accountData = JSON.parse(sessionStorage.getItem("account"));
        if (description === "Payment" && normalizedAmount > (accountData.balance + (accountData.type === "CREDIT" ? accountData.creditLine : 0))) {
            throw new Error("Fondos insuficientes para realizar este pago.");
        }

        await fetchCreateNewMovement(normalizedAmount, description);
        cerrarFormulario(); 
        await buildMovementsTable(); // Actualiza tabla y tarjetas
        
    } catch (error) {
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


async function handleResponseError(response) {
    let message = "Error inesperado en el servidor.";
    try {
        // Intentamos leer el JSON de error que suele enviar el servidor (ej: {message: "..."})
        const errorData = await response.json();
        message = errorData.message || `Error ${response.status}: ${response.statusText}`;
    } catch (e) {
        // Si no es JSON, usamos el statusText estándar
        message = `Error ${response.status}: ${response.statusText}`;
    }
    throw new Error(message);
}
/*CONFIRM DELETE LAST MOVEMENT*/
/*FETCH DELETE MOVEMENT*/
async function deleteLastMovement() {
    if (movements.length === 0) return;
    const lastMov = movements[movements.length - 1];
    
    try {
        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(lastMov.id)}`, {
            method: "DELETE",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            await handleResponseError(response); // Problema 1
        }

        const accountData = JSON.parse(sessionStorage.getItem("account"));
        accountData.balance = (lastMov.description === "Deposit") ? accountData.balance - lastMov.amount : accountData.balance + lastMov.amount;

        await updateAccountBalance(accountData);
        await buildMovementsTable();
        cerrarDeleteForm();
    } catch (error) {
        // Mostrar error en el formulario de borrado si falla
        const msgBox = document.querySelector("#confirmDelete .error-msg");
        msgBox.textContent = error.message;
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
const currencyFormatter = new Intl.NumberFormat('es-ES', {
        style: 'currency', currency: 'EUR', minimumFractionDigits: 2
    });
const dateFormatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
});

/*FETCH CREATE RESOURCE*/
async function fetchCreateNewMovement(amount, description) {
    const accountData = JSON.parse(sessionStorage.getItem("account"));
    const idAccount = accountData.id;
    let newBalance = (description === "Deposit") ? accountData.balance + amount : accountData.balance - amount;
        //TODO Usar la clase Movement en lugar de Movements
        const movObj = new Movement(amount, newBalance, description);
        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idAccount)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(movObj)
    });

    if (!response.ok) {
        await handleResponseError(response); // Problema 1: Error específico del servidor
    }

    // Actualizar localmente solo si el servidor respondió OK
    accountData.balance = newBalance;
    await updateAccountBalance(accountData);
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

function* movementRowGenerator(movementsList,mode) {
    for (const movement of movementsList) {
        if (mode === 'table') {
            // Lógica original para crear <tr> y <td>
            const tr = document.createElement("tr");
            ["timestamp", "description", "amount", "balance"].forEach(field => {
                const td = document.createElement("td");
                td.textContent = formatFieldValue(movement, field, td);
                tr.appendChild(td);
            });
            yield tr;
        } else {
            // Lógica para crear estructura de DIVs (Cards)
            const card = document.createElement("div");
            card.className = "movement-card-item";
            
            const fields = [
                { id: "timestamp", label: "Fecha" },
                { id: "description", label: "Concepto" },
                { id: "amount", label: "Importe" },
                { id: "balance", label: "Saldo" }
            ];

            fields.forEach(f => {
                const divRow = document.createElement("div");
                divRow.className = "card-row";
                divRow.innerHTML = `<strong>${f.label}:</strong> <span></span>`;
                const span = divRow.querySelector("span");
                span.textContent = formatFieldValue(movement, f.id, span);
                card.appendChild(divRow);
            });
            yield card;
        }
    }
}

function formatFieldValue(movement, field, element) {
    let value = movement[field];
    if (field === "timestamp" && value) {
        return dateFormatter.format(new Date(value));
    } 
    if ((field === "amount" || field === "balance") && value !== undefined) {
        if (field === "amount" && parseFloat(value) < 0) {
            element.style.color = "red";
            element.style.fontWeight = "bold";
        }
        return currencyFormatter.format(value);
    }
    return value ?? "N/A";
}
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