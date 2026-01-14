/* 
   ================================================
   
    THIS JS FILE IS IN CHARGE OF THE BEHAVIOUR OF
      THE ACCOUNTS SECTION LOCATED IN main.html
   
   -----------------------------------------------
   
   The file includes the recovery of the accounts
   that are going to be setted on an Array.
   
   Then the accounts of a given Customer ID passed
   by the sessionStorage, will be displayed on a
   modificable table on html/main.html.
   
   The user can add, delete or modify data from
   that table and it will be checked in this file
   and posted, putted or deleted on the database.
   
   <·> <·> <·> <·> <·> <·> <·> <·> <·> <·> <·> <·> 
   
   AUTHOR: Miguel González Delgado
   CREATION DATE: 2025-12-5 9:08 UTC+01
   
   ================================================
 */

/*
 
  ∎∎∎∎∎∎∎∎∎ ∎∎∎∎∎∎∎       ∎∎∎∎∎   ∎∎∎∎∎∎∎
      ∎     ∎     ∎       ∎    ∎  ∎     ∎
      ∎     ∎     ∎       ∎     ∎ ∎     ∎
      ∎     ∎     ∎       ∎     ∎ ∎     ∎
      ∎     ∎     ∎       ∎     ∎ ∎     ∎
      ∎     ∎     ∎       ∎    ∎  ∎     ∎
      ∎     ∎∎∎∎∎∎∎       ∎∎∎∎∎   ∎∎∎∎∎∎∎

    -> TAREA 1: LISTENERS DE TR
       · Añadir listener a cada table row.
       · Al hacer click a un table row:
         - Guardar los datos de la cuenta
           de esa table row en la sesión.
         - Redirigir a la página de
           movimientos en caso de que
           esa cuenta tenga movimientos.

    -> TAREA 2: CREAR CLASE ACCOUNT
       · Crear constructor con los
         atributos [id, description, 
         balance, creditLine, beginBalance,
         beginBalanceTimestamp, type, 
         movements, customers] donde
         movements será un array
         que contenga objetos Movements
         y customers será un objeto de
         la clase Customers.
       · Crear métodos de la clase.

    -> TAREA 3: INSTANCIAR ACCOUNTS
       · Durante la generación de filas
         instanciar los datos de todas
         las cuentas en objetos de la  
         clase Account.
       · Introducir cada instanciación
         en el Array global accountsArray.

    -> TAREA 4: DELETE ACCOUNT
       · Crear confirmación para la
         eliminación de una cuenta.
    
    -> TAREA 5: CREATE ACCOUNT
       · Codificar creación de una cuenta.

    -> TAREA 6: UPDATE ACCOUNT
       · Codficar actualización de una
         cuenta desde la tabla de cuentas.

    -> TAREA 7: DOCUMENTAR
       · Documentar métodos de este script.
       · Documentar métodos de las clases.
       · Documentar de nuevo las secciones
         de este script.

    -> TAREA 8: REORDENAR
       · Reordenar métodos de este script
         en sus respectivas secciones.

 */

/*
   =================================================
   
       ATTRIBUTES TO BE USED BY THIS CONTROLLER
       
   -------------------------------------------------
   
   Takes the necessary elements from
   html/main.html to be handled later by the
   event handlers.
   
   All the elements on the html/main.html that 
   need to be handled, have an id called like 
   it's name attribute.
   
   Each of those elements are going to have an
   instance with the element content taken by
   the methods reference.getElementById() and
   reference.getElementsByTagName().
   
   DEPRECATED
   Also a Map() will be instanced to contain
   all the Accounts of the given Costumer ID.

   DEPRECATED
   The Map() structure is:
   -> key = account.id
   -> value = AccountController
    
   DEPRECATTED
   To add all the accounts to the Map() we will use
   a for that runs over all the accounts recieved
   by the fetch method and the GET request and
   are going to be given in JSON format.
   
   =================================================
 */
// Call when page loaded all the elements
document.addEventListener("DOMContentLoaded", buildAccountsTable);

// fetch resources
const GET_ALL_SERVICE_URL = "/CRUDBankServerSide/webresources/account/customer/";
const GET_BY_ID_SERVICE_URL = "/CRUDBankServerSide/webresources/account/";
const DELETE_SERVICE_URL = "/CRUDBankServerSide/webresources/account/";

/*
        ESTRUCTURA DEL XML PARA CREAR UNA CUENTA ASOCIADA A UN CUSTOMER
        <account>
            <balance>999.99</balance>
            <beginBalance>999.99</beginBalance>
            <beginBalanceTimestamp>2019-01-14T19:19:04+01:00</beginBalanceTimestamp>
            <creditLine>0.0</creditLine>
            <customers>
                <city>New York</city>
                <email>jsmith@enterprise.net</email>
                <firstName>John</firstName>
                <id>102263301</id>
                <lastName>Smith</lastName>
                <middleInitial>S.</middleInitial>
                <password>abcd*1234</password>
                <phone>15556969699</phone>
                <state>New York</state>
                <street>163rd St.</street>
                <zip>10032</zip>
            </customers>
            <movements>
                <amount>100.0</amount>
                <balance>100.0</balance>
                <description>Deposit</description>
                <id>6</id>
                <timestamp>2019-02-02T16:56:44+01:00</timestamp>
            </movements>
            <movements>
                <amount>100.0</amount>
                <balance>200.0</balance>
                <description>Deposit</description>
                <id>7</id>
                <timestamp>2019-02-02T16:57:40+01:00</timestamp>
            </movements>
            <description>Cuenta de prueba 1</description>
            <id>1111111111</id>
            <type>STANDARD</type>
       </account>
*/

