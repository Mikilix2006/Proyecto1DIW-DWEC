
//PRUEBAS DEL SIGN IN Y PASSWORD
//CÓDIGO XML
//CONSTRUCTOR DE CUSTOMER
//INF. DEL CUSTOMER RESTFUL SERVICE
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
            const regexPassword = /^[a-zA-Z0-9!#$%&*]*$/;
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
                          'Content-Type': 'application/xml'
                        }
                    }).then(response => {
                        //ERROR 401
                        if (response.status===401){
                          return response.text().then(text => {
                            throw new Error('¡Ups! Parece que la dirección de correo o la contraseña no coinciden con un usuario existente.');
                          });
                        }
                        //ERROR 500
                        else if (response.status===500){
                          return response.text().then(text => {
                            throw new Error('Se ha producido un error en el servidor. Por favor espere un momento y vuelve a intentarlo. Si el problema persiste, contacte con Ayuda y Soporte');
                          });
                        }
                        //OTRO ERROR
                        else if (!response.ok) {
                          return response.text().then(text => {
                            throw new Error(text || 'Error inesperado. Por favor espere un momento y vuelve a intentarlo. Si el problema persiste, contacte con Ayuda y Soporte');
                          });
                        }
                        return response.text();
                    }).then(data => {
                        //GUARDA LOS DATOS 
                        storeResponseXMLData(data);
                        //LO MANDA AL MAIN
                        window.location.href = "main.html";
                    }).catch(e => {
                            msgBox.className = 'error';
                            msgBox.textContent = e.message;
                            msgBox.style.display = 'block';
                    }
                );
}
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