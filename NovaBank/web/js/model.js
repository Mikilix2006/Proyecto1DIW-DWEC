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

                 METHODS OF THE CLASS ACCOUNT

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
                -> value = account (the object)
            ~ @throws {Error} with the message if the 
                server side returns a 500.
    
       · METHOD: createAccount(account)
            ~ @param {Account} account is the
                account that the user wants to be 
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
                getAccountsByCustomerID method to update
                the Map().

       =================================================
     */
    getAccountsByCustomerID(customerID) {
        // usable by: Admin & User
        
    }
    createAccount() {
        
    }
    updateAccount(updatedAccount) {
        // usable by: Admin & User
        
    }
    deleteAccount(accountID) {
        // check if the account is empty (of movements) and if so,
        // delete the account, else, advice the admin why he
        // couldn't delete his account
        
        // usable by: Admin
    }
}
