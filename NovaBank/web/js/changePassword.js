/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    function validar_NewPassword (event){
                try{
                    //Get references to form fields
                    const Password=document.getElementById("Password");
                    const changePasswordForm=document.getElementById("changePasswordForm");
                    //Create a RegExp object to validate email
                    const passwordReg=
                        new RegExp("^[a-zA-Z0-9.!#$%&]$");
                    //Stop event propagation and default navigator actions 
                    event.preventDefault();
                    event.stopPropagation();
                    //Validate password filling
                    if(Password.value.trim()==="")
                    throw new Error("Password must be filled.");
                    //Validate password length
                    if (Password.value.length>50)
                    throw new Error("Password cannot have more than 50 characters.");
                    //Email validation using regular expression
                    if(!passwordReg.exec(password.value.trim()))
                    throw new Error("Password has not a valid format.");
                    //Call to function for sending data and process response
                    sendRequestAndProcessResponse();
                }catch(error){
                    //Show error messages in red styled div
                    const msgBox = document.getElementById("responseMsg");
                    msgBox.className = 'error';
                    msgBox.textContent = 'Error: ' + error.message;
                    msgBox.style.display = 'block';
                }
    }
    
    function validar_contraseñaActual () {
        try{
                    //G
                    const Password=document.getElementById("Password");
                    const changePasswordForm=document.getElementById("changePasswordForm");
                    //Create a RegExp object to validate email
                    const passwordReg=
                        new RegExp("^[a-zA-Z0-9.!#$%&]$");
                    //Stop event propagation and default navigator actions 
                    event.preventDefault();
                    event.stopPropagation();
                    //Validate password filling
                    if(Password.value.trim()==="")
                    throw new Error("Password must be filled.");
                    //Validate password length
                    if (Password.value.length>50)
                    throw new Error("Password cannot have more than 50 characters.");
                    //Email validation using regular expression
                    if(!passwordReg.exec(password.value.trim()))
                    throw new Error("Password has not a valid format.");
                    //Call to function for sending data and process response
                    sendRequestAndProcessResponse();
                }catch(error){
                    //Show error messages in red styled div
                    const msgBox = document.getElementById("responseMsg");
                    msgBox.className = 'error';
                    msgBox.textContent = 'Error: ' + error.message;
                    msgBox.style.display = 'block';
                }
        
        
    }
    function sendRequestAndProcessResponse (){
                //get form and message div references
                const changePasswordForm=document.getElementById("changePasswordForm");
                const msgBox = document.getElementById("responseMsg");
                //get field´s values
                const valueTfPassword=tfPassword.value.trim();
                //Send Request using fetch API (window.fetch method)
                fetch(signInForm.action +
                      `${encodeURIComponent(valueTfPassword)}`, 
                    {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/xml'
                        }
                    }).then(response => {
                        //Process HTTP 401 error
                        if (response.status===401){
                          return response.text().then(text => {
                            throw new Error('Wrong credentials!!');
                          });
                        }
                        //Process HTTP 500 error
                        else if (response.status===500){
                          return response.text().then(text => {
                            throw new Error('Server Error. Please try later!!');
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
                    .then(data => {
                        msgBox.className = 'success';
                        msgBox.textContent = 'Customer signed in successfully!';
                        msgBox.style.display = 'block';
                        //Store response data into Customer object and in session storage 
                        storeResponseXMLData(data);
                        //get customer object from storage
                        const customerName=sessionStorage.getItem("customer.firstName");
                        msgBox.textContent = msgBox.textContent+'Hi '+customerName+'!';
                    })
                    //Process errors
                    .catch(error => {
                            msgBox.className = 'error';
                            msgBox.textContent = 'Error: ' + error.message;
                            msgBox.style.display = 'block';
                    }
                );
    }
    
    