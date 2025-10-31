//CONSTRUCTOR DE CUSTOMER 
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
/*cÓDIGO JSON*/
// ===========================
// VALIDACIÓN DE SIGN-IN
// ===========================
function validarSignIn(event) {
  try {
    const tfEmail = document.getElementById("tfEmail");
    const tfPassword = document.getElementById("tfPassword");
    const signForm = document.getElementById("formulario");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^[a-zA-Z0-9!#$%&*]*$/;
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");

    event.preventDefault();
    event.stopPropagation();

    tfEmail.classList.remove("input-error");
    tfPassword.classList.remove("input-error");
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    let errores = false;

    if (tfEmail.value.trim() === "" || tfPassword.value.trim() === "") {
      throw new Error("Por favor complete todos los campos");
    }

    if (tfEmail.value.length > 255) {
      errorEmail.textContent = "El correo electrónico no puede superar los 255 caracteres.";
      tfEmail.classList.add("input-error");
      errores = true;
    } else if (!regex.test(tfEmail.value.trim())) {
      errorEmail.textContent = "La dirección de correo electrónico no es válida. (Ej. javi@javi.com)";
      tfEmail.classList.add("input-error");
      errores = true;
    }

    if (tfPassword.value.length > 255) {
      errorPassword.textContent = "La contraseña no puede superar los 255 caracteres.";
      tfPassword.classList.add("input-error");
      errores = true;
    } else if (!regexPassword.test(tfPassword.value.trim())) {
      errorPassword.textContent = "Valores no permitidos.";
      tfPassword.classList.add("input-error");
      errores = true;
    }

    if (errores) return;

    sendRequestAndProcessResponse();
  } catch (e) {
    const msgBox = document.getElementById("responseMsg");
    msgBox.className = "error";
    msgBox.textContent = e.message;
    msgBox.style.display = "block";
  }
}

// ===========================
// PETICIÓN FETCH (GET + JSON)
// ===========================
function sendRequestAndProcessResponse() {
  const signForm = document.getElementById("formulario");
  const msgBox = document.getElementById("responseMsg");
  const tfEmail = document.getElementById("tfEmail");
  const tfPassword = document.getElementById("tfPassword");
  const valueTfEmail = tfEmail.value.trim();
  const valueTfPassword = tfPassword.value.trim();

  fetch(signForm.action + `${encodeURIComponent(valueTfEmail)}/${encodeURIComponent(valueTfPassword)}`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) {
        throw new Error("¡Ups! Parece que la dirección de correo o la contraseña no coinciden con un usuario existente.");
      } else if (response.status === 500) {
        throw new Error("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      } else if (!response.ok) {
        throw new Error("Error inesperado.");
      }
      return response.json(); // ✅ AHORA PARSEA AUTOMÁTICAMENTE EL JSON
    })
    .then(data => {
      console.log("🔹 Datos JSON recibidos:", data);
      storeJsonData(data); // ✅ PASA OBJETO JSON, NO TEXTO
      window.location.href = "main.html";
    })
    .catch(e => {
      msgBox.className = "error";
      msgBox.textContent = e.message;
      msgBox.style.display = "block";
    });
}

// ===========================
// GUARDAR DATOS EN SESSION
// ===========================
function storeJsonData(customer) {
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

// ===========================
// LIMPIAR ERRORES
// ===========================
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







/*
 * CÓDIGO XML
//FUNCIÓN PARA VALIDAR SIGN IN - MANEJO DE ERRORES INPUT
//CAMBIO DE XML A FORMATO JSON 
function validarSignIn(event) {
        try{
            const tfEmail = document.getElementById("tfEmail");
            const tfPassword = document.getElementById("tfPassword");
            const signForm = document.getElementById("formulario");
            //Las expresiones regulares para poder validar email y password
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const regexPassword = /^[a-zA-Z0-9!#$%&*]*$/;
            //Para visualizar errores
            const errorEmail = document.getElementById("errorEmail");
            const errorPassword = document.getElementById("errorPassword");
            //Se evita el event bubbling
            event.preventDefault();
            event.stopPropagation();
            tfEmail.classList.remove("input-error");
            tfPassword.classList.remove("input-error");
            
            let errores=false;
            if (tfEmail.value.trim() === "" || tfPassword.value.trim() === "")
                throw new Error('Por favor complete todos los campos');
                tfEmail.classList.add("input-error");
                tfPassword.classList.add("input-error");
            //validación de correo
            if (tfEmail.value.length > 255) {
                errorEmail.textContent = "El correo electrónico no puede superar los 255 caracteres.";
                tfEmail.classList.add("input-error");
                errores=true;
            }else if (!regex.test(tfEmail.value.trim())){
                errorEmail.textContent = "La dirección de correo electrónico no es válida. (Ej. javi@javi.com)";
                tfEmail.classList.add("input-error");
                errores=true;
            }
            //validación de contraseña
            if (tfPassword.value.length > 255){
                errorPassword.textContent="La contraseña no puede superar los 255 caracteres.";
                tfPassword.classList.add("input-error");
                errores=true;
            }else if (!regexPassword.test(tfPassword.value.trim())){
                errorPassword.textContent="Valores no permitidos.";
                tfPassword.classList.add("input-error");
                errores=true;  
            }
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
                            throw new Error('¡Ups! Parece que la dirección de correo o la contraseña no coinciden con un usuario existente.');
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
                        //return response.text();
                        return response.text();
                    }).then(data => {
                        //GUARDA LOS DATOS 
                        storeResponseXMLData(data);
                        //RECUPERA DATOS DE CUSTOMER
                        //const customerName=sessionStorage.getItem("customer.firstName");
                        //const customerPassword=sessionStorage.getItem("customer.password");
                        window.location.href = "main.html";
                        //msgBox.textContent = msgBox.textContent+'Hi '+customerName+customerPassword+customerCity+'!';
                    }).catch(e => {
                            msgBox.className = 'error';
                            msgBox.textContent = e.message;
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
function limpiarDatos(){
    const spanEmail = document.getElementById("errorEmail");
    const spanPassword = document.getElementById("errorPassword");
    const boxError = document.getElementById("responseMsg");
    const tfEmail = document.getElementById("tfEmail");
    const tfPassword = document.getElementById("tfPassword");
    spanEmail.textContent="";
    spanPassword.textContent="";
    boxError.textContent="";
    tfEmail.classList.remove("input-error");
    tfPassword.classList.remove("input-error");
}*/