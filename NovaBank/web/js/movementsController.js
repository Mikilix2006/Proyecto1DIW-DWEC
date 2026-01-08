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


/*
   =================================================
         LISTENERS FOR HANDLING EVENTS ON HTML
   =================================================
 */

/*
   =================================================
       EVENT HANDLERS CALLED FROM THE LISTENERS
   =================================================
 */


/*
   =================================================
                   OTHER FUNCTIONS
   =================================================
 */

/**
* Fetch users in XML format
*/
const idUser = "2654785441";
const SERVICE_URL = "/CRUDBankServerSide/webresources/movement/account/";

async function fetchMovements() {
    try {
        const response = await fetch(SERVICE_URL +`${encodeURIComponent(idUser)}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
            // Eliminado el body: JSON.stringify(), GET no permite cuerpo
        });

        if (!response.ok) throw new Error("Error en la petición");
        
        return await response.json(); // Importante retornar el JSON
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        return []; // Retorna un array vacío para evitar que el generador falle
    }
}

/**
 * Generator function that yields table rows
 */
function* movementRowGenerator(movements) {
    for (const movement of movements) {
        const tr = document.createElement("tr");
        // Corregido "tiemstamp" a "timestamp" (asumiendo que así viene del servidor)
        ["id", "type", "amount", "balance", "timestamp", "description"].forEach(field => {
            const td = document.createElement("td");
            td.textContent = movement[field] ?? "N/A"; // Evita valores vacíos
            tr.appendChild(td);
        });
        yield tr;
    }
}

async function buildMovementsTable() {
    const movements = await fetchMovements(); // Cambiado 'users' por 'movements'
    const tbody = document.querySelector("#contentMovements");
    
    if (!tbody) return; // Seguridad si el elemento no existe en el DOM
    
    // Limpiar tabla antes de insertar (opcional)
    tbody.innerHTML = "";

    const rowGenerator = movementRowGenerator(movements);
    for (const row of rowGenerator) {
        tbody.appendChild(row);
    }
}

// Llamada al cargar la página
buildMovementsTable();