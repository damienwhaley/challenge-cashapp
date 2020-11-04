const BigNumber = require('bignumber.js');
const Customer = require('./customer.js');

class Bank {

  customers = [];
  balance = new BigNumber(0.0);

  constructor(bankName) {
    this.name = bankName;
  }

  getCustomers() {
    // Get all the customers
    return this.customers;
  }

  addCustomer(customerName) {
    if (!Customer.isValidName(customerName)) {
      return false;
    }

    const customer = new Customer(customerName);

    if (customer instanceof Customer) {
      this.customers.push(customer);
      return true;
    }

    return false;
  }

  getCustomer(customerName) {
    // Get only the requested customer
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i].getName() === customerName) {
        return this.customers[i];
      }
    }

    return null;
  }

  getBalance() {
    return this.balance;
  }

  getName() {
    return this.name;
  }

  depositFunds(customerName, amount) {
    const customer = this.getCustomer(customerName);
    if (!customer) {
      // Could not find the customer
      return false;
    }

    let depositResult = customer.depositFunds(amount);

    if (!depositResult) {
      // The deposit did not work
      return false;
    }

    this.balance = this.balance.plus(amount);

    return true;
  }

  withdrawFunds(customerName, amount) {
    const customer = this.getCustomer(customerName);
    if (!customer) {
      // Could not find the customer
      return false;
    }

    let withdrawalResult = customer.withdrawFunds(amount);

    if (!withdrawalResult) {
      // The withdrawal did not work
      return false;
    }

    this.balance = this.balance.minus(amount);

    return true;
  }

  getStatement(customerName) {
    const customer = this.getCustomer(customerName);
    if (!customer) {
      // Could not find the customer
      return null;
    }

    return {
      bank: {
        name: this.getName(),
        balance: this.getBalance().toNumber()
      },
      customer: {
        name: customer.getName(),
        balance: customer.getBalance().toNumber()
      }
    };
  }
}

module.exports = Bank;
