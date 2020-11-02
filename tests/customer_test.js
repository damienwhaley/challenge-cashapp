const assert = require('assert').strict;
const BigNumber = require('bignumber.js');
const Customer = require('../customer.js');

describe('Customer class', () => {
	describe('::constructor()', () => {
		it('Can construct an object', () => {
			const CUSTOMER_NAME = 'Alice';

			const customer = new Customer(CUSTOMER_NAME);

			assert(customer instanceof Customer);
		});
	});

	describe('::isValidName()', () => {
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

	describe('::getName()', () => {
		it('Gets the name of the customer', () => {
			const CUSTOMER_NAME = 'Sarah';

			const customer = new Customer(CUSTOMER_NAME);

			assert(customer.getName() === CUSTOMER_NAME);
		});
	});
});
