import { Account } from './model.js';

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
   as objects of the Account class and stored in a       ∎∎∎∎∎∎∎∎| ∎  ∎∎∎∎∎/ ∎| ∎∎∎∎∎∎∎∎ |
   global array named accountsArray.                     ∎∎∎∎∎∎∎∎| ∎∎  ∎∎∎/ ∎∎| ∎∎∎∎∎∎∎∎ |
                                                         ∎∎∎∎∎∎∎∎| ∎∎∎  ∎/ ∎∎∎| ∎∎∎∎∎∎∎∎ |
   The table includes options to create, delete,         ∎∎∎∎∎∎∎∎| ∎∎∎∎   ∎∎∎∎| ∎∎∎∎∎∎∎∎ |
   or modify an account. Any data entered by the         ∎∎∎∎∎∎∎∎| ∎∎∎∎∎ ∎∎∎∎∎| ∎∎∎∎∎∎∎∎ |
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
         SECTION #6  -> CONFIRMATION & CANCELL 
                          ACTIONS
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
                   CONSTANT VALUES                      ∎∎         ∎∎
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
const DELETE_SERVICE_URL = GET_BY_ID_SERVICE_URL; // Then append the account ID
const CREATE_SERVICE_URL = GET_BY_ID_SERVICE_URL; // Same as getting by ID URL
const UPDATE_SERVICE_URL = GET_BY_ID_SERVICE_URL; // Same as getting by ID URL

// regular expressions
const regExpOnlyNumbers = new RegExp("^[0-9]+(\.[0-9]+)?$");
const regExpHasToContainLetters = new RegExp("[a-zA-ZñÑáÁéÉíÍóÓúÚüÜïÏ ]+");

// keep the customer data in constants
const idCustomer = sessionStorage.getItem("customer.id");

// <=><=><=> Elements from main.html <=><=><=>
// === message boxes ===
const msgBoxAccounts = document.getElementById('msgBoxAccounts');
const confirmationBoxAccounts = document.getElementById('confirmationBoxAccounts');
// === buttons ===
// delete account
const confirmButton = document.getElementById('confirm-button');
const denyButton = document.getElementById('deny-button');
// new account
const createNewAccountButton = document.getElementById('createNewAccountButton');
const confirmNewAccountButton = document.getElementById('confirmNewAccountButton');
const candellNewAccountButton = document.getElementById('candellNewAccountButton');
// update account
const confirmUpdateAccountButton = document.getElementById('confirmUpdateAccountButton');
const cancellUpdateAccountButton = document.getElementById('cancellUpdateAccountButton');
// === forms ===
const newAccountForm = document.getElementById("newAccountForm");
const updateAccountForm = document.getElementById("updateAccountForm");
// === inputs ===
// new account
const tfBeginBalance = document.getElementById("tfBeginBalance");
const tfCreditLine = document.getElementById("tfCreditLine");
const tfDescription = document.getElementById("tfDescription");
// update account
const tfUpdateCreditLine = document.getElementById("tfUpdateCreditLine");
const tfUpdateDescription = document.getElementById("tfUpdateDescription");
// === combo ===
const comboAccountType = document.getElementById("comboAccountType");
// === headers ===
// new account
const idNewAccountHeader = document.getElementById("idNewAccountHeader");
// delete account
const idDeleteAccountHeader = document.getElementById("idDeleteAccountHeader");
// update account
const idUpdateAccountHeader = document.getElementById("idUpdateAccountHeader");
// === GLOBAL ARRAY ===
/*
    OPERACIONES AGREGADAS USADAS 
              .sort()
              .push()
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
   These listeners triggers the handlers for the              ∎∎
   attributes taken from the form in                           ∎∎
   html/accounts.html when an event triggers caused            ∎∎
   by a modification on the form.                       ∎∎    ∎∎
                                                          ∎∎∎∎
   =================================================    
 */

