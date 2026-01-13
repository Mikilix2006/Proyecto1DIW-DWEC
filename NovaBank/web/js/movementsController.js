/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
   =================================================
      ATTRIBUTES TO BE USED BY THIS CONTROLLER
   =================================================
 */
const idAccount = "100000001"; //sacar el id del account del session storage
const idMovementAcc = "14"; //sacar el 

const SERVICE_URL_MOV= "/CRUDBankServerSide/webresources/movement/";
const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/;
const addMovementBtn = document.getElementById("addMovement");
const deleteMovementBtn = document.getElementById("deleteLastMovement");
var movements = [];
/*
   =================================================
         LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
 */
//This listener load the R procedure of the app. Show all the movements of the current acount
window.addEventListener('load', buildMovementsTable);
//Adding and deleting confirm listeners, trigger by click action
addMovementBtn.addEventListener('click', createNewMovement);
deleteMovementBtn.addEventListener('click', deleteLastMovement);

/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */
async function buildMovementsTable() {
    movements = await fetchMovements(); //Estos datos se declara de forma global
    const tbody = document.querySelector("#contentMovements");
    
    if (!tbody) return; //AGREGAR MENSAJE QUE NO HAY MOVIMIENTOS
    tbody.innerHTML = "";

    const rowGenerator = movementRowGenerator(movements);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}

async function createNewMovement() {
    try {
        const fechaActual = new Date().toISOString(); 
        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idAccount)}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ //SACAR ESTO y hacer una palntilla de insersión
                "amount": 100.0,
                "balance": 400.0,
                "description": "Deposit",
                "timestamp": fechaActual
            })
        });

        if (!response.ok) throw new Error("Error en la petición");
        
        // Refrescar la tabla tras añadir uno nuevo
        await buildMovementsTable(); 

    } catch (error) {
        console.error("Error al crear movimiento:", error);
    }
}

async function deleteLastMovement() {
    const deleteMovId = movements[(movements.length)-1].id; //This store the last movement id
    try {
        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(deleteMovId)}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        });
        if (!response.ok) throw new Error("Error en el borrado");  //TENGO QUE ACTUALIZAR EL VALOR DE account
        
        buildMovementsTable(); 
        return; 
        
    } catch (error) {
        console.error("Error al eliminar el movimiento:", error);
    }
}

/*
   =================================================
                   OTHER FUNCTIONS
   =================================================
 */
//Functions related to generate and load movementss content
async function fetchMovements() {
    try {
        const response = await fetch(`${SERVICE_URL_MOV}account/${encodeURIComponent(idAccount)}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json();   
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        return []; 
    }
}

// Formato día/mes/año hora
function* movementRowGenerator(movements) {
    for (const movement of movements) {
        const tr = document.createElement("tr");
        
        ["timestamp", "description", "amount", "balance"].forEach(field => {
            const td = document.createElement("td");
            let value = movement[field] ?? "N/A";

            if (field === "timestamp" && value !== "N/A") {
                const match = value.match(isoRegex);
                if (match) {
                    // Formato día/mes/año hora
                    value = `${match[3]}/${match[2]}/${match[1]} ${match[4]}`;
                }
            }
            
            // Opcional: Estilo para números negativos en el monto
            if (field === "amount" && parseFloat(value) < 0) {
                td.style.color = "red";
            }

            td.textContent = value;
            tr.appendChild(td);
        });
        yield tr;
    }
}
/*
//tengo que tener un modelo de cuentas const accountBalance = ;
//Update function to use after delete the last account
//This function calls an resource that is not directly related to Movements.
async function updateBalanceByMovements() {
    const updateBalance = {
        id: ,
        description: ,
        balance:,
               
    };
    try {
        const response = await fetch(`/CRUDBankServerSide/webresources/account`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:{
                
            }
        });
        if (!response.ok) throw new Error("Error en el borrado");  //TENGO QUE ACTUALIZAR EL VALOR DE account
        //account.name sessionstorage
        
        buildMovementsTable(); 
        //return await response.json(); 
        
    } catch (error) {
        console.error("Error al eliminar el movimiento:", error);
    }
}*/
