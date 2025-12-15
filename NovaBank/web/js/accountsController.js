/* 
   ================================================
   
    THIS JS FILE IS IN CHARGE OF THE BEHAVIOUR OF
    THE ACCOUNTS SECTION LOCATED IN accounts.html
   
   -----------------------------------------------
   
   The file includes the recovery of the accounts
   that is going to be setted on a Map.
   
   Then the accounts of a given Customer ID passed
   by the sessionStorage, will be displayed on a
   modificable table on html/accounts.html.
   
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
   html/accounts.html to be handled later by the
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
   -> value = account (the object)

   To add all the accounts to the Map() we will use
   a for that runs over all the accounts recieved
   by the fetch method and the GET request and
   are going to be given in JSON format.
   
   =================================================
 */

const reference1 = document.getElementById('elementId');

var accountsMap = new Map();

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

reference1.addEventListener('element',handleReferencia1OnEvent);

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