sessionStorage.setItem("account.balance", "999.99");
sessionStorage.setItem("account.beginBalance", "999.99");
sessionStorage.setItem("account.beginBalanceTimestamp", "2019-01-14T19:19:04+01:00");
sessionStorage.setItem("account.creditLine", "0.0");
sessionStorage.setItem("account.customers", "New York");
sessionStorage.setItem("account.description", "Cuenta de prueba 1");
sessionStorage.setItem("account.id", "1234567899");
sessionStorage.setItem("account.type", "STANDARD");
sessionStorage.setItem("account.customers.city", "New York");
sessionStorage.setItem("account.customers.email", "jsmith@enterprise.net");
sessionStorage.setItem("account.customers.firstName", "John");
sessionStorage.setItem("account.customers.id", "102263301");
sessionStorage.setItem("account.customers.lastName", "Smith");
sessionStorage.setItem("account.customers.middleInitial", "S.");
sessionStorage.setItem("account.customers.password", "abcd*1234");
sessionStorage.setItem("account.customers.phone", "15556969699");
sessionStorage.setItem("account.customers.state", "New York");
sessionStorage.setItem("account.customers.street", "163rd St.");
sessionStorage.setItem("account.customers.zip", "10032");
// keep the customer data in constants
const idCustomer = sessionStorage.getItem("account.customers.id");
// user info message box
const msgBoxAccounts = document.getElementById('msgBoxAccounts');
// Array that contains objects AccountController
var accountsArray = [];

/*
   =================================================
   
         LISTENERS FOR HANDLING EVENTS ON HTML
         
   -------------------------------------------------
   
   These listeners triggers the handlers for the
   attributes taken from the form in 
   html/accounts.html when an event triggers caused 
   by a modification on the form.
   
   =================================================
 */

//reference1.addEventListener('element',handleReferencia1OnEvent);

/*
   =================================================
   
       ENEVT HANDLERS CALLED FROM THE LISTENERS
   
   -------------------------------------------------
       
   These functions are the triggered handlers from
   the event listeners.

   
   
   =================================================
 */

function handleReferencia1OnEvent() {
    // handler
}

/*
   =================================================
   
                    CRUD FUNCTIONS
   
   -------------------------------------------------
       
   These functions fetch resources in the server
   side.

   The funcitons create, recover, update or delete
   accounts.

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
        
        return await response.json(); // Return the json os the full account
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
    // 
    const account = {
        balance: 200.0,
        beginBalance: 200.0,
        beginBalanceTimestamp:"2025-12-14T19:28:28+01:00",
        creditLine:500.0,
        description:"Cuenta de prueba 1",
        id:0123456789, // 10 digit-generated number
        //movements:[], no movements in new accounts
        type:"CREDIT"
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
    console.log("Borrar cuenta: " + accountID);
    try {
        // Checks if the account has movements
        // true: throw Error "La cuenta tiene movimientos, no puede ser borrada"
        // false: procceed
        if (await hasMovements(accountID)) throw new Error("La cuenta con ID: ("+ accountID +") tiene movimientos, no puede ser borrada");
        // At this point the account doesn't have movements
        const response = await fetch(DELETE_SERVICE_URL +`${encodeURIComponent(accountID)}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error en la petición");

        // Asks for a confirmation
        // true: procceed
        // false: throw Error "Se ha cancelado la eliminación de la cuenta"
        
        buildAccountsTable(); // Reloads the table
        // Informs the user account deleted successfully
        msgBoxAccounts.style.color = "#5620ad";
        msgBoxAccounts.style.marginTop = "5px";
        msgBoxAccounts.textContent = "Se ha borrado la cuenta exitosamente";
        msgBoxAccounts.style.display = 'block';
        
    } catch (error) {
        // Informs to the user the errors
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
}

/*
   =================================================
   
                   OTHER FUNCTIONS
   
   -------------------------------------------------
       
   These functions 
   
   =================================================
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
            td.textContent = account[field]; // Evita valores vacíos
            tr.appendChild(td);
            // saves the account id for the button data attribute
            if (field === "id") accID = account[field];
        });
        /*
         * Guardar en el Array accountsArray objetos AccountController
         * 
         */
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
        buttonEdit.setAttribute("data-acc-id", accID);
        buttonDelete.setAttribute("data-acc-id", accID);
        // Button name attributes
        buttonEdit.setAttribute("name", "edit-button");
        buttonDelete.setAttribute("name", "delete-button");
        // Table row listener
        // tr.addEventListener("click", goToMovementsPage)
        // Put buttons into td
        tdButtons.appendChild(buttonEdit);
        tdButtons.appendChild(buttonDelete);
        // Put td into tr
        tr.appendChild(tdButtons);
        // Show the table row
        yield tr;
    }
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
        editButton.addEventListener("click",updateAccount);
    }
    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click",deleteAccount);
    }
}

async function hasMovements(accountID) {
    const cuenta = await getAccountByID(accountID);
    if (cuenta.movements.length === 0) {
        return false;
    }
    return true;
}