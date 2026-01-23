/*
   ================================================     
                                                        
    THIS JS FILE IS IN CHARGE OF THE BEHAVIOUR OF       
      THE ACCOUNTS SECTION LOCATED IN main.html         
                                                        
   -----------------------------------------------      
                                                        
   The file handles the retrieval of accounts                      ∎∎∎∎∎∎∎∎∎∎\         
   associated with a Customer ID retrieved from                ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎\     
   sessionStorage, which are then displayed in               ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎\  
   a table format.                                         ∎∎∎∎∎∎\_∎∎∎∎∎∎∎∎∎∎∎\_∎∎∎∎∎∎\
                                                           ∎∎∎∎∎∎|  ∎∎∎∎∎∎∎∎∎/  ∎∎∎∎∎∎ | 
   Once retrieved, these accounts are instantiated       ∎∎∎∎∎∎∎∎|   ∎∎∎∎∎∎∎/   ∎∎∎∎∎∎∎∎\
   as objects of the Account class and stored in a       ∎∎∎∎∎∎∎∎| ∎\ ∎∎∎∎∎/ ∎| ∎∎∎∎∎∎∎∎ |
   global array named accountsArray.                     ∎∎∎∎∎∎∎∎| ∎∎\ ∎∎∎/ ∎∎| ∎∎∎∎∎∎∎∎ |
                                                         ∎∎∎∎∎∎∎∎| ∎∎∎\ ∎/ ∎∎∎| ∎∎∎∎∎∎∎∎ |
   The table includes options to create, delete,         ∎∎∎∎∎∎∎∎| ∎∎∎∎\  ∎∎∎∎| ∎∎∎∎∎∎∎∎ |
   or modify an account. Any data entered by the         ∎∎∎∎∎∎∎∎| ∎∎∎∎∎\∎∎∎∎∎| ∎∎∎∎∎∎∎∎ |
   user is validated within this file before being        \∎∎∎∎∎∎| ∎∎∎∎∎∎∎∎∎∎∎| ∎∎∎∎∎∎\_\|  
   sent via POST, PUT, or DELETE requests.                 ∎∎∎∎∎∎| ∎∎∎∎∎∎∎∎∎∎∎| ∎∎∎∎∎∎ |
                                                            \∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎\_\|   
   Clicking on a specific Account ID will redirect            \∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎\_\|
   the user to a page displaying its associated                 \__∎∎∎∎∎∎∎∎∎∎∎\___\|
   transactions.                                                    \_________\|                                        
                                                        
   The file contains an INDEX section where you         
   can consult the rest of the available sections.      
                                                        
   <·> <·> <·> <·> <·> <·> <·> <·> <·> <·> <·> <·>      
                                                        
   AUTHOR: Miguel González Delgado                      
   CREATION DATE: 2025-12-5 9:08 UTC+01                 
   FINALIZATION DATE: undefined                         
                                                        
   ================================================     
 */

import { Account } from './model.js';

/*
   =================================================
   
                         INDEX
   
   -------------------------------------------------
          
         SECTION #1  -> GLOBAL HTML LISTENER
         SECTION #2  -> CONSTANT VALUES
         SECTION #3  -> LISTENERS FOR HANDLING 
                         EVENTS ON HTML
         SECTION #4  -> ENEVT HANDLERS CALLED FROM 
                          THE LISTENERS
         SECTION #5  -> VALUE CHECKERS
         SECTION #6  -> CANCELL ACTIONS
         SECTION #7  -> CRUD
         SECTION #8  -> ACCOUNT TABLE METHODS
         SECTION #9  -> SHOW & HIDE ACTIONS
         SECTION #10 -> BOOLEAN CHECKING METHODS
         SECTION #11 -> STORE DATA
                  
   
   =================================================
 */

/*
   =================================================        ∎∎
                                                           ∎∎∎
                 GLOBAL HTML LISTENER                     ∎∎∎∎
                                                         ∎∎ ∎∎
   -------------------------------------------------    ∎∎  ∎∎
                                                            ∎∎
                        Caption                             ∎∎
                                                            ∎∎
                                                            ∎∎
                                                            ∎∎    
   =================================================    ∎∎∎∎∎∎∎∎∎∎
 */