// === buttons ===
// delete account
// the listener of the delete button on the table, 
// is created while the table is generated
confirmButton.addEventListener("click", deleteAccount);
denyButton.addEventListener("click", cancellDeleteAccount);
// new account
createNewAccountButton.addEventListener("click", showCreateAccountForm);
confirmNewAccountButton.addEventListener("click", handleCreateAccount);
candellNewAccountButton.addEventListener("click", cancellCreateAccount);
// update account
// the listener of the update button on the table, 
// is created while the table is generated
confirmUpdateAccountButton.addEventListener("click", handleUpdateAccount);
cancellUpdateAccountButton.addEventListener("click", cancellUpdateAccount);
// === combo ===
// new account
comboAccountType.addEventListener("change", checkSelectedValue);
// === inputs ===
// new account
tfBeginBalance.addEventListener("input", checkNewAccountBeginBalance);
tfCreditLine.addEventListener("input", checkNewAccountCreditLine);
tfDescription.addEventListener("input", checkNewAccountDescription);
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

async function handleDeleteAccount(event) {
    const accountID = event.target.dataset.accId;
    console.log("Borrar cuenta: " + accountID);
    var movementsError = false;
    try {
        // Checks if the account has movements
        // true: throw Error "La cuenta tiene movimientos, no puede ser borrada"
        // false: procceed
        if (await hasMovements(accountID)) {
            movementsError = true;
            throw new Error('La cuenta con ID: ('+ accountID +') tiene movimientos, no puede ser borrada');
        }
        // At this point the account doesn't have movements
        
        // Asks for a confirmation
        // true: procceed
        // false: throw Error "Se ha cancelado la eliminación de la cuenta"
        confirmationBoxAccounts.style.display = 'block';
        confirmationBoxAccounts.style.marginTop = "5px";
        confirmButton.setAttribute("data-acc-id", accountID);
        idDeleteAccountHeader.innerHTML = `¿Borrar cuenta con ID: ${accountID}?`;
        
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'flex';
        msgBoxAccounts.style.flexDirection = 'column';
        msgBoxAccounts.style.alignItems = 'center';
        if (movementsError) {
            const enlaceMovements = document.createElement("u");
            enlaceMovements.setAttribute("data-acc-id", accountID);
            enlaceMovements.innerHTML = "Ir a movimientos de la cuenta";
            enlaceMovements.style.color = "#5620ad";
            enlaceMovements.addEventListener("click", storeAccountData);
            msgBoxAccounts.appendChild(enlaceMovements);
        }
        console.error("Error al borrar la cuenta:", error.message);
    }
}

async function handleCreateAccount(event) {
    // check values
    // everything ok => call createAccount();
    // not everything ok => show error messages in msgBoxAccounts
    console.log("Crear nueva cuenta");
    if (checkNewAccountBeginBalance() &
        checkNewAccountDescription()) {
        // si la cuenta es de credito, que compruebe el CreditLine
        if (comboAccountType.value === "CREDIT") {
            if (checkNewAccountCreditLine()) {
                createAccount();
            }
        }
        // en este punto la cuenta no es de credito
        createAccount();
    } else {
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = "No todos los datos son correctos";
        msgBoxAccounts.style.display = 'flex';
        msgBoxAccounts.style.flexDirection = 'column';
        msgBoxAccounts.style.alignItems = 'center';
    }
}

