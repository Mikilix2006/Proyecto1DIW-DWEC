/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export class Movements {
  constructor(amount, balance, description) {
        this.amount = parseFloat(amount);
        this.balance = parseFloat(balance);
        this.description = description;
        this.timestamp = new Date().toISOString(); 
    }
    
  toJSON() {
        return {
            amount: this.amount,
            balance: this.balance,
            description: this.description,
            timestamp: this.timestamp
        };
    }
}

export class Account {
    // attributes
    id;
    description;
    balance;
    creditLine;
    beginBalance;
    beginBalanceTimestamp;
    type;
    // constructor
    constructor (id, description, balance, creditLine, beginBalance, beginBalanceTimestamp, type) {
        this.id = id;
        this.description = description;
        this.balance = balance;
        this.creditLine = creditLine;
        this.beginBalance = beginBalance;
        this.beginBalanceTimestamp = beginBalanceTimestamp;
        this.type = type;
    }
    // Override
    toJSON() {
        const city = sessionStorage.getItem("customer.id");
        const email = sessionStorage.getItem("customer.email");
        const firstName = sessionStorage.getItem("customer.firstName");
        const customerID = sessionStorage.getItem("customer.id");
        const lastName = sessionStorage.getItem("customer.lastName");
        const middleInitial = sessionStorage.getItem("customer.middleInitial");
        const password = sessionStorage.getItem("customer.password");
        const phone = sessionStorage.getItem("customer.phone");
        const state = sessionStorage.getItem("customer.state");
        const street = sessionStorage.getItem("customer.street");
        const zip = sessionStorage.getItem("customer.zip");
        
        return {
            balance: this.balance,
            beginBalance: this.beginBalance,
            beginBalanceTimestamp: this.beginBalanceTimestamp,
            creditLine: this.creditLine,
            customers: [
                {
                    city: city,
                    email: email,
                    firstName: firstName,
                    id: customerID,
                    lastName: lastName,
                    middleInitial: middleInitial,
                    password: password,
                    phone: phone,
                    state: state,
                    street: street,
                    zip: zip
                }
            ],
            description: this.description,
            id: this.id,
            type: this.type
        };
    }
}

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