// Call buildAccountsTable when page loaded all the elements
document.addEventListener("DOMContentLoaded", buildAccountsTable);

/*
 
  ∎∎∎∎∎∎∎∎∎ ∎∎∎∎∎∎∎       ∎∎∎∎∎   ∎∎∎∎∎∎∎
      ∎     ∎     ∎       ∎    ∎  ∎     ∎
      ∎     ∎     ∎       ∎     ∎ ∎     ∎
      ∎     ∎     ∎       ∎     ∎ ∎     ∎
      ∎     ∎     ∎       ∎     ∎ ∎     ∎
      ∎     ∎     ∎       ∎    ∎  ∎     ∎
      ∎     ∎∎∎∎∎∎∎       ∎∎∎∎∎   ∎∎∎∎∎∎∎

    -> TAREA 1: OPERZACION AGREGADA DE ARRAY
       · Sumar todos los saldos de las cuentas
         y mostrarlo (los saldos pueden ser
         negativos por deuda) con .reduce()
       · Filtrar cuentas por id con 
         .filter() o .find()

    -> TAREA 6: UPDATE ACCOUNT
       · Codficar actualización de una
         cuenta desde la tabla de cuentas.

    -> TAREA 7: DOCUMENTAR
       · Documentar métodos de este script.
       · Documentar métodos de las clases.
       · Documentar de nuevo las secciones
         de este script.

    -> TAREA 8: REFACTORIZAR
       · Crear funciones mas pequeñas para
         mejor legibilidad del codigo.
       · Cambiar el nombre de algunas
         funciones ademas de nombres de
         id sacados del HTML.

 */

/*
   =================================================        ∎∎∎∎∎
                                                          ∎∎     ∎∎
                    CONSTANT VALUES                     ∎∎         ∎∎
                                                                  ∎∎
   -------------------------------------------------             ∎∎
                                                               ∎∎
   This section contains global constants to let all         ∎∎
   the methods use them.                                   ∎∎
                                                          ∎∎
   -> URL service constant for fetch API                  ∎∎
   -> Regular expressions to check inputs               ∎∎         ∎∎
   -> Data from session storage                         ∎∎∎∎∎∎∎∎∎∎∎∎∎
   -> Elements from HMTL                                
      · All the elements on the html/main.html that     
        need to be handled, have an id called like      
        it's name attribute.
      · Each of those elements are going to have an
        instance with the element content taken by
        the methods reference.getElementById() and
        reference.getElementsByTagName().
   -> Global Array accountsArray that is filled
        up with all the Account instances.
   
   =================================================
 */

// fetch resources
const GET_ALL_SERVICE_URL = "/CRUDBankServerSide/webresources/account/customer/"; // Then append the customer ID
const GET_BY_ID_SERVICE_URL = "/CRUDBankServerSide/webresources/account/"; // Then append the account ID
const UPDATE_SERVICE_URL = "/CRUDBankServerSide/webresources/account"; // Just the URL
const DELETE_SERVICE_URL = GET_BY_ID_SERVICE_URL; // Then append the account ID
const CREATE_SERVICE_URL = UPDATE_SERVICE_URL; // Same as updating an account

// regular expressions
const regExpOnlyNumbers = new RegExp("^[\-]?[0-9]+(\.[0-9]+)?$");
const regExpHasToContainLetters = new RegExp("[a-zA-ZñÑáÁéÉíÍóÓúÚüÜïÏ ]+");

// keep the customer id
const idCustomer = sessionStorage.getItem("customer.id");

// <=><=><=> Elements from main.html <=><=><=>
//// === message boxes ===
//const msgBoxAccounts = document.getElementById('msgBoxAccounts');
//const confirmationBoxAccounts = document.getElementById('confirmationBoxAccounts');

// === message boxes new form ===
const msgBoxAccounts = document.getElementById('msgBoxAccounts');
const confirmationBoxAccounts = document.getElementById('confirmationBoxAccounts');

