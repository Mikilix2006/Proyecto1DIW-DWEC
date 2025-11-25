/*
 * MODIFICACIONES EVALUACIÓN
Realizar las siguientes modificaciones sobre el código de su aplicación. 
Las modificaciones se realizarán sobre una rama llamada eval_NOMBRE 
(donde NOMBRE es su propio nombre) creada a partir del último commit 
de su rama principal:

Mediante el uso del método getElementsByTagName de la interfaz Document, 
cambiar la propiedad de estilo font-weight de todos los BUTTON  al valor 300. 
Hacerlo en el onload del BODY.

Pedir datos en JSON en el fetch.

Al finalizar, generar y entregar el nuevo archivo .WAR
*/
function Customer(id, firstName, lastName, middleInitial, street, city, state, zip, phone, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleInitial = middleInitial;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.email = email;
    this.password = password;
}
//FUNCIÓN PARA VALIDAR SIGN IN - MANEJO DE ERRORES INPUT
function validarSignIn(event) {
        try{
            //CAPTURA DE LA INFORMACIÓN FROM FORM
            const emailInput = document.getElementById("tfEmail");
            const passwordInput = document.getElementById("tfPassword");
            const signForm = document.getElementById("formulario");
            //EXPRESIONES REGULARES PARA VALIDACIÓN
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const regexPassword = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ!#$%&*]*$/;
            //CAPTURA DE ERRORES EN EL HTML
            const errorEmail = document.getElementById("errorEmail");
            const errorPassword = document.getElementById("errorPassword");
            //EVITAR LA PROPAGACIÓN
            event.preventDefault();
            event.stopPropagation();
            //CHIVATO ERRORES
            let errores=false;
            if (emailInput.value.trim() === "" || passwordInput.value.trim() === ""){
                emailInput.classList.add("input-error");
                passwordInput.classList.add("input-error");
                errores=true;
                throw new Error('Por favor complete todos los campos');
            }
            //vALIDACIÓN CORREO 
            if (emailInput.value.length > 255) {
                errorEmail.textContent = "El correo electrónico no puede superar los 255 caracteres.";
                emailInput.classList.add("input-error");
                errores=true;
            }
            if (!regex.test(emailInput.value.trim())){
                errorEmail.textContent = "La dirección de correo electrónico no es válida. (Ej. javi@javi.com)";
                emailInput.classList.add("input-error");
                errores=true;
            }
            //VALIDACIÓN CONTRASREÑA
            if (passwordInput.value.length > 50){
                errorPassword.textContent="La contraseña no puede superar los 50 caracteres.";
                passwordInput.classList.add("input-error");
                errores=true;
            }
            if (!regexPassword.test(passwordInput.value.trim())){
                errorPassword.textContent="Valores no permitidos.";
                passwordInput.classList.add("input-error");
                errores=true;  
            }
            if(errores) return;
            //ENVIAR Y POSIBLES RESPUESTAS
            sendRequestAndProcessResponse();
            
        }catch(e){
            const msgBox = document.getElementById("responseMsg");
            msgBox.className = 'error';
            msgBox.textContent = e.message;
            msgBox.style.display = 'block';
        }
}
//FUNCICIÓN QUE ENVIA Y ESPERA RESPUESTAS
function sendRequestAndProcessResponse(){
    const signForm = document.getElementById("formulario");
    const msgBox = document.getElementById("responseMsg");
    const emailInput = document.getElementById("tfEmail");
    const passwordInput = document.getElementById("tfPassword");
    const valueEmail=emailInput.value.trim();
    const valuePassword=passwordInput.value.trim();
    //Send Request using fetch API (window.fetch method)
    fetch(signForm.action + `${encodeURIComponent(valueEmail)}/${encodeURIComponent(valuePassword)}`, 
                    {
                        method: 'GET',
                        headers: {
                          //'Content-Type': 'application/xml'
                          //CONTENTTYPE JSON
                          'Content-Type': 'application/json'
                        }
                    }).then(response => {
      if (response.status === 401) {
        throw new Error("¡Ups! Parece que la dirección de correo o la contraseña no coinciden con un usuario existente.");
      } else if (response.status === 500) {
        throw new Error("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      } else if (!response.ok) {
        throw new Error("Error inesperado.");
      }
      //SE NECESITA TENER LA RESPUESTA EN FORMATO JSON
      return response.json();
    })
    .then(data => {
      storeJsonData(data);
      //SI ES 200 OK SE ENVÍA AL MAIN 
      window.location.href = "main.html";
    })
    .catch(e => {
                            msgBox.className = 'error';
                            msgBox.textContent = e.message;
                            msgBox.style.display = 'block';
                    }
                );
}
/*
function storeResponseXMLData (xmlString){
    //SE CREA EN XML PARSER
    const parser = new DOMParser();
    //RESPUESTAS EN XML
    const xmlDoc=parser.parseFromString(xmlString,"application/xml");
    //SE CREA EL OBJETO customer DE LA CLASS CUSTOMER 
    const customer=new Customer(
        xmlDoc.getElementsByTagName("id")[0].textContent,
        xmlDoc.getElementsByTagName("firstName")[0].textContent,
        xmlDoc.getElementsByTagName("lastName")[0].textContent,
        xmlDoc.getElementsByTagName("middleInitial")[0].textContent,
        xmlDoc.getElementsByTagName("street")[0].textContent,
        xmlDoc.getElementsByTagName("city")[0].textContent,
        xmlDoc.getElementsByTagName("state")[0].textContent,
        xmlDoc.getElementsByTagName("zip")[0].textContent,
        xmlDoc.getElementsByTagName("phone")[0].textContent,
        xmlDoc.getElementsByTagName("email")[0].textContent,
        xmlDoc.getElementsByTagName("password")[0].textContent,
                );
        //GUARDAR INFORMACIOŃ EN LA SESIÓN
        sessionStorage.setItem("customer.id", customer.id);
        sessionStorage.setItem("customer.firstName", customer.firstName);
        sessionStorage.setItem("customer.lastName", customer.lastName);
        sessionStorage.setItem("customer.middleInitial", customer.middleInitial);
        sessionStorage.setItem("customer.street", customer.street);
        sessionStorage.setItem("customer.city", customer.city);
        sessionStorage.setItem("customer.state", customer.state);
        sessionStorage.setItem("customer.zip", customer.zip);
        sessionStorage.setItem("customer.phone", customer.phone);
        sessionStorage.setItem("customer.email", customer.email);
        sessionStorage.setItem("customer.password", customer.password);
}*/

//FUNCIÓN PARA ALMACENAR EN JSON
function storeJsonData(customer) {
    sessionStorage.setItem("customer.id",customer.id);
    sessionStorage.setItem("customer.firstName",customer.firstName);
    sessionStorage.setItem("customer.lastName",customer.lastName);
    sessionStorage.setItem("customer.middleInitial",customer.middleInitial);
    sessionStorage.setItem("customer.street",customer.street);
    sessionStorage.setItem("customer.city",customer.city);
    sessionStorage.setItem("customer.state",customer.state);
    sessionStorage.setItem("customer.zip",customer.zip);
    sessionStorage.setItem("customer.phone",customer.phone);
    sessionStorage.setItem("customer.email",customer.email);
    sessionStorage.setItem("customer.password",customer.password);
}

//USADA EN EL MANEJADOR ONINPUT
function limpiarDatos() {
  const spanEmail = document.getElementById("errorEmail");
  const spanPassword = document.getElementById("errorPassword");
  const boxError = document.getElementById("responseMsg");
  const tfEmail = document.getElementById("tfEmail");
  const tfPassword = document.getElementById("tfPassword");
  
    spanEmail.textContent = "";
    spanPassword.textContent = "";
    boxError.textContent = "";
    tfEmail.classList.remove("input-error");
    tfPassword.classList.remove("input-error");
}
//SI SE INGRESA DESDE EL SIGN UP SE MOSTRARÁ SE COMPLETARÁ EL CORREO
function setEmail(){
    //CAPTURAR EL CORREO PARA CAMBIAR 
    const tfEmail = document.getElementById("tfEmail");
    const emailExistente= sessionStorage.getItem("email");
    if(emailExistente!==null){
        console.log("Email captured");
        tfEmail.value=emailExistente;
        document.getElementById('tfPassword').focus();
    }
}
setEmail();

/*Mediante el uso del método getElementsByTagName de la interfaz Document, 
cambiar la propiedad de estilo font-weight de todos los BUTTON  al valor 300. 
Hacerlo en el onload del BODY.*/
//USO DEL MÉTODO getElementsByTagName
function changeButtonsFontWeight(){
    let buttons = document.getElementsByTagName('button');
    let i=0;
    for(i;i<= buttons.length;i++){
        buttons[i].style="font-weight: 300;";   
    }
}

