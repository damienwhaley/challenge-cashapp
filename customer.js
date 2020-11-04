const BigNumber = require('bignumber.js');

class Customer {

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

  getBalance() {
    return this.balance;
  }

  depositFunds(amount) {
    if(isNaN(amount) || !amount) {
      return false;
    }
    if(amount < 0) {
      return false;
    }

    this.balance = this.balance.plus(amount);

    return true;
  }

  withdrawFunds(amount) {
    if(isNaN(amount) || !amount) {
      return false;
    }
    if(amount < 0) {
      return false;
    }

    let testBalance = this.balance.minus(amount);

    if(testBalance.isLessThan(0)) {
      return false;
    }

    this.balance = testBalance;

    return true;
  }
}

module.exports = Customer;