//// === buttons ===
//// delete account
//const confirmButton = document.getElementById('confirm-button');
//const denyButton = document.getElementById('deny-button');
//// new account
//const createNewAccountButton = document.getElementById('createNewAccountButton');
//const confirmNewAccountButton = document.getElementById('confirmNewAccountButton');
//const candellNewAccountButton = document.getElementById('candellNewAccountButton');
//// update account
//const confirmUpdateAccountButton = document.getElementById('confirmUpdateAccountButton');
//const cancellUpdateAccountButton = document.getElementById('cancellUpdateAccountButton');

// === buttons new form ===
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

//// === forms ===
//const newAccountForm = document.getElementById("newAccountForm");
//const updateAccountForm = document.getElementById("updateAccountForm");

//// === inputs ===
//// new account
//const tfBeginBalance = document.getElementById("tfBeginBalance");
//const tfCreditLine = document.getElementById("tfCreditLine");
//const tfDescription = document.getElementById("tfDescription");
//// update account
//const tfUpdateCreditLine = document.getElementById("tfUpdateCreditLine");
//const tfUpdateDescription = document.getElementById("tfUpdateDescription");
// === inputs new form ===
// new account
const newBeginBalance = document.getElementById("newBeginBalance");
const newCreditLine = document.getElementById("newCreditLine");
const newDescription = document.getElementById("newDescription");
// update account
const tfUpdateCreditLine = document.getElementById("tfUpdateCreditLine");
const tfUpdateDescription = document.getElementById("tfUpdateDescription");

//// === combo ===
//const comboAccountType = document.getElementById("comboAccountType");
// === combo new form ===
const comboAccountType = document.getElementById("comboAccountType");

//// === headers ===
//// new account
//const idNewAccountHeader = document.getElementById("idNewAccountHeader");
//// delete account
//const idDeleteAccountHeader = document.getElementById("idDeleteAccountHeader");
//// update account
//const idUpdateAccountHeader = document.getElementById("idUpdateAccountHeader");
// === headers new form ===
// new account
const idNewAccountHeader = document.getElementById("idNewAccountHeader");
// delete account
const idDeleteAccountHeader = document.getElementById("idDeleteAccountHeader");
//// update account
//const idUpdateAccountHeader = document.getElementById("idUpdateAccountHeader");
// === GLOBAL ARRAY ===
/*
    OPERACIONES AGREGADAS USADAS 
              .sort()
          .push() .find()
*/
// Array that contains objects AccountController
let accountsArray = [];

/*
   =================================================      ∎∎∎∎
                                                        ∎∎    ∎∎
         LISTENERS FOR HANDLING EVENTS ON HTML                 ∎∎
                                                               ∎∎
   -------------------------------------------------          ∎∎
                                                          ∎∎∎∎
   These listeners trigger the functions associated           ∎∎
   with the correct behavior of the page as the                ∎∎
   user interacts with the page.                               ∎∎
                                                        ∎∎    ∎∎
   =================================================      ∎∎∎∎
 */

//// === buttons ===
//// delete account
//// listener of delete button in table generation
//confirmButton.addEventListener("click", handleDeleteAccount);
//denyButton.addEventListener("click", cancellDeleteAccount);
//// new account
//createNewAccountButton.addEventListener("click", showCreateAccountForm);
//confirmNewAccountButton.addEventListener("click", handleCreateAccount);
//candellNewAccountButton.addEventListener("click", cancellCreateAccount);
//// update account
//// listener of update button in table generation
//confirmUpdateAccountButton.addEventListener("click", handleUpdateAccount);
//cancellUpdateAccountButton.addEventListener("click", cancellUpdateAccount);
// === buttons new form ===
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

/*
   =================================================        ∎∎    ∎∎
                                                            ∎∎    ∎∎
       ENEVT HANDLERS CALLED FROM THE LISTENERS             ∎∎    ∎∎
                                                            ∎∎∎∎∎∎∎∎∎∎
   -------------------------------------------------              ∎∎
                                                                  ∎∎
   These functions are the triggered handlers from                ∎∎
   the event listeners.                                           ∎∎
                                                                  ∎∎
                                                                  ∎∎
   =================================================              ∎∎
 */

