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
const addMovementBtn = document.getElementById("addMovement");
const deleteMovementBtn = document.getElementById("deleteLastMovement");

/*
   =================================================
         LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
 */
//This listener load the R procedure of the app. Show all the movements of the current acount
window.addEventListener('load', buildMovementsTable);
// O mejor aún, para el botón específico:
addMovementBtn.addEventListener('click', createNewMovement);

/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */
async function buildMovementsTable() {
    const movements = await fetchMovements(idUser); //AQUÍ ESTÁN LOS DATOS. NECESITAMOS HACERLO GLOBAL
    const tbody = document.querySelector("#contentMovements");
    
    if (!tbody) return;
    tbody.innerHTML = "";

    const rowGenerator = movementRowGenerator(movements);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}

async function createNewMovement() {
    try {
        // El servidor suele esperar formato ISO, no un timestamp de milisegundos
        const fechaActual = new Date().toISOString(); 

        const response = await fetch(`${SERVICE_URL_MOV}${encodeURIComponent(idAccount)}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" // Imprescindible para enviar JSON
            },
            body: JSON.stringify({
                "amount": 100.0,
                "balance": 700.0,
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

function deleteLastMovement() {
    try{
        fetchMovements(17);
    }catch{
        
    }
}

/*
   =================================================
                   OTHER FUNCTIONS
   =================================================
 */
/*Functions related to generate and load movements`s content*/
async function fetchMovements(id) {
    try {
        // Corregida la concatenación de la URL (eliminado el '+' literal)
        const response = await fetch(`${SERVICE_URL_MOV}account/${encodeURIComponent(id)}`, {
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