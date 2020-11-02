const BigNumber = require('bignumber.js');
const Customer = require('./customer.js');

class Bank {

  customers = [];
  balance = new BigNumber(0.0);

  constructor(bankName) {
    this.name = bankName;
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customerName) {
    if (!Customer.isValidName(customerName)) {
      return false;
    }

    const customer = new Customer(customerName);

    if(customer instanceof Customer) {
      this.customers.push(customer);
      return true;
    }

    return false;
  }

  // get the customer
  getCustomer(customerName) {
    for(var i = 0; i < this.customers.length; i++) {
      if (this.customers[i].getName() === customerName) {
        return this.customers[i];
      }
    }

    return null;
  }

  // add funds (customer record, amount)

  // withdraw funds (customer record, amount)

  // get balance

}

module.exports = Bank;
