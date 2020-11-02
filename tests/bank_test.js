const assert = require('assert').strict;
const Bank = require('../bank.js');

describe('Bank class', () => {
  describe('::constructor()', () => {
    it('Can construct an object', () => {
      const BANK_NAME = 'Awesome Bank';

      const bank = new Bank(BANK_NAME);

      assert(bank instanceof Bank);
    });
  });

  describe('::getCustomers()', () => {
    it('Has no customers to start with', () => {
      const BANK_NAME = 'Amazing Bank';
      const bank = new Bank(BANK_NAME);

      assert(bank.getCustomers().length === 0);
    });
  });

  describe('::createCustomer()', () => {
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

  describe('::getCustomer()', () => {
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
});