/*
 * Usado por new forms
 * @param {type} event
 * @returns {undefined}
 */
function toggleDeleteAccountFormVisibility(event) {
    //document.getElementById("responseMsgDeleteDescription").style.visibility = 'hidden';
    document.getElementById("responseMsgDeleteDescription").style.display = 'none';
    const deleteAccountForm = document.getElementById("deleteAccountForm");
    //deleteAccountForm.style.visibility = (deleteAccountForm.style.visibility == 'hidden') ? 'visible' : 'hidden';
    deleteAccountForm.style.display = (deleteAccountForm.style.display == 'none') ? 'flex' : 'none';
    if (event !== null) // comes from delete method without event
        confirmDeleteAccountButton.setAttribute("data-acc-id", event.target.dataset.accId);
//    const accountID = event.target.dataset.accId;
//    confirmationBoxAccounts.style.display = 'block';
//    confirmationBoxAccounts.style.marginTop = "5px";
//    confirmButton.setAttribute("data-acc-id", accountID);
//    idDeleteAccountHeader.innerHTML = `¿Borrar cuenta con ID: ${accountID}?`;
}

/*
 * Usado por new forms
 * @param {type} event
 * @returns {undefined}
 */
function toggleUpdateAccountFormVisibility(event) {
    const account = accountsArray.find((acc) => acc.id == event.target.dataset.accId);
    if (account.type === "CREDIT") tfUpdateCreditLine.removeAttribute("disabled");
    else tfUpdateCreditLine.setAttribute("disabled", true);
    //document.getElementById("responseMsgUpdateCreditLine").style.visibility = 'hidden';
    //document.getElementById("responseMsgUpdateDescription").style.visibility = 'hidden';
    document.getElementById("responseMsgUpdateCreditLine").style.display = 'none';
    document.getElementById("responseMsgUpdateDescription").style.display = 'none';
    const editAccountForm = document.getElementById("editAccountForm");
    //editAccountForm.style.visibility = (editAccountForm.style.visibility == 'hidden') ? 'visible' : 'hidden';
    editAccountForm.style.display = (editAccountForm.style.display == 'none') ? 'flex' : 'none';
    confirmUpdateAccountButton.setAttribute("data-acc-id", event.target.dataset.accId);
    cancellUpdateAccountButton.setAttribute("data-acc-id", event.target.dataset.accId);
    resetValueOfElements([tfUpdateCreditLine,tfUpdateDescription]);
//    const accountID = event.target.dataset.accId;
//    confirmationBoxAccounts.style.display = 'block';
//    confirmationBoxAccounts.style.marginTop = "5px";
//    confirmButton.setAttribute("data-acc-id", accountID);
//    idDeleteAccountHeader.innerHTML = `¿Borrar cuenta con ID: ${accountID}?`;
}

/*
 * Usado por new forms
 * @param {type} event
 * @returns {undefined}
 */
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
//    const accountID = event.target.dataset.accId;
//    confirmationBoxAccounts.style.display = 'block';
//    confirmationBoxAccounts.style.marginTop = "5px";
//    confirmButton.setAttribute("data-acc-id", accountID);
//    idDeleteAccountHeader.innerHTML = `¿Borrar cuenta con ID: ${accountID}?`;
}

/*
 * Usado por new forms
 * @param {type} event
 * @returns {undefined}
 */
