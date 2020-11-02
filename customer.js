const BigNumber = require('bignumber.js');

class Customer {

  accounts = [];
  balance = new BigNumber(0.0);

  constructor(customerName) {
    this.name = customerName;
  }

  static isValidName(name) {
    return !!name;
  }

  getName() {
    return this.name;
  }


}

module.exports = Customer;
