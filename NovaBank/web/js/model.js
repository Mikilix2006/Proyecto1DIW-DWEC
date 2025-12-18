/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class AccountController {
    //constructor
    constructor (id, description, balance, creditLine, beginBalance, beginBalanceTimestamp, type) {
        this.id = id;
        this.description = description;
        this.balance = balance;
        this.creditLine = creditLine;
        this.beginBalance = beginBalance;
        this.beginBalanceTimestamp = beginBalanceTimestamp;
        this.type = type;
    }
    //getters
    get id() {
        return this.id;
    }
    //methods
    /*
       =================================================

            METHODS OF THE CLASS ACCOUNTCONTROLLER

       -------------------------------------------------

       Executes every CRUD action and throws exceptions
       in case the method didn't succeed.
       
       Possible HTTP responses:
       -> 500 = Server not avalible or the ID of the
                new account already exists (POST)
       -> 200 = The GET method returned data (json)
       -> 204 = Everything went well (POST, PUT, DELETE)
    
       · METHOD: getAccountsByCustomerID(customerID)
            ~ @param {number} customerID is the
                ID from which all the accounts will
                be taken.
            ~ @returns {Map()} with a structure like:
                -> key = account.id
                -> value = AccountController
            ~ @throws {Error} with the message if the 
                server side returns a 500.
            ~ Takes the customerID from the parameters
                and searches for all accounts that
                are related to that specific customerID
                saving the accountID in the key of a
                Map() and the actual account on the
                value.
                The method uses a GET request to
                search for all the accounts.
            ~ Usable by: Admin & User
    
       · METHOD: createAccount(account)
            ~ @param {AccountController} account is 
                the account that the user wants to be 
                created in the server side (POST).
            ~ @returns {Map()} returns the updated Map() 
                if the account has successfuly been 
                created in the server side.
            ~ @throws {Error} with the message if the 
                server side returns a 500.
            ~ Takes the customer data from the
                sessionStorage and the account passed
                by parameter and creates a structure
                in json to be sent by a POST.
                It also calls the 
                getAccountsByCustomerID method to 
                update the Map() and return it.
            ~ Usable by: Admin
    
       · METHOD: updateAccount(updatedAccount)
            ~ @param {AccountController} updatedAccount 
                is the new account that is going to
                replace the old one.
            ~ @returns {Map()} returns the updated Map() 
                if the account has successfuly been 
                updated in the server side.
            ~ @throws {Error} with the message if the 
                server side returns a 500.
            ~ Takes the customer data from the
                sessionStorage and the account passed
                by parameter and creates a structure
                in json to be sent by a POST.
                It also calls the 
                getAccountsByCustomerID method to update
                the Map().
            ~ Usable by: Admin & User
    
       · METHOD: deleteAccount(accountID)
            ~ @param {number} accountID is the ID of 
                the account that is going to be deleted.
            ~ @returns {Map()} returns the updated Map() 
                if the account has successfuly been 
                deleted in the server side.
            ~ @throws {Error} with the message if the 
                server side returns a 500.
            ~ Takes the account ID and checks if it is
                empty (of movements) and if so, it deletes
                the account, if it still has movements,
                will advice the admin and tell him why he
                couldn't delete the account.
                It also calls the 
                getAccountsByCustomerID method to update
                the Map().
            ~ Usable by: Admin

       =================================================
     */
    getAccountsByCustomerID(customerID) {
        // coger referencia de capa para mensaje 
        // de informacion al usuario
        //const msgBoxAccounts = document.getElementById('msgBoxAccounts');
        var map = new Map();
        
        fetch("/CRUDBankServerSide/webresources/account",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(account)   <===   ???
            }).then(response => {
                // PROCESADO DE RESPUESTA 500
                if (response.status===500) {
                    return response.text().then(text => {
                        throw new Error("An error happend, try again and if the error persists, try again later");
                    }); // Fin del return
                } // Fin del if
                // PROCESADO DE RESPUESTA DESCONOCIDA
                // Ha habido un error inesperado
                else if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text || "An unknown error happend");
                    }); // Fin del return
                } // Fin del if
                return response;
            })
            // PROCESAR RESPUESTA OK
                .then(data => {
                    // Guardamos datos de en sesion
                    //guardarDatosSeison(mail.value.trim());
                    //msgBoxAccounts.style.color = "#5620ad";
                    //msgBoxAccounts.textContent = "Account created successfuly.";
                    //msgBoxAccounts.style.display = 'block';
                    //window.location.href = 'movements.html';
                    
                    // RECORRER DATA Y GUARDARLO EN UN MAP PARA RETORNARLO
                    for (const account of data['account']) {
                        map.set(account['id'], 
                                new AccountController(account['id'],
                                            account['description'],
                                            account['balance'],
                                            account['creditLine'],
                                            account['beginBalance'],
                                            account['beginBalanceTimestamp'],
                                            account['type']));
                    }
                    return map;
            })
            // MOSTRAR ERRORES
                .catch(e => {
//                    msgBoxAccounts.style.color = "#ff0000";
//                    msgBoxAccounts.textContent = "Error: " + e.message;
//                    msgBoxAccounts.style.display = 'block';
            });
    }
    createAccount(account) {
        // coger referencia de capa para mensaje 
        // de informacion al usuario
        const msgBoxAccounts = document.getElementById('msgBoxAccounts');
        
        fetch("/CRUDBankServerSide/webresources/account",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            }).then(response => {
                // PROCESADO DE RESPUESTA 500
                if (response.status===500) {
                    return response.text().then(text => {
                        throw new Error("An error happend, try again and if the error persists, try again later");
                    }); // Fin del return
                } // Fin del if
                // PROCESADO DE RESPUESTA DESCONOCIDA
                // Ha habido un error inesperado
                else if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text || "An unknown error happend");
                    }); // Fin del return
                } // Fin del if
                return response;
            })
            // PROCESAR RESPUESTA OK
                .then(data => {
                    // Guardamos datos de en sesion
                    //guardarDatosSeison(mail.value.trim());
                    msgBoxAccounts.style.color = "#5620ad";
                    msgBoxAccounts.textContent = "Account created successfuly.";
                    msgBoxAccounts.style.display = 'block';
                    //window.location.href = 'movements.html';
                    const customerID= sessionStorage.getItem("curtomerID");
                    if (customerID !== null) {
                        return getAccountsByCustomerID(customerID);
                    }
            })
            // MOSTRAR ERRORES
                .catch(e => {
                    msgBoxAccounts.style.color = "#ff0000";
                    msgBoxAccounts.textContent = "Error: " + e.message;
                    msgBoxAccounts.style.display = 'block';
            });
    }
    updateAccount(updatedAccount) {
        // Key: the updatedAccount should have 
        // it's ID, to update it easly
        
    }
    deleteAccount(accountID) {
        
    }
}
