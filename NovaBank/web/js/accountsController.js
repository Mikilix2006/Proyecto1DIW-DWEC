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
   =================================================
   
       ATTRIBUTES TO BE USED BY THIS CONTROLLER
       
   -------------------------------------------------
   
   Takes the necessary elements from
   html/main.html to be handled later by the
   event handlers.
   
   All the elements on the html/accounts.html that 
   need to be handled, have an id called like 
   it's name.
   
   Each of those elements are going to have an
   instance with the element content taken by
   the method reference.getElementById().
   
   Also a Map() will be instanced to contain
   all the Accounts of the given Costumer ID.

   The Map() structure is:
   -> key = account.id
   -> value = AccountController

   To add all the accounts to the Map() we will use
   a for that runs over all the accounts recieved
   by the fetch method and the GET request and
   are going to be given in JSON format.
   
   =================================================
 */

// fetch resources
const SERVICE_URL = "/CRUDBankServerSide/webresources/account/customer/";

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
            <id>1234567899</id>
            <type>STANDARD</type>
       </account> 
*/

sessionStorage.setItem("account.account", "999.99");
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

const idCustomer = sessionStorage.getItem("account.customers.id");

// user info message box
const msgBoxAccounts = document.getElementById('msgBoxAccounts');

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
   
                   OTHER FUNCTIONS
   
   -------------------------------------------------
       
   These functions 
   
   =================================================
 */


async function fetchAccounts() {
    try {
        const response = await fetch(SERVICE_URL +`${encodeURIComponent(idCustomer)}`, {
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

async function createAccount() {
    const account = {
        balance: 200.0,
        beginBalance: 200.0,
        beginBalanceTimestamp:"2025-12-14T19:28:28+01:00",
        creditLine:500.0,
        description:"Cuenta de prueba 1",
        id:0123456789,
        movements:[],
        type:"CREDIT"
    }
    
    
}


function* accountRowGenerator(accounts) {
    for (const account of accounts) {
        const tr = document.createElement("tr");
        var accID;
        // Corregido "tiemstamp" a "timestamp" (asumiendo que así viene del servidor)
        ["id", "type", "description", "creditLine", "beginBalanceTimestamp", "beginBalance", "balance"].forEach(field => {
            const td = document.createElement("td");
            td.textContent = account[field]; // Evita valores vacíos
            tr.appendChild(td);
            // saves the account id for the button data attribute
            if (field === "id") accID = account[field];
        });
        
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
        buttonEdit.textContent = accId;
        buttonDelete.textContent = "IMG2";
        
        tdButtons.appendChild(buttonEdit);
        tdButtons.appendChild(buttonDelete);
        
        tr.appendChild(tdButtons);
        
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
    const accounts = await fetchAccounts(); // Fetching accounts into const
    const tbody = document.querySelector("#contentAccounts");
    
    if (!tbody) return; // Security if the element doesn't exists in the DOM
    
    // Clean table before insert (just in case)
    tbody.innerHTML = "";

    const rowGenerator = accountRowGenerator(accounts);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}

// Call when loading page
buildAccountsTable();
