const assert = require('assert').strict;
const BigNumber = require('bignumber.js');
const Bank = require('../bank.js');

describe('Bank class', () => {
  describe('constructor()', () => {
    it('Can construct an object', () => {
      const BANK_NAME = 'Awesome Bank';

      const bank = new Bank(BANK_NAME);

      assert(bank instanceof Bank);
    });
  });

  describe('getCustomers()', () => {
    it('Has no customers to start with', () => {
      const BANK_NAME = 'Amazing Bank';
      const bank = new Bank(BANK_NAME);

      assert(bank.getCustomers().length === 0);
    });
  });

  describe('createCustomer()', () => {
    it('Can add a customer', () => {
      const BANK_NAME = 'Supergreat Bank';
      const CUSTOMER_NAME = 'Janet';

      const bank = new Bank(BANK_NAME);

      assert(bank.getCustomers().length === 0);

      const result = bank.addCustomer(CUSTOMER_NAME);

      assert(result === true);
      assert(bank.getCustomers().length === 1);
    });

    it('Can add multiple customers', () => {
      const BANK_NAME = 'Supergreat Bank';
      const CUSTOMER_NAMES = ['Jane', 'Naomi', 'Ariella'];

      const bank = new Bank(BANK_NAME);

      assert(bank.getCustomers().length === 0);

      for(var i = 0; i < CUSTOMER_NAMES; i++) {
        let result = bank.addCustomer(CUSTOMER_NAMES[i]);

        assert(result === true);
        assert(bank.getCustomers().length === i);
      }
    });

    it('Will not add a customer with an empty name', () => {
      const BANK_NAME = 'Big End of Town Bank';

      const bank = new Bank(BANK_NAME);

      assert(bank.getCustomers().length === 0);

      let result = bank.addCustomer();

      assert(result === false);
      assert(bank.getCustomers().length === 0);
    });
  });

  describe('getCustomer()', () => {
    it('Returns the requested customer', () => {
      const BANK_NAME = 'Profitable Bank';
      const CUSTOMER_NAMES = ['Sarah', 'Mary-Lou'];

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAMES[0]);
      bank.addCustomer(CUSTOMER_NAMES[1]);

      const customer1 = bank.getCustomer(CUSTOMER_NAMES[0]);
      const customer2 = bank.getCustomer(CUSTOMER_NAMES[1]);

      assert(customer1.getName() === CUSTOMER_NAMES[0]);
      assert(customer2.getName() === CUSTOMER_NAMES[1]);
    });

    it('Does not get a customer where there are no customers', () => {
      const BANK_NAME = 'Trustworthy Bank';
      const CUSTOMER_NAME = 'Lizzie';

      const bank = new Bank(BANK_NAME);

      const customer = bank.getCustomer(CUSTOMER_NAME)

      assert(customer === null);
    });

    it('Does not get a customer where the customer requested is not in the collection', () => {
      const BANK_NAME = 'Trustworthy Bank';
      const CUSTOMER_NAMES = ['Madeline', 'Wendy'];
      const MISSING_CUSTOMER_NAME = 'Anna';

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAMES[0]);
      bank.addCustomer(CUSTOMER_NAMES[1]);

      const customer = bank.getCustomer(MISSING_CUSTOMER_NAME);

      assert(customer === null);
    });
  });

  describe('getBalance()', () => {
    it('Can get the balance of the bank', () => {
      const BANK_NAME = 'Neo Bank';

      const bank = new Bank(BANK_NAME);

      assert(bank.getBalance().eq(new BigNumber(0)));
    });
  });

  describe('depositFunds()', () => {
    it('Can add funds to a given customer\'s account', () => {
      const BANK_NAME = 'Generous Bank';
      const CUSTOMER_NAME = 'Rose';
      const AMOUNT = 99.99;

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAME);
      const result = bank.depositFunds(CUSTOMER_NAME, AMOUNT);

      const customer = bank.getCustomer(CUSTOMER_NAME);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(AMOUNT)));
      assert(bank.getBalance().eq(new BigNumber(AMOUNT)));
    });

    it('Can add funds for multiple customers', () => {
      const BANK_NAME = 'Lovely Bank';
      const CUSTOMER_NAME_1 = 'Roberta';
      const CUSTOMER_NAME_2 = 'Louise';
      const AMOUNT_1 = 200;
      const AMOUNT_2 = 100.45;

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAME_1);
      bank.addCustomer(CUSTOMER_NAME_2);
      bank.depositFunds(CUSTOMER_NAME_1, AMOUNT_1);
      bank.depositFunds(CUSTOMER_NAME_2, AMOUNT_2);

      const customer1 = bank.getCustomer(CUSTOMER_NAME_1);
      const customer2 = bank.getCustomer(CUSTOMER_NAME_2);

      assert(customer1.getBalance().eq(new BigNumber(AMOUNT_1)));
      assert(customer2.getBalance().eq(new BigNumber(AMOUNT_2)));
      assert(bank.getBalance().eq(new BigNumber(AMOUNT_1).plus(AMOUNT_2)));
    });

    it('Will not add funds for a customer who does not have an account', () => {
      const BANK_NAME = 'Sinister Bank';
      const CUSTOMER_NAME = 'Leia';
      const AMOUNT = 99.99;

      const bank = new Bank(BANK_NAME);
      const result = bank.depositFunds(CUSTOMER_NAME, AMOUNT);

      assert(result === false);
      assert(bank.getBalance().eq(new BigNumber(0)));
    });

    it('Will not add funds for a customer with an invalid amount', () => {
      const BANK_NAME = 'Evil Bank';
      const CUSTOMER_NAME = 'Rey';

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAME);
      let result = bank.depositFunds(CUSTOMER_NAME);

      assert(result === false);
      assert(bank.getBalance().eq(new BigNumber(0)));

      result = bank.depositFunds(CUSTOMER_NAME, -10);

      assert(result === false);
      assert(bank.getBalance().eq(new BigNumber(0)));
    });
  });

  describe('withdrawFunds()', () => {
    it('Can withdraw funds from a given customer\'s account', () => {
      const BANK_NAME = 'Friendly Bank';
      const CUSTOMER_NAME = 'Bianca';

      // This is an example of JavaScript maths not working as expected!
      const DEPOSIT_AMOUNT = 25.99;
      const WITHDRAWAL_AMOUNT = 10.99;

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAME);
      bank.depositFunds(CUSTOMER_NAME, DEPOSIT_AMOUNT);
      const result = bank.withdrawFunds(CUSTOMER_NAME, WITHDRAWAL_AMOUNT);

      const customer = bank.getCustomer(CUSTOMER_NAME);

      assert(result === true);
      assert(customer.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT).minus(WITHDRAWAL_AMOUNT)));
      assert(bank.getBalance().eq(new BigNumber(DEPOSIT_AMOUNT).minus(WITHDRAWAL_AMOUNT)));
    });

    it('Will not withdraw funds for a customer who does not have an account', () => {
      const BANK_NAME = 'Community Bank';
      const CUSTOMER_NAME = 'Chelsea';
      const AMOUNT = 30;

      const bank = new Bank(BANK_NAME);
      const result = bank.withdrawFunds(CUSTOMER_NAME, AMOUNT);

      assert(result === false);
      assert(bank.getBalance().eq(new BigNumber(0)));
    });

    it('Will not withdraw funds for a customer with an invalid amount', () => {
      const BANK_NAME = 'Evil Bank';
      const CUSTOMER_NAME = 'Rey';

      // This does not need to test all the permutations as this is done in the customer test

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAME);
      let result = bank.depositFunds(CUSTOMER_NAME);

      assert(result === false);
      assert(bank.getBalance().eq(new BigNumber(0)));

      result = bank.depositFunds(CUSTOMER_NAME, -10);

      assert(result === false);
      assert(bank.getBalance().eq(new BigNumber(0)));
    });
  });

  describe('getName()', () => {
    it('Gets the name of the bank', () => {
      const BANK_NAME = 'Omni Bank';

      const bank = new Bank(BANK_NAME);

      assert(bank.getName() === BANK_NAME);
    });
  });

  describe('getStatement()', () => {
    it('Can get the statement for a customer of the bank', () => {
      const BANK_NAME = 'Trustworthy Bank';
      const CUSTOMER_NAME = 'Ashoka';
      const AMOUNT_1 = 99.50;
      const AMOUNT_2 = 2000;

      const bank = new Bank(BANK_NAME);
      bank.addCustomer(CUSTOMER_NAME);
      bank.depositFunds(CUSTOMER_NAME, AMOUNT_1);
      bank.depositFunds(CUSTOMER_NAME, AMOUNT_2);

      const result = bank.getStatement(CUSTOMER_NAME);
      const customer = bank.getCustomer(CUSTOMER_NAME);

      assert(bank.getBalance().eq(new BigNumber(AMOUNT_1).plus(AMOUNT_2)));
      assert(customer.getBalance().eq(new BigNumber(AMOUNT_1).plus(AMOUNT_2)));

      assert(result.bank.name === BANK_NAME);
      assert(result.bank.balance === bank.getBalance().toNumber());
      assert(result.customer.name === CUSTOMER_NAME);
      assert(result.customer.balance === bank.getBalance().toNumber());
    });
  });
});
