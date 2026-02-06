/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*export class Customer {
    constructor (id, firstName, lastName, middleInitial, street, city, state, zip, phone, email, password){
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
    
    
}*/

export class Customer {
    // attributes
    id; 
    firstName;
    lastName;
    middleInitial;
    street;
    city; state; 
    zip; phone;
    email; 
    password;
    // constructor
    constructor (id, firstName, lastName, middleInitial, street, city, state, zip, phone, email, password){
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
    // Override
    toJSON() {
        return {
            id:this.id,
            firstName:this.firstName,
            lastName:this.lastName,
            middleInitial:this.middleInitial,
            street:this.street,
            city:this.city,
            state:this.state,
            zip:this.zip,
            phone:this.phone,
            email:this.email,
            password: this.password
        };
    }
}