async function handleDeleteAccount(event) {
//    const accountID = event.target.dataset.accId;
//    try {
//        if (await hasMovements(accountID))
//            throw new Error('La cuenta con ID: ('+ accountID +') tiene movimientos, no puede ser borrada');
//        // At this point the account doesn't have movements
//        deleteAccount(accountID);
//    } catch (error) { // Informs to the user the errors
//        showMsgBoxAccounts(error.message, "#ff0000");
//        const enlaceMovements = document.createElement("u");
//        enlaceMovements.setAttribute("data-acc-id", accountID);
//        enlaceMovements.innerHTML = "Ir a movimientos de la cuenta";
//        enlaceMovements.style.color = "#5620ad";
//        enlaceMovements.addEventListener("click", storeAccountData);
//        msgBoxAccounts.appendChild(enlaceMovements);
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

/*
 * Usado por new forms
 * @param {type} event
 * @returns {undefined}
 */
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

/*
   =================================================        ∎∎∎∎∎∎∎∎∎∎
                                                            ∎∎
                    VALUE CHECKERS                          ∎∎
                                                            ∎∎
   -------------------------------------------------        ∎∎∎∎∎∎∎∎∎
                                                                    ∎∎
                                                                    ∎∎
                                                                    ∎∎
                                                                    ∎∎
                                                            ∎∎      ∎∎
   =================================================         ∎∎∎∎∎∎∎∎
 */

/*
 * Funcion que detecta la seleccion del combo de main.html
 * referente al tipo de cuenta seleciconado en el formulario
 * para crear una cuenta nueva
 * 
 * Usado por new forms
 * 
 * @param {type} event
 * @returns {string} account type selected
 */
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

/*
 * Funcion que controla el valor introducido de salario
 * en el formulario impidiendo que sea menor a 0
 * 
 * Usado por new forms
 * 
 * @param {type} event
 * @returns {undefined}
 */
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

/*
 * Usado por new forms
 * 
 * @param {type} event
 * @returns {Boolean}
 */
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

/*
 * Usado por new forms
 * 
 * @param {type} event
 * @returns {Boolean}
 */
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

/*
 * Usado por new forms
 * @param {type} input
 * @returns {undefined}
 */
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

/*
 * Usado por new forms
 * @param {type} event
 * @returns {Boolean}
 */
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

/*
 * Usado por new forms
 * @param {type} input
 * @returns {undefined}
 */
function checkDescription(input) {
    if (input.value.trim()==="") 
        throw new Error("Incluye una descripción a la cuenta");
    if (regExpHasToContainLetters.exec(input.value.trim())===null)
        throw new Error("La descripción debe contener letras");
}

/*
 * Usado por new forms
 * @param {type} input
 * @returns {undefined}
 */
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

/*
   =================================================          ∎∎∎∎∎∎
                                                            ∎∎      ∎∎
                    CANCELL ACTIONS                         ∎∎
                                                            ∎∎
   -------------------------------------------------        ∎∎∎∎∎∎∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
   =================================================          ∎∎∎∎∎∎
 */

function cancellDeleteAccount(event) {
    hideDisplayOf([confirmationBoxAccounts]);
    hideDisplayOf([msgBoxAccounts]);
}

function cancellCreateAccount(event) {
    hideElements([newAccountForm]);
    hideDisplayOf([msgBoxAccounts]);
}

function cancellUpdateAccount(event) {
    hideElements([editAccountForm]);
    hideDisplayOf([msgBoxAccounts]);
    resetValueOfElements([tfUpdateCreditLine,tfUpdateDescription]);
}

/*
   =================================================        ∎∎∎∎∎∎∎∎∎∎
                                                                   ∎∎
                         CRUD                                     ∎∎
                                                                 ∎∎
   -------------------------------------------------            ∎∎
                                                               ∎∎
   These functions fetch resources in the server              ∎∎
   side.                                                     ∎∎
                                                            ∎∎
   The funcitons create, read, update or delete            ∎∎
   accounts.                                              ∎∎
                                                         ∎∎
   POSSIBLE HTTP RESPONSES:
   · 200: The GET method will return data if there
          weren't no problems. The data returned
          will always be in json format.
   · 204: The POST, PUT and DELETE methods will
          not return data if everything went well.
   · 500: This response can happen if the service
          of mysql is not running, there is no
          internet connection or forbidden actions
          (like creating new accounts with existing
          ID) were attempted.
   
   =================================================
 */

/*
 * DOCUMENTAR METODO
 * 
 * @returns {Array}
 */
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

/*
 * By an ID passed by parameters, search the account related to
 * that ID in the service to return it in json format.
 * 
 * The function uses the GET method and 
 * the fetch method.
 * 
 * If no accounts were found, will return null.
 * 
 * @returns {json} with the account or null if no account found
 */
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

/*
 * Building function...
 * REMAINS: Everything
 * 
 * @returns {undefined}
 */
async function createAccount() {
    const newAccountID = accountsArray[0].id+1; // new ID
    const date = new Date().toISOString(); // get system date
    var creditLine; // controll credit line value
    // creditLine controll
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
    } catch (error) {
        showMsgBoxAccounts(msgBoxAccounts, error.message, "#ff0000");
    }
}

