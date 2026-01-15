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

