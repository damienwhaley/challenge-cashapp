// This is an example of how you would use the simple bank classes

const Bank = require('./bank.js');

const BANK_NAME = 'Example Bank';
const CUSTOMER_NAMES = ['Alice', 'Betty', 'Cornelia'];
const DEPOSIT_AMOUNTS = [200, 333.33, 120.4];
const WITHDRAWAL_AMOUNTS = [100, 200, 300];

// Create a new bank
const bank = new Bank('Example Bank');

console.log(`Successfully created bank ${bank.getName()}\n`);

let result = false;

// Add customers and initial deposits
for (var i = 0; i < CUSTOMER_NAMES.length; i++) {
  result = bank.addCustomer(CUSTOMER_NAMES[i]);

  if (result) {
    console.log(`Successfully added bank account for ${CUSTOMER_NAMES[i]}.`);
  }
  else {
    console.log(`Could not add bank account for ${CUSOMTER_NAMES[i]}.`);
  }

  bank.depositFunds(CUSTOMER_NAMES[i], DEPOSIT_AMOUNTS[i]);

  if (result) {
    console.log(`Successfully deposited ${DEPOSIT_AMOUNTS[i]} into the account for ${CUSTOMER_NAMES[i]}.`);
  }
  else {
    console.log(`Could not add deposit ${DEPOSIT_AMOUNTS[i]} into the account for ${CUSTOMER_NAMES[i]}.`);
  }

  console.log('');
}

// Attempt withdrawals
for (var j = 0; j < CUSTOMER_NAMES.length; j++) {
  result = bank.withdrawFunds(CUSTOMER_NAMES[j], WITHDRAWAL_AMOUNTS[j]);

  if (result) {
    console.log(`Successfully withdrew ${WITHDRAWAL_AMOUNTS[j]} from the account of ${CUSTOMER_NAMES[j]}.`);
  }
  else {
    console.log(`Could not withdraw ${WITHDRAWAL_AMOUNTS[j]} from the account of ${CUSTOMER_NAMES[j]}.`);
  }
}

console.log('');

// Print statements for the customers after deposits and withdrawals
for (var k = 0; k < CUSTOMER_NAMES.length; k++) {
  let statement = bank.getStatement(CUSTOMER_NAMES[k]);

  console.log(`Statement for account of ${statement.customer.name} in ${statement.bank.name}`);
  console.log(`  Customer balance: ${statement.customer.balance}`);
  console.log(`  Bank available funds: ${statement.bank.balance}\n`);
}
