const assert = require('assert').strict;
const BigNumber = require('bignumber.js');
const Customer = require('../customer.js');

describe('Customer class', () => {
  describe('constructor()', () => {
    it('Can construct an object', () => {
      const CUSTOMER_NAME = 'Alice';

      const customer = new Customer(CUSTOMER_NAME);

      assert(customer instanceof Customer);
    });
  });

  describe('isValidName()', () => {
    it('Confirms that it is a valid name for a valid name given', () => {
      const CUSTOMER_NAME = 'Hilda';

      const result = Customer.isValidName(CUSTOMER_NAME);

      assert(result === true);
    });

    it('Lets us know that names are not valid for invalid names given', () => {
      assert(Customer.isValidName() === false);
      assert(Customer.isValidName(null) === false);
      assert(Customer.isValidName('') === false);
    });
  });

  describe('getName()', () => {
    it('Gets the name of the customer', () => {
      const CUSTOMER_NAME = 'Sarah';

      const customer = new Customer(CUSTOMER_NAME);

      assert(customer.getName() === CUSTOMER_NAME);
    });
  });

  describe('getBalance()', () => {
    it('Gets the account balance for the customer', () => {
      const CUSTOMER_NAME = 'Lisa';

      const customer = new Customer(CUSTOMER_NAME);

      assert(customer.getBalance().eq(new BigNumber(0)));
    });
  });

  describe('depositFunds()', () => {
    it('Can deposit funds with a valid amount', () => {
      const CUSTOMER_NAME = 'Janice';
      const AMOUNT = 100;

      const customer = new Customer(CUSTOMER_NAME);

      const result = customer.depositFunds(AMOUNT);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(AMOUNT)));
    });

    it('Can deposit funds multiple times with a valid amount', () => {
      const CUSTOMER_NAME = 'Helen';
      const AMOUNT_1 = 100;
      const AMOUNT_2 = 25.50;

      const customer = new Customer(CUSTOMER_NAME);

      customer.depositFunds(AMOUNT_1);
      customer.depositFunds(AMOUNT_2);

      assert(customer.getBalance().eq(new BigNumber(AMOUNT_1).plus(AMOUNT_2)));
    });

    it('Will not deposit funds with an invalid amount', () => {
      const CUSTOMER_NAME = 'Marsha';

      const customer = new Customer(CUSTOMER_NAME);

      let result = customer.depositFunds();

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));

      result = customer.depositFunds('Watermelon');

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));

      result = customer.depositFunds(0);

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));

      result = customer.depositFunds(-100);

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));
    });
  });

  describe('withdrawFunds()', () => {
    it('Can withdraw funds with a valid amount', () => {
      const CUSTOMER_NAME = 'Alexandria';
      const DEPOSIT_AMOUNT = 100;
      const WITHDRAWAL_AMOUNT = 10;

      const customer = new Customer(CUSTOMER_NAME);

      let result = customer.depositFunds(DEPOSIT_AMOUNT);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT)));

      result = customer.withdrawFunds(WITHDRAWAL_AMOUNT);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT).minus(WITHDRAWAL_AMOUNT)));
    });

    it('Will not withdraw funds with an invalid amount', () => {
      const CUSTOMER_NAME = 'Anna';

      const customer = new Customer(CUSTOMER_NAME);

      let result = customer.withdrawFunds();

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));

      result = customer.withdrawFunds('Watermelon');

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));

      result = customer.withdrawFunds(0);
      assert(customer.getBalance().eq(new BigNumber(0)));

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));

      result = customer.withdrawFunds(-100);

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(0)));
    });

    it('Will not withdraw funds with when not enough available', () => {
      const CUSTOMER_NAME = 'Kylie';
      const DEPOSIT_AMOUNT = 10;
      const WITHDRAWAL_AMOUNT = 100;

      const customer = new Customer(CUSTOMER_NAME);

      let result = customer.depositFunds(DEPOSIT_AMOUNT);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT)));

      result = customer.withdrawFunds(WITHDRAWAL_AMOUNT);

      assert(result === false);
      assert(customer.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT)));
    });

    it('Can withdraw all the funds in the customer account', () => {
      const CUSTOMER_NAME = 'Maggie';
      const AMOUNT = 100;

      const customer = new Customer(CUSTOMER_NAME);

      let result = customer.depositFunds(AMOUNT);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(AMOUNT)));

      result = customer.withdrawFunds(AMOUNT);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(0)));
    });

    it('Can withdraw funds multiple times with valid amounts', () => {
      const CUSTOMER_NAME = 'Nadia';
      const DEPOSIT_AMOUNT = 2345.70;
      const WITHDRAWAL_AMOUNT_1 = 100;
      const WITHDRAWAL_AMOUNT_2 = 25.50;

      const customer = new Customer(CUSTOMER_NAME);

      customer.depositFunds(DEPOSIT_AMOUNT)
      customer.withdrawFunds(WITHDRAWAL_AMOUNT_1);
      customer.withdrawFunds(WITHDRAWAL_AMOUNT_2);

      assert(customer.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT).minus(WITHDRAWAL_AMOUNT_1).minus(WITHDRAWAL_AMOUNT_2)));
    });
  });
});