/*
 * Usado por new forms
 * 
 * @param {type} evt
 * @returns {undefined}
 */
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
    } catch (error) {   
        showMsgBoxAccounts(error.message, "#ff0000");
    }
}

/*
 * Usado por new forms
 * 
 * 
 * @param {type} event
 * @returns {undefined}
 */
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
    } catch (error) {   
        showMsgBoxAccounts(msgBoxAccounts,error.message, "#ff0000");
    }
}

/*
   =================================================          ∎∎∎∎∎∎
                                                            ∎∎      ∎∎
                 ACCOUNT TABLE METHODS                      ∎∎      ∎∎
                                                            ∎∎      ∎∎
   -------------------------------------------------          ∎∎∎∎∎∎
                                                            ∎∎      ∎∎
   These functions                                          ∎∎      ∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
   =================================================          ∎∎∎∎∎∎
 */

/*
 * FUNC DESCRIPTION
 * 
 * Usado por new forms
 * 
 * @param {type} accounts are the accounts in json object format
 * @returns {Generator}
 */
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
//        const buttonEdit = document.createElement("button");
//        const buttonDelete = document.createElement("button");
        const buttonEdit = document.createElement("img");
        const buttonDelete = document.createElement("img");
        // IMG
//        buttonEdit.textContent = "EDIT";
//        buttonDelete.textContent = "DEL";
        buttonEdit.setAttribute("src", "../assets/img/edit-pencil-01-svgrepo-com.svg");
        buttonDelete.setAttribute("src", "../assets/img/delete-2-svgrepo-com.svg");
        // Button aspect attributes
        buttonEdit.setAttribute("class", "btn-edit");
        buttonDelete.setAttribute("class", "btn-delete");
        buttonDelete.style.marginTop = "5px";
        // Button alt attributes
        buttonEdit.setAttribute("alt", "edit button");
        buttonDelete.setAttribute("alt", "delete button");
        // Button id classes
        buttonEdit.setAttribute("data-acc-id", accID);
        buttonDelete.setAttribute("data-acc-id", accID);
        // listeners
        buttonEdit.addEventListener("click",toggleUpdateAccountFormVisibility);
        buttonDelete.addEventListener("click",toggleDeleteAccountFormVisibility);
        //buttonEdit.addEventListener("click",showUpdateAccountForm);
        //buttonDelete.addEventListener("click",handleDeleteAccount);
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

/**
 * Async function that calls the fetchAccounts function to get the
 * accounts of a customer ID passed by the session storage and
 * then returns nothing if there are no accounts or calls the
 * accountRowGenerator function to build the table for these
 * accounts and display the data.
 * 
 * Usado por new forms
 * 
 * @returns {undefined} nothing if no accounts where given
 */
async function buildAccountsTable() {
    const accounts = await getAccounts(); // Fetch accounts into const
    const tbody = document.querySelector("#contentAccounts");
    tbody.innerHTML = ""; // Reset table
    const rowGenerator = accountRowGenerator(accounts);
    for (const row of rowGenerator)
        tbody.appendChild(row);
}

/*
   =================================================          ∎∎∎∎∎∎
                                                            ∎∎      ∎∎
                  SHOW & HIDE ACTIONS                       ∎∎      ∎∎
                                                            ∎∎      ∎∎
   -------------------------------------------------          ∎∎∎∎∎∎∎∎
                                                                    ∎∎
   These functions                                                  ∎∎
                                                                    ∎∎
                                                            ∎∎      ∎∎
                                                            ∎∎      ∎∎
   =================================================          ∎∎∎∎∎∎
 */

