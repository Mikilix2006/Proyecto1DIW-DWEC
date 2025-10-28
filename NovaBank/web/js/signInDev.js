function Customer(  id, 
                    firstName, 
                    lastName, 
                    middleInitial, 
                    street, 
                    city, 
                    state,
                    zip,
                    phone,
                    email,
                    password) {
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
function validarSignIn(event) {
        try{
            const tfEmail = document.getElementById("tfEmail");
            const tfPassword = document.getElementById("tfPassword");
            const signForm = document.getElementById("formulario");
            //Las expresiones regulares para poder validar email y password
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            //const regexPassword = /^[a-zA-Z0-9!#$%&]*$/;
            //Para visualizar errores
            const errorEmail = document.getElementById("errorEmail");
            const errorPassword = document.getElementById("errorPassword");
            //Se evita el event bubbling
            event.preventDefault();
            event.stopPropagation();
            
            let errores=false;
            if (tfEmail.value.trim() === "" || tfPassword.value.trim() === "")
                throw new Error('Por favor complete todos los campos');
            //validación de correo
            if (tfEmail.value.length > 255) {
                errorEmail.textContent = "El correo electrónico no puede superar los 255 caracteres.";
                errores=true;
            }else if (!regex.test(tfEmail.value.trim())){
                errorEmail.textContent = "La dirección de correo electrónico no es válida. (Ej. javi@javi.com)";
                errores=true;
            }
            /*validación de contraseña
            if (tfPassword.value.length > 255){
                errorPassword.textContent="La contraseña no puede superar los 255 caracteres.";
                errores=true;
            }else if (!regexPassword.test(tfPassword.value.trim())){
                errorPassword.textContent="Valores no permitidos.";
                errores=true;  
            }*/
            if(errores) return;
         
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
    const tfEmail = document.getElementById("tfEmail");
    const tfPassword = document.getElementById("tfPassword");
    const valueTfEmail=tfEmail.value.trim();
    const valueTfPassword=tfPassword.value.trim();
    //Send Request using fetch API (window.fetch method)
    fetch(signForm.action + `${encodeURIComponent(valueTfEmail)}/${encodeURIComponent(valueTfPassword)}`, 
                    {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/xml'
                        }
                    }).then(response => {
                        //Process HTTP 401 error
                        if (response.status===401){
                          return response.text().then(text => {
                            throw new Error('¡Ups! Parece que la dirección de correo o la contraseña no coinciden con un usuario existente. Por favor introduzca las credenciales correctas.');
                          });
                        }
                        //Process HTTP 500 error
                        else if (response.status===500){
                          return response.text().then(text => {
                            throw new Error('Se ha producido un error en el servidor. Por favor espere un momento y vuelve a intentarlo. Si el problema persiste, contacte con Ayuda y Soporte');
                          });
                        }
                        //Process any other error
                        else if (!response.ok) {
                          return response.text().then(text => {
                            throw new Error(text || 'Error inesperado');
                          });
                        }
                        return response.text();
                    }).then(data => {
                        storeResponseXMLData(data);
                        //get customer object from storage
                        const customerName=sessionStorage.getItem("customer.firstName");
                        msgBox.textContent = msgBox.textContent+'Hi '+customerName+'!';
                    }).catch(e => {
                            msgBox.className = 'error';
                            msgBox.textContent = 'Error: ' + e.message;
                            msgBox.style.display = 'block';
                    }
                );
}
function storeResponseXMLData (xmlString){
                //Create XML parser
                const parser = new DOMParser();
                //Parse response XML data
                const xmlDoc=parser.parseFromString(xmlString,"application/xml");
                //Create Customer object with data received in response
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
                // Save data to sessionStorage
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
//PREPARAR DATOS
//ENVIAR DATOS
//ASOCIAR LA NUEVA VISTA
//GUARDAR INFORMACIÓN
//INTERACTUAR


