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
const idUser = "3252214522"; //id de prueba
const idAccount = "3252214522"; //sacar el id del account del session storage
const SERVICE_URL_MOV= "/CRUDBankServerSide/webresources/movement/";
const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/;
const addMovement = document.getElementById("addMovement");

/*
   =================================================
         LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
 */
//This listener load the R procedure of the app. Show all the movements of the current acount
window.addEventListener('load',buildMovementsTable());
document.addEventListener('click',createNewMovement());

/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */
async function buildMovementsTable() {
    const movements = await fetchMovements();
    const tbody = document.querySelector("#contentMovements");
    
    if (!tbody) return;
    tbody.innerHTML = "";

    const rowGenerator = movementRowGenerator(movements);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}
/*
async function createNewMovement(){
    try {
        var fechaMov = Date.now();
        const response = await fetch(SERVICE_URL_MOV +`${encodeURIComponent(idAccount)}`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify({
            "amount":100.0,
            "balance":500.0,
            "description":"Deposit",
            "timestamp":`${fechaMov}`
            })
        });

        if (!response.ok) throw new Error("Error en la petición");
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
    }
}*/

/*
   =================================================
                   OTHER FUNCTIONS
   =================================================
 */
/*Functions related to generate and load movements`s content*/
async function fetchMovements() {
    try {
        const response = await fetch(SERVICE_URL_MOV +`+account/${encodeURIComponent(idUser)}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json(); // Importante retornar el JSON
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        return []; // Retorna un array vacío para evitar que el generador falle
    }
}
//Generator function that yields table rows
function* movementRowGenerator(movements) {
    for (const movement of movements) {
        const tr = document.createElement("tr");
        
        ["timestamp", "description", "amount", "balance"].forEach(field => {
            const td = document.createElement("td");
            let value = movement[field] ?? "N/A";

            if (field === "timestamp" && value !== "N/A") {
                const match = value.match(isoRegex);
                if (match) {
                    value = `${match[3]}/${match[2]}/${match[1]} ${match[4]}`;
                }
            }
            td.textContent = value;
            tr.appendChild(td);
        });
        yield tr;
    }
}