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
    city;
    email;
    firstName;
    id;
    lastName;
    middleInitial;
    password;
    phone;
    state;
    street;
    zip;
    // constructor
    constructor (city, email, firstName, id, lastName, middleInitial, password, 
                    phone, state, street, zip) {
        this.city = city;
        this.email = email;
        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.password = password;
        this.phone = phone;
        this.state = state;
        this.street = street;
        this.zip = zip;
    }
    // Override
    toJSON() {
        return {
            city: this.city,
            email: this.email,
            firstName: this.firstName,
            id: this.id,
            lastName: this.lastName,
            middleInitial: this.middleInitial,
            password: this.password,
            phone: this.phone,
            state: this.state,
            street: this.street,
            zip: this.zip
        };
    }
}