async function handleUpdateAccount(event) {
    
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
 * @param {type} event
 * @returns {string} account type selected
 */
function checkSelectedValue(event) {
    const selectedAccountType = event.target.value;
    switch (selectedAccountType) {
        case "NotSelected":
            tfBeginBalance.setAttribute("hidden", true);
            tfCreditLine.setAttribute("hidden", true);
            tfDescription.setAttribute("hidden", true);
            confirmNewAccountButton.setAttribute("hidden", true);
            break;
        case "STANDARD":
            tfBeginBalance.removeAttribute("hidden");
            tfCreditLine.setAttribute("hidden", true);
            tfDescription.removeAttribute("hidden");
            confirmNewAccountButton.removeAttribute("hidden");
            break;
        case "CREDIT":
            tfBeginBalance.removeAttribute("hidden");
            tfCreditLine.removeAttribute("hidden");
            tfDescription.removeAttribute("hidden");
            confirmNewAccountButton.removeAttribute("hidden");
            break;
    }
    return selectedAccountType;
}


/*
 * Funcion que controla el valor introducido de salario
 * en el formulario impidiendo que sea menor a 0
 * 
 * @param {type} event
 * @returns {undefined}
 */
function checkNewAccountBeginBalance(event) {
    try {
        if (tfBeginBalance.value < 0) {
            // lanzar error e informar al usuario
            throw new Error("Saldo inicial inferior a 0");
        }
        if (regExpOnlyNumbers.exec(tfBeginBalance.value.trim())===null) {
            // lanzar error e informar al usuario
            throw new Error("Solo se admiten números en el saldo inicial");
        }
        msgBoxAccounts.innerHTML = "";
        return true; // Everything ok
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'flex';
        msgBoxAccounts.style.flexDirection = 'column';
        msgBoxAccounts.style.alignItems = 'center';
        return false; // Not everything ok
    }
}

function checkNewAccountCreditLine(event) {
    try {
        if (tfCreditLine.value < 0) {
            // lanzar error e informar al usuario
            throw new Error("Linea de crédito inferior a 0");
        }
        if (regExpOnlyNumbers.exec(tfCreditLine.value.trim())===null) {
            // lanzar error e informar al usuario
            throw new Error("Solo se admiten números en la línea de crédito");
        }
        msgBoxAccounts.innerHTML = "";
        return true; // Everything ok
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'flex';
        msgBoxAccounts.style.flexDirection = 'column';
        msgBoxAccounts.style.alignItems = 'center';
        return false; // Not everything ok
    }
}

function checkNewAccountDescription(event) {
    try {
        if (tfDescription.value.trim()==="") {
            // lanzar error e informar al usuario
            throw new Error("Incluye una descripción a la cuenta");
        }
        if (regExpHasToContainLetters.exec(tfDescription.value.trim())===null) {
            // lanzar error e informar al usuario
            throw new Error("La descripción debe contener letras");
        }
        msgBoxAccounts.innerHTML = "";
        return true; // Everything ok
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'flex';
        msgBoxAccounts.style.flexDirection = 'column';
        msgBoxAccounts.style.alignItems = 'center';
        return false; // Not everything ok
    }
}

function checkUpdateAccountCreditLine(event) {
    try {
        if (tfUpdateCreditLine.value < 0) {
            // lanzar error e informar al usuario
            throw new Error("Linea de crédito inferior a 0");
        }
        if (regExpOnlyNumbers.exec(tfUpdateCreditLine.value.trim())===null) {
            // lanzar error e informar al usuario
            throw new Error("Solo se admiten números en la línea de crédito");
        }
        msgBoxAccounts.innerHTML = "";
        return true; // Everything ok
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'flex';
        msgBoxAccounts.style.flexDirection = 'column';
        msgBoxAccounts.style.alignItems = 'center';
        return false; // Not everything ok
    }
}

/*
   =================================================          ∎∎∎∎∎∎
                                                            ∎∎      ∎∎
             CONFIRMATION & CANCELL ACTIONS                 ∎∎
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
    confirmationBoxAccounts.style.display = 'none';
}

function cancellCreateAccount(event) {
    newAccountForm.setAttribute("hidden", true);
    msgBoxAccounts.style.display = 'none';
}

function cancellUpdateAccount(event) {
    updateAccountForm.setAttribute("hidden", true);
    tfUpdateCreditLine.setAttribute("hidden", true);
    confirmUpdateAccountButton.setAttribute("hidden", true);
    // resetear valores
    tfUpdateCreditLine.value = "";
    tfUpdateDescription.value = "";
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
            headers: {
                "Accept": "application/json"
            }
            // Eliminado el body: JSON.stringify(), GET no permite cuerpo
        });

        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json(); // Importante retornar el JSON
    } catch (error) {
        console.error("Error al obtener cuentas:", error);
        return []; // Retorna un array vacío para evitar que el generador falle
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
            headers: {
                "Accept": "application/json"
            }
            // Eliminado el body: JSON.stringify(), GET no permite cuerpo
        });

        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json(); // Return the JSON of the full account
    } catch (error) {
        console.error("Error al obtener la cuenta:", error.message);
        // Returns null if no accounts were found related to the given ID
        return null;
    }
}

/*
 * Building function...
 * REMAINS: Everything
 * 
 * @returns {undefined}
 */
async function createAccount() {
    // generar id
    const newAccountID = accountsArray[accountsArray.length-1].id+1;
    // obtener fecha del sistema actual
    const date = new Date().toISOString();
    // controll credit line value
    var creditLine;
    if (tfCreditLine.value.trim() == "") {
        creditLine = 0;
    } else {
        creditLine = tfCreditLine.value.trim();
    }
    // crear objeto account = new Account
    const newAccount = new Account(
                                    newAccountID,
                                    tfDescription.value.trim(),
                                    tfBeginBalance.value.trim(),
                                    creditLine,
                                    tfBeginBalance.value.trim(),
                                    date,
                                    comboAccountType.value
                                );
    
    try {
        const response = await fetch(CREATE_SERVICE_URL, {
            method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newAccount)
        });

        if (!response.ok) throw new Error("Error en la petición");

        
        buildAccountsTable(); // Reloads the table
        // Informs the user account deleted successfully
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#5620ad";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = "Se ha creado la cuenta exitosamente";
        msgBoxAccounts.style.display = 'block';
        confirmationBoxAccounts.style.display = 'none';
        // ocultar formulario completo
        newAccountForm.setAttribute("hidden", true);
        tfBeginBalance.setAttribute("hidden", true);
        tfCreditLine.setAttribute("hidden", true);
        tfDescription.setAttribute("hidden", true);
        confirmNewAccountButton.setAttribute("hidden", true);
        // resetear valores de los campos
        comboAccountType.value = "NotSelected";
        tfBeginBalance.value = "";
        tfCreditLine.value = "";
        tfDescription.value = "";
        
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'block';
        console.error("Error al crear la cuenta:", error.message);
    }
}