function showCreateAccountForm(event) {
    showElements([newAccountForm]);
    const newAccountID = accountsArray[0].id+1;
    idNewAccountHeader.innerHTML = `Futuro ID de cuenta: ${newAccountID}`;
}

function showUpdateAccountForm(event) {
    // show update account form
    // pressed cancell button => call cancellUpdateAccount();
    // pressed create button => call handleUpdateAccount();
    showElements([updateAccountForm]);
    const updateAccountID = event.target.dataset.accId;
    // show ID of updating account
    idUpdateAccountHeader.innerHTML = `ID de cuenta a actualizar: ${updateAccountID}`;
    confirmUpdateAccountButton.setAttribute("data-acc-id", updateAccountID);
    const account = accountsArray.find((acc) => acc.id == updateAccountID);
    if (account.type === "CREDIT") showElements([tfUpdateCreditLine]);
    else {
        hideElements([tfUpdateCreditLine]);
        resetValueOfElements([tfUpdateCreditLine]);
    }
}

//function showMsgBoxAccounts(message, color) {
//    msgBoxAccounts.style.color = color;
//    msgBoxAccounts.style.marginTop = "5px";
//    msgBoxAccounts.textContent = message;
//    msgBoxAccounts.style.display = 'flex';
//    msgBoxAccounts.style.flexDirection = 'column';
//    msgBoxAccounts.style.alignItems = 'center';
//}

/*
 * Usado por new forms
 * @param {type} box
 * @param {type} message
 * @param {type} color
 * @returns {undefined}
 */
function showMsgBoxAccounts(box, message, color) {
    //box.style.visibility = 'visible';
    box.style.display = 'flex';
    box.textContent = message;
    box.style.color = color;
}

function hideDisplayOf(elements) {
//    for (const element of elements) element.style.display = 'none';
}

function hideNewAccountForm() {
    //newAccountForm.setAttribute("hidden", true);
}

function hideElements(elements) {
    for (const element of elements) element.style.display = 'none';
}

function showElements(elements) {
    for (const element of elements) element.style.display = 'flex';
}

/*
 * Usado por new forms
 * 
 * @param {type} 
 */
function resetValueOfElements(elements) {
    for (const element of elements) element.value = "";
}

/*
   =================================================          ∎∎       ∎∎∎∎
                                                             ∎∎∎     ∎∎    ∎∎
                BOOLEAN CHECKING METHODS                    ∎∎∎∎    ∎∎      ∎∎
                                                           ∎∎ ∎∎    ∎∎      ∎∎
   -------------------------------------------------      ∎∎  ∎∎    ∎∎      ∎∎
                                                              ∎∎    ∎∎      ∎∎
   These functions                                            ∎∎    ∎∎      ∎∎
                                                              ∎∎    ∎∎      ∎∎
                                                              ∎∎    ∎∎      ∎∎
                                                              ∎∎     ∎∎    ∎∎
   =================================================      ∎∎∎∎∎∎∎∎∎∎   ∎∎∎∎
 */

/*
 * Usado por new forms
 * @param {type} accountID
 * @returns {Boolean}
 */
async function hasMovements(accountID) {
    const account = await getAccountByID(accountID);
    return account.movements.length !== 0;
}

/*
   =================================================          ∎∎         ∎∎    
                                                             ∎∎∎        ∎∎∎    
                      STORE DATA                            ∎∎∎∎       ∎∎∎∎    
                                                           ∎∎ ∎∎      ∎∎ ∎∎    
   -------------------------------------------------      ∎∎  ∎∎     ∎∎  ∎∎    
                                                              ∎∎         ∎∎    
   These functions                                            ∎∎         ∎∎    
                                                              ∎∎         ∎∎    
                                                              ∎∎         ∎∎    
                                                              ∎∎         ∎∎    
   =================================================      ∎∎∎∎∎∎∎∎∎∎ ∎∎∎∎∎∎∎∎∎∎
 */

/*
 * Usado por new forms
 */
function storeAccountData(event) {
    const account = accountsArray.find((acc) => acc.id == event.target.dataset.accId);
    sessionStorage.setItem("account", account);
    window.location.href = 'movements.html'; // Redirect to movimientos.html
}
