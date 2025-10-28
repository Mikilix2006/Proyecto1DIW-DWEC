/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Customer {
    constructor(name,surname,initial,street,city,state,zip,telf,mail,pass) {
        this.name = name;
        this.surname = surname;
        this.initial = initial;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.telf = telf;
        this.mail = mail;
        this.pass = pass;
    }
    // Getters y setters
    get name() {
        return this.name;
    }
    get surname() {
        return this.surname;
    }
    get initial() {
        return this.initial;
    }
    get street() {
        return this.street;
    }
    get city() {
        return this.city;
    }
    get state() {
        return this.state;
    }
    get zip() {
        return this.zip;
    }
    get telf() {
        return this.telf;
    }
    get mail() {
        return this.mail;
    }
    get pass() {
        return this.pass;
    }
}