/*
 * Building function...
 * REMAINS: Deletion confirmation <== !!! IMPORTANT !!!
 * 
 * @param {type} evt
 * @returns {undefined}
 */
async function deleteAccount(evt) {
    const accountID = evt.target.dataset.accId;
    try {        
        const response = await fetch(DELETE_SERVICE_URL +`${encodeURIComponent(accountID)}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error en la petición");

        
        buildAccountsTable(); // Reloads the table
        // Informs the user account deleted successfully
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#5620ad";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = "Se ha borrado la cuenta exitosamente";
        msgBoxAccounts.style.display = 'block';
        confirmationBoxAccounts.style.display = 'none';
        
    } catch (error) {
        // Informs to the user the errors
        msgBoxAccounts.innerHTML = "";
        msgBoxAccounts.style.color = "#ff0000";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = error.message;
        msgBoxAccounts.style.display = 'block';
        console.error("Error al borrar la cuenta:", error.message);
    }
}

/*
 * Building function...
 * 
 * @param {type} evt
 * @returns {undefined}
 */
async function updateAccount(evt) {
    const accountID = evt.target.dataset.accId;
    console.log("Editar cuenta: " + accountID);
    /*
        AÑADIR A CLASE ACCOUNT UN ATRIBUTO
        CUSTOMERS QUE SEA UN ARRAY DE
        OBJETOS CUSTOMER, ADEMAS CREAR
        toJSON() DE CUSTOMER Y HACER
        UN STRING GENERATIVO DE CUSTOMERS
        A LOS QUE PERTENECE LA CUENTA.
     */
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
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // formato 24h
                  };
                const newDateFormat = originalDateFormat.toLocaleDateString('es-ES', opciones);
                // Fecha formateada
                td.textContent = newDateFormat;
            } else if (field === "creditLine" || 
                  field === "beginBalance" ||
                  field === "balance" ) {
              const numberFormat = new Intl.NumberFormat("es-ES", 
                                                         { style: "currency", 
                                                           currency: "EUR" }).format(account[field]);
              td.textContent = numberFormat;
            } else {
                // Valor tal cual
                td.textContent = account[field];
            }
            // saves the account id for the button data attribute
            if (field === "id") {
                accID = account[field];
                // td simulating link color
                td.style.color = "#5620ad";
                // td id attributes
                td.setAttribute("data-acc-id", accID);
                // td listener
                td.addEventListener("click", storeAccountData);
            }
            tr.appendChild(td);
        });
        /*
         * Guardar al final del Array accountsArray objetos Account
         */
        accountsArray.push(new Account(
                                        account["id"],
                                        account["description"],
                                        account["balance"],
                                        account["creditLine"],
                                        account["beginBalance"],
                                        account["beginBalanceTimestamp"],
                                        account["type"]
                                        ));
        /*
         * Cuando termine el forEach, añadir en la sección "Acción"
         * los botones para editar y borrar esa cuenta para que estén
         * en la misma fila que la cuenta a la que están asociados.
         */
        // Create necessary HTML elements
        const tdButtons = document.createElement("td");
        const buttonEdit = document.createElement("button");
        const buttonDelete = document.createElement("button");
        // IMG
        buttonEdit.textContent = "EDIT";
        buttonDelete.textContent = "DEL";
        // Button id attributes
        buttonEdit.setAttribute("class", "btn-edit");
        buttonDelete.setAttribute("class", "btn-delete");
        // Button name attributes
        buttonEdit.setAttribute("name", "edit-button");
        buttonDelete.setAttribute("name", "delete-button");
        // Button aspect classes
        buttonEdit.setAttribute("data-acc-id", accID);
        buttonDelete.setAttribute("data-acc-id", accID);
        // Put buttons into td
        tdButtons.appendChild(buttonEdit);
        tdButtons.appendChild(buttonDelete);
        // Put td into tr
        tr.appendChild(tdButtons);
        // Show the table row
        yield tr;
    }
    // hace esto para que cuando se quiera crear un nuevo ID de 
    // cuenta, coja el más alto y asi no se pueda repetir
    accountsArray.sort((cuenta1, cuenta2) => cuenta1.id - cuenta2.id);
}

/**
 * Async function that calls the fetchAccounts function to get the
 * accounts of a customer ID passed by the session storage and
 * then returns nothing if there are no accounts or calls the
 * accountRowGenerator function to build the table for these
 * accounts and display the data.
 * 
 * @returns {undefined} nothing if no accounts where given
 */
async function buildAccountsTable() {
    const accounts = await getAccounts(); // Fetching accounts into const
    const tbody = document.querySelector("#contentAccounts");
    
    if (!tbody) return; // Security if the element doesn't exists in the DOM
    // Clean table before insert (just in case)
    tbody.innerHTML = "";

    const rowGenerator = accountRowGenerator(accounts);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
    // Recover the buttons into arrays
    let editButtons = document.getElementsByName("edit-button");
    let deleteButtons = document.getElementsByName("delete-button");
    // Set listeners into each button
    for (const editButton of editButtons) {
        editButton.addEventListener("click",showUpdateAccountForm);
    }
    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click",handleDeleteAccount);
    }
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
    // show new account form
    // pressed cancell button => call cancellCreateAccount();
    // pressed create button => call handleCreateAccount();
    newAccountForm.removeAttribute("hidden");
    // muestra el futuro id de la cuenta
    const newAccountID = accountsArray[accountsArray.length-1].id+1;
    idNewAccountHeader.innerHTML = `Futuro ID de cuenta: ${newAccountID}`;
}

function showUpdateAccountForm(event) {
    // show update account form
    // pressed cancell button => call cancellUpdateAccount();
    // pressed create button => call handleUpdateAccount();
    updateAccountForm.removeAttribute("hidden");
    // si el tipo de cuenta es x mostrar input o no
    const updateAccountID = event.target.dataset.accId;
    // mostrar el ID de la cuenta a actualizar
    idUpdateAccountHeader.innerHTML = `ID de cuenta a actualizar: ${updateAccountID}`;
    for (const account of accountsArray) {
        if (account.id == updateAccountID) {
            if (account.type === "CREDIT") {
                tfUpdateCreditLine.removeAttribute("hidden");
            }
            if (account.type === "STANDARD") {
                tfUpdateCreditLine.setAttribute("hidden", true);
            }
        }
    }
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

async function hasMovements(accountID) {
    const cuenta = await getAccountByID(accountID);
    if (cuenta.movements.length === 0) {
        return false;
    }
    return true;
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

function storeAccountData(event) {
    for (const account of accountsArray) 
        if (account.id == event.target.dataset.accId) 
            sessionStorage.setItem("account", account);
    window.location.href = 'movements.html'; // Redirect a movimientos.html
}
