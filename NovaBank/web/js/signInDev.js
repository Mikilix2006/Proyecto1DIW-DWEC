function validarSignIn(event) {
        try{
            const tfEmail = document.getElementById("tfEmail");
            const tfPassword = document.getElementById("tfPassword");
            const signForm = document.getElementById("formulario");
            //Las expresiones regulares para poder validar email y password
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const regexPassword = /^[a-zA-Z0-9!#$%&]*$/;
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
            //validación de contraseña
            if (tfPassword.value.length > 255){
                errorPassword.textContent="La contraseña no puede superar los 255 caracteres.";
                errores=true;
            }else if (!regexPassword.test(tfPassword.value.trim())){
                errorPassword.textContent="Valores no permitidos.";
                errores=true;  
            }
            if(errores) return;
         
            sendRequestAndProcessResponse();
            
        }catch(e){
            const msgBox = document.getElementById("responseMsg");
            msgBox.className = 'error';
            msgBox.textContent = 'Error: ' + e.message;
            msgBox.style.display = 'block';
        }
}
    
function sendRequestAndProcessResponse(){
    //get form and message div references
    const signForm = document.getElementById("formulario");
    const msgBox = document.getElementById("responseMsg");
    //get field´s values
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
                            throw new Error(text || 'Unexpected error!!');
                          });
                        }
                        return response.text();
                    })
                    //Process OK response 
                    /* .then(data => {
                        msgBox.className = 'success';
                        msgBox.textContent = 'Customer signed in successfully!';
                        msgBox.style.display = 'block';
                        //Store response data into Customer object and in session storage 
                        storeResponseXMLData(data);
                        //get customer object from storage
                        const customerName=sessionStorage.getItem("customer.firstName");
                        msgBox.textContent = msgBox.textContent+'Hi '+customerName+'!';
                    }) */
                    //Process errors
                    .catch(e => {
                            msgBox.className = 'error';
                            msgBox.textContent = 'Error: ' + e.message;
                            msgBox.style.display = 'block';
                    }
                );
}
//PREPARAR DATOS
//ENVIAR DATOS
//ASOCIAR LA NUEVA VISTA
//GUARDAR INFORMACIÓN
//INTERACTUAR


