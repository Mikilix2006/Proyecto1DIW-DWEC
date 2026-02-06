import { Account } from './model.js';

// Call buildAccountsTable when page loaded all the elements
document.addEventListener("DOMContentLoaded", buildAccountsTable);

// <=><=><=> fetch resources <=><=><=>
const GET_ALL_SERVICE_URL = "/CRUDBankServerSide/webresources/account/customer/"; // Then append the customer ID
const GET_BY_ID_SERVICE_URL = "/CRUDBankServerSide/webresources/account/"; // Then append the account ID
const UPDATE_SERVICE_URL = "/CRUDBankServerSide/webresources/account"; // Just the URL
const DELETE_SERVICE_URL = GET_BY_ID_SERVICE_URL; // Then append the account ID
const CREATE_SERVICE_URL = UPDATE_SERVICE_URL; // Same as updating an account
// <=><=><=> regular expressions <=><=><=>
const regExpOnlyNumbers = new RegExp("^[\-]?[0-9]+(\.[0-9]+)?$");
const regExpHasToContainLetters = new RegExp("[a-zA-ZñÑáÁéÉíÍóÓúÚüÜïÏ ]+");
// <=><=><=> keep the customer id <=><=><=>
const idCustomer = sessionStorage.getItem("customer.id");
// <=><=><=> Elements from main.html <=><=><=>
// === message boxes ===
const msgBoxAccounts = document.getElementById('msgBoxAccounts');
// === buttons ===
// delete account
const confirmDeleteAccountButton = document.getElementById('confirmDeleteAccountButton');
const cancellDeleteAccountButton = document.getElementById('cancellDeleteAccountButton');
// new account
const createNewAccountButton = document.getElementById('createNewAccountButton');
const confirmNewAccountButton = document.getElementById('confirmNewAccountButton');
const cancellNewAccountButton = document.getElementById('cancellNewAccountButton');
// update account
const confirmUpdateAccountButton = document.getElementById('confirmUpdateAccountButton');
const cancellUpdateAccountButton = document.getElementById('cancellUpdateAccountButton');
// help
//const buttonVideoHelper = document.getElementById("h5p-container");
const buttonVideoHelper = document.getElementById('buttonVideoHelper');
// === inputs ===
// new account
const newBeginBalance = document.getElementById("newBeginBalance");
const newCreditLine = document.getElementById("newCreditLine");
const newDescription = document.getElementById("newDescription");
// update account
const tfUpdateCreditLine = document.getElementById("tfUpdateCreditLine");
const tfUpdateDescription = document.getElementById("tfUpdateDescription");
// === combo ===
const comboAccountType = document.getElementById("comboAccountType");
// === video helper ===
let h5pInstance = null;
// === GLOBAL ARRAY ===
// Array that contains objects AccountController
let accountsArray = [];

// === buttons ===
// delete account
// listener of delete button in table generation
confirmDeleteAccountButton.addEventListener("click", handleDeleteAccount);
cancellDeleteAccountButton.addEventListener("click", toggleDeleteAccountFormVisibility);
// new account
createNewAccountButton.addEventListener("click", toggleNewAccountFormVisibility);
confirmNewAccountButton.addEventListener("click", handleCreateAccount);
cancellNewAccountButton.addEventListener("click", toggleNewAccountFormVisibility);
// update account
// listener of update button in table generation
confirmUpdateAccountButton.addEventListener("click", handleUpdateAccount);
cancellUpdateAccountButton.addEventListener("click", toggleUpdateAccountFormVisibility);
// help
//buttonVideoHelper.addEventListener("click", toggleVideoHelperVisibility)
if (buttonVideoHelper) {
    buttonVideoHelper.addEventListener('click', toggleVideoHelperVisibility);
}
// === combo ===
// new account
comboAccountType.addEventListener("change", checkSelectedValue);
// === inputs ===
// new account
newBeginBalance.addEventListener("input", checkNewAccountBeginBalance);
newCreditLine.addEventListener("input", checkNewAccountCreditLine);
newDescription.addEventListener("input", checkNewAccountDescription);
// update account
tfUpdateCreditLine.addEventListener("input", checkUpdateAccountCreditLine);
tfUpdateDescription.addEventListener("input", checkUpdateAccountDescription);
// === video ===

function toggleDeleteAccountFormVisibility(event) {
    document.getElementById("responseMsgDeleteDescription").style.display = 'none';
    const deleteAccountForm = document.getElementById("deleteAccountForm");
    deleteAccountForm.style.display = (deleteAccountForm.style.display == 'none') ? 'flex' : 'none';
    if (event !== null) // comes from delete method without event
        confirmDeleteAccountButton.setAttribute("data-acc-id", event.target.dataset.accId);
}
function toggleUpdateAccountFormVisibility(event) {
    const account = accountsArray.find((acc) => acc.id == event.target.dataset.accId);
    if (account.type === "CREDIT") tfUpdateCreditLine.removeAttribute("disabled");
    else tfUpdateCreditLine.setAttribute("disabled", true);
    document.getElementById("responseMsgUpdateCreditLine").style.display = 'none';
    document.getElementById("responseMsgUpdateDescription").style.display = 'none';
    const editAccountForm = document.getElementById("editAccountForm");
    editAccountForm.style.display = (editAccountForm.style.display == 'none') ? 'flex' : 'none';
    confirmUpdateAccountButton.setAttribute("data-acc-id", account.id);
    cancellUpdateAccountButton.setAttribute("data-acc-id", account.id);
    tfUpdateCreditLine.value = account.creditLine;
    tfUpdateDescription.value = account.description;
}
function toggleNewAccountFormVisibility(event) {
    document.getElementById("responseMsgNewCreditLine").style.display = 'none';
    document.getElementById("responseMsgNewDescription").style.display = 'none';
    document.getElementById("responseMsgNewBeginBalance").style.display = 'none';
    const newAccountForm = document.getElementById("newAccountForm");
    newAccountForm.style.display = (newAccountForm.style.display == 'none') ? 'flex' : 'none';
    if (event !== null) { // comes from delete method without event
        confirmNewAccountButton.setAttribute("data-acc-id", event.target.dataset.accId);
        cancellNewAccountButton.setAttribute("data-acc-id", event.target.dataset.accId);
    }
    resetValueOfElements([newBeginBalance,newDescription,newCreditLine]);
}
/*HELP INTERACTIVE VIDEO*/
function toggleVideoHelperVisibility(event) {
    console.log("Enseñando video")
    const el = document.getElementById('h5p-container');
    if (!h5pInstance) {
    const options = {
        h5pJsonPath: '/NovaBank/assets/help_acc', 
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
async function handleDeleteAccount(event) {
    const accountID = event.target.dataset.accId;
    try {
        if (await hasMovements(accountID))
            throw new Error('La cuenta con ID: ('+ accountID +') tiene movimientos, no puede ser borrada');
        // At this point the account doesn't have movements
        deleteAccount(accountID);
    } catch (error) { // Informs to the user the errors
        const box = document.getElementById("responseMsgDeleteDescription");
        showMsgBoxAccounts(box, error.message, "#ff0000");
    }
}
function handleCreateAccount(event) {
    if (checkNewAccountBeginBalance())
        if (checkNewAccountDescription())
            if (comboAccountType.value === "CREDIT") // if CREDIT, check it
                if (checkNewAccountCreditLine()) createAccount(); // Everything OK
                else {
                    const box = document.getElementById("responseMsgNewCreditLine");
                    showMsgBoxAccounts(box, "La línea de crédito no es válida", "#ff0000");
                }
            else createAccount(); // Everything OK
        else {
            const box = document.getElementById("responseMsgUpdateDescription");
            showMsgBoxAccounts(box,"La descripción no es válida", "#ff0000");
        }
    else {
        const box = document.getElementById("responseMsgNewBeginBalance");
        showMsgBoxAccounts(box,"El saldo inicial no es válido", "#ff0000");
    }
}
async function handleUpdateAccount(event) {
    const updatingAccount = accountsArray.find((acc) => acc.id == event.target.dataset.accId);
    if (checkUpdateAccountDescription())
        if (updatingAccount.type === "CREDIT") // if CREDIT, check it
            if (checkUpdateAccountCreditLine()) updateAccount(event); // Everything OK
            else {
                const box = document.getElementById("responseMsgUpdateCreditLine");
                showMsgBoxAccounts(box, "La línea de crédito no es válida", "#ff0000");
            }
        else updateAccount(event); // Everything OK
    else {
        const box = document.getElementById("responseMsgUpdateDescription");
        showMsgBoxAccounts(box,"La descripción no es válida", "#ff0000");
    }
}
function checkSelectedValue(event) {
    const selectedAccountType = event.target.value;
    switch (selectedAccountType) {
        case "NotSelected":
            newCreditLine.setAttribute("disabled", true);
            break;
        case "STANDARD":
            newCreditLine.setAttribute("disabled", true);
            newDescription.removeAttribute("disabled");
            newBeginBalance.removeAttribute("disabled");
            resetValueOfElements([newCreditLine]);
            break;
        case "CREDIT":
            newCreditLine.removeAttribute("disabled");
            newDescription.removeAttribute("disabled");
            newBeginBalance.removeAttribute("disabled");
            break;
    }
    return selectedAccountType;
}
function checkNewAccountBeginBalance(event) {
    try {
        const errorMessages = ["Solo se admiten números en el saldo inicial",
                               "Saldo inicial inferior a 0"];
        checkInputNumbers(newBeginBalance, errorMessages); // May throw Error
        document.getElementById("responseMsgNewBeginBalance").style.display = 'none'; // No error, no message
        return true; // Everything ok
    } catch (error) {
        const box = document.getElementById("responseMsgNewBeginBalance");
        showMsgBoxAccounts(box, error.message, "#ff0000");
        return false; // Not everything ok
    }
}
function checkNewAccountCreditLine(event) {
    try {
        const errorMessages = ["Solo se admiten números en la línea de crédito",
                               "Linea de crédito inferior a 0"];
        checkInputNumbers(newCreditLine, errorMessages); // May throw Error
        document.getElementById("responseMsgNewCreditLine").style.display = 'none'; // No error, no message
        return true; // Everything ok
    } catch (error) {
        const box = document.getElementById("responseMsgNewCreditLine");
        showMsgBoxAccounts(box, error.message, "#ff0000");
        return false; // Not everything ok
    }
}
function checkNewAccountDescription(event) {
    try {
        checkDescription(newDescription); // May throw Error
        document.getElementById("responseMsgNewDescription").style.display = 'none'; // No error, no message
        return true; // Everything ok
    } catch (error) {
        const box = document.getElementById("responseMsgNewDescription");
        showMsgBoxAccounts(box, error.message, "#ff0000");
        return false; // Not everything ok
    }
}
function checkUpdateAccountCreditLine(event) {
    try {
        checkCreditLine(tfUpdateCreditLine); // May throw Error
        document.getElementById("responseMsgUpdateCreditLine").style.display = 'none'; // No error, no message
        return true; // Everything ok
    } catch (error) {
        const box = document.getElementById("responseMsgUpdateCreditLine");
        showMsgBoxAccounts(box, error.message, "#ff0000");
        return false; // Not everything ok
    }
}
function checkUpdateAccountDescription(event) {
    try {
        checkDescription(tfUpdateDescription); // May throw Error
        document.getElementById("responseMsgUpdateDescription").style.display = 'none'; // No error, no message
        return true; // Everything ok
    } catch (error) {
        const box = document.getElementById("responseMsgUpdateDescription");
        showMsgBoxAccounts(box, error.message, "#ff0000");
        return false; // Not everything ok
    }
}
function checkDescription(input) {
    if (input.value.trim()==="") 
        throw new Error("Incluye una descripción a la cuenta");
    if (regExpHasToContainLetters.exec(input.value.trim())===null)
        throw new Error("La descripción debe contener letras");
}
function checkCreditLine(input) {
    if (input.value < 0)
        throw new Error("Linea de crédito inferior a 0");
    if (regExpOnlyNumbers.exec(input.value.trim())===null)
        throw new Error("Solo se admiten números en la línea de crédito");
}
function checkInputNumbers(input, errorMessages) {
    if (errorMessages.length >= 1 && regExpOnlyNumbers.exec(input.value.trim())===null)
        throw new Error(errorMessages[0]);
    if (errorMessages.length >= 2 && input.value < 0)
        throw new Error(errorMessages[1]);
}
async function getAccounts() {
    try {
        const response = await fetch(GET_ALL_SERVICE_URL +`${encodeURIComponent(idCustomer)}`, {
            method: "GET",
            headers: {"Accept": "application/json"}
        });
        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json(); // Important to return JSON
    } catch (error) {
        return []; // Empty array for table generator not to fail
    }
}
async function getAccountByID(accountID) {
    try {
        const response = await fetch(GET_BY_ID_SERVICE_URL +`${encodeURIComponent(accountID)}`, {
            method: "GET",
            headers: {"Accept": "application/json"}
        });
        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json(); // Return the JSON of the full account
    } catch (error) {
        return null; // Returns null if no accounts were found
    }
}
async function createAccount() {
    const newAccountID = accountsArray[0].id+1; // new ID
    const date = new Date().toISOString(); // get system date
    var creditLine; // controll credit line value
    // creditLine input controll
    if (newCreditLine.value.trim() === "") creditLine = 0;
    else creditLine = newCreditLine.value.trim();
    const newAccount = new Account( // create Accounts
                                    newAccountID,
                                    newDescription.value.trim(),
                                    newBeginBalance.value.trim(),
                                    creditLine,
                                    newBeginBalance.value.trim(),
                                    date,
                                    comboAccountType.value);
    try {
        const response = await fetch(CREATE_SERVICE_URL, {
            method: 'POST',
                headers: {"Content-Type": "application/json",
                          "Accept": "application/json"},
                body: JSON.stringify(newAccount)
        });
        if (!response.ok) throw new Error("Error en la petición");
        
        buildAccountsTable(); // Reloads the table
        showMsgBoxAccounts(msgBoxAccounts, "Se ha creado la cuenta exitosamente", "#5620ad");
        toggleNewAccountFormVisibility(null);
        // reset input values
        comboAccountType.value = "NotSelected";
        resetValueOfElements([newBeginBalance,newCreditLine,newDescription]);
        location.reload();
    } catch (error) {
        showMsgBoxAccounts(msgBoxAccounts, error.message, "#ff0000");
    }
}
async function deleteAccount(accountID) {
    try {        
        const response = await fetch(DELETE_SERVICE_URL +`${encodeURIComponent(accountID)}`, {
            method: "DELETE",
            headers: {"Accept": "application/json"}
        });
        if (!response.ok) throw new Error("Error en la petición");
        
        buildAccountsTable(); // Reloads the table
        showMsgBoxAccounts(msgBoxAccounts, "Se ha borrado la cuenta exitosamente", "#5620ad");
        toggleDeleteAccountFormVisibility();
        location.reload();
    } catch (error) {   
        showMsgBoxAccounts(error.message, "#ff0000");
    }
}
async function updateAccount(event) {
    const accountID = event.target.dataset.accId;
    try {
        const account = accountsArray.find((acc) => acc.id == accountID);
        let updateAccount = new Account( // create Accounts
                                    account.id,
                                    tfUpdateDescription.value.trim(),
                                    account.beginBalance,
                                    account.creditLine,
                                    account.beginBalance,
                                    account.beginBalanceTimestamp,
                                    account.type);
        if (account.type === "CREDIT") {
            updateAccount.creditLine = tfUpdateCreditLine.value.trim();
        }
        const response = await fetch(UPDATE_SERVICE_URL, {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(updateAccount)
        });
        if (!response.ok) throw new Error("Error en la petición");
        
        buildAccountsTable(); // Reloads the table
        showMsgBoxAccounts(msgBoxAccounts,"Se ha actualizado la cuenta exitosamente", "#5620ad");
        toggleUpdateAccountFormVisibility(event); 
        location.reload();
    } catch (error) {   
        showMsgBoxAccounts(msgBoxAccounts,error.message, "#ff0000");
    }
}
function* accountRowGenerator(accounts) {
    for (const account of accounts) {
        const tr = document.createElement("tr");
        var accID;
        // Run through every element of the account
        ["id", "type", "description", "creditLine", "beginBalanceTimestamp", "beginBalance", "balance"].forEach(field => {
            const td = document.createElement("td");
            if (field === "beginBalanceTimestamp") {
                const originalDateFormat = new Date(account[field]);
                const opciones = {
                    day: '2-digit', month: '2-digit', year: 'numeric', // date
                    hour: '2-digit', minute: '2-digit', // hour
                    hour12: false // 24h format
                  };
                // Change date format
                td.textContent = originalDateFormat.toLocaleDateString('es-ES', opciones);
            } else if (field === "creditLine" ||
                       field === "beginBalance" ||
                       field === "balance" ) {
              td.textContent = new Intl.NumberFormat("es-ES", {style: "currency", 
                                                                   currency: "EUR"}).format(account[field]);
            } else { // No different format
                td.textContent = account[field];
            }
            if (field === "id") {
                accID = account[field]; // save account id for button data
                td.style.color = "#5620ad"; // link color
                td.setAttribute("data-acc-id", accID); // id attribute
                td.addEventListener("click", storeAccountData); // listener
            }
            tr.appendChild(td);
        });
        // Store at end of accountsArray Account objects
        accountsArray.push(new Account(
                                        account["id"],
                                        account["description"],
                                        account["balance"],
                                        account["creditLine"],
                                        account["beginBalance"],
                                        account["beginBalanceTimestamp"],
                                        account["type"]
                                        ));
        // Edit and Delete buttons in each row in new column
        const tdButtons = document.createElement("td");
        tdButtons.classList.add("actions");
        const buttonEdit = document.createElement("button");
        const buttonDelete = document.createElement("button");
        // IMG
//        buttonEdit.setAttribute("src", "../assets/img/edit-pencil-01-svgrepo-com.svg");
//        buttonDelete.setAttribute("src", "../assets/img/delete-2-svgrepo-com.svg");
        buttonEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        buttonDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        // Button aspect attributes
        buttonEdit.setAttribute("class", "btn-edit");
        buttonDelete.setAttribute("class", "btn-delete");
        
        // Button alt attributes
        buttonEdit.setAttribute("alt", "edit button");
        buttonDelete.setAttribute("alt", "delete button");
        // Button id classes
        buttonEdit.setAttribute("data-acc-id", accID);
        buttonDelete.setAttribute("data-acc-id", accID);
        // listeners
        buttonEdit.addEventListener("click",toggleUpdateAccountFormVisibility);
        buttonDelete.addEventListener("click",toggleDeleteAccountFormVisibility);
        // Put buttons into td
        tdButtons.appendChild(buttonEdit);
        tdButtons.appendChild(buttonDelete);
        // Put td into tr
        tr.appendChild(tdButtons);
        // Show the table row
        yield tr;
    }
    // Sort accountsArray from highest to lowest
    accountsArray.sort((cuenta1, cuenta2) => cuenta2.id - cuenta1.id);
}
async function buildAccountsTable() {
    const accounts = await getAccounts(); // Fetch accounts into const
    const tbody = document.querySelector("#contentAccounts");
    tbody.innerHTML = ""; // Reset table
    const rowGenerator = accountRowGenerator(accounts);
    for (const row of rowGenerator)
        tbody.appendChild(row);
}
function showMsgBoxAccounts(box, message, color) {
    box.style.display = 'flex';
    box.textContent = message;
    box.style.color = color;
}
function resetValueOfElements(elements) {
    for (const element of elements) element.value = "";
}
async function hasMovements(accountID) {
    const account = await getAccountByID(accountID);
    return account.movements.length !== 0;
}
function storeAccountData(event) {
    const account = accountsArray.find((acc) => acc.id == event.target.dataset.accId);
    sessionStorage.setItem("account", JSON.stringify(account));
    window.location.href = 'movements.html';
}