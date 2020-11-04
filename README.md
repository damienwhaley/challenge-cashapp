# Cash Coding Exercise v4

This is my interpretation of the Cash coding challenge.

## TL;DR

This challenge response is coded in JavaScript running in Node 14.15.0. You will need that on the machine you are running this code on. I resisted the temptation of including a Dockerfile.

To get this code running you should do the following:

```bash
cd /path/to/where/you/downloaded/the/code
npm install
node index.js
```

This will run the example file which uses the classes which models the bank. It uses `console.log()` to explain the operations which are happening. Nothing fancy, just some code to demonstrate the usage.

I followed the [TDD](https://en.wikipedia.org/wiki/Test-driven_development) methodology to complete the challenge. To run the test suite you do the following:

```bash
cd /path/to/where/you/downloaded/the/code
npm install
npm test
```

This will run all the tests. My aim was to have the "happy" path tested, then look at "sad" path - edge cases and things that were obviously wrong or not allowed. This gave me confidence that my solution worked the way I expected, and it allowed me to refactor the code quickly knowing that I had tests covering the functionality I had implemented.

## Modelling

I have taken the simplest possible approach to modelling a bank.

I have modelled the bank with two domains which are related to each other.

One domain is the customer domain, and the other domain is the bank domain.

I've made some assumptions which apply to both domains:

* There is only one currency the bank needs to deal with, so there are no currency codes or having to deal with currency conversion rates.
* The values for the balances and the transactions are floating point. JavaScript is not reliable at maths ([especially floating point](https://www.matthewburfield.com/javascript-deep-dive-floating-point-numbers/)) so I have used the [BigNumber.js](https://github.com/MikeMcl/bignumber.js/) library to help with the calculations. There is one test where I have used values which would calculate an incorrect value using native JavaScript maths.
* I have not implemented any rounding, and the assumption is that the user will use sensible amounts, to up to two decimal places.
* There is no persistance of data.
* There is no CLI, nor Web Service.
* There is no logging.
* There is no configuration.
* I have not implemented a log of the transactions which happened (a ledger). This would be the next thing I implemented if the requirements had asked for it.

### Customer Domain

Using the simplest way to represent the customer entity I made the assumption that a customer of the bank can only have one bank account. The customer domain is really concerned with a customer account. If I was to add a bit more detail, I would have allowed a customer to have multiple accounts, and these accounts would have been a separate class. I felt this is over-engineering the solution, and would not help in building something which delivers what the requirements request.

Another simplification that I chose was to use the customer's name as the identifier for the customer.

For the sake of modelling and the simple examples I thought that this was good enough. In the real world the customer would have some sort of unique identifier which is assigned to the customer by the system (think of UUID, GUID, or something similar). There is more than on Jane Smith in the world. Solving this problem was not really demonstrating the workings of a bank.

The customer has a balance attribute which states how much money the customer has in their bank account at that given point in time. This value is updated each time a deposit or withdrawal takes place.

There is checking on the customer deposit and withdrawals to make sure that the amount specified was greater than zero (and is a number). I did not want to allow the case of a negative deposit amount which could have meant that the customer was withdrawing money. Customers are allowed to deposit as much funds as they like, but they can only withdraw up to the amount that they have in their own bank account. There is no overdraft or credit.

I added a check in the customer entity for a valid name. This is because a customer entity knows what a valid name is, and other domains should not have to have knowledge of this.

Within the customer domain, the balance, and withdrawal and depositing of funds is for the benefit of the customer. The language and words that are used are in the context of the customer.

### Bank Domain

The bank entity has only two attributes - a balance which represents the amount of money that the bank has available to it based on the balance of all of the customer accounts, and a list of customers.

The balance is a convenience, and is a derived value based on the sum of the balances of the customers. It is pretty obvious that calculating or deriving this value would become slower as the number of customers grew.

The list of customers (effectively customer accounts) is a simple array, and if persistance was implemented then the way this would be implemented would be through a service to fetch the records requested. Again as the number of customers grew this would also cause performance problems.

The main operations that the bank needs to deal with are deposits (money going in), and withdrawals (money going out). The way I chose to implement this is to delegate the checking of the withdrawals and deposits to the customer domain, and if that was allowed, then the derived value of the overall bank balance would be updated - all as an atomic transaction. This also allowed the checking to happen in one place, and removing the need for duplicated checking.

The method which gets the customer statement is a point in time state of the customer's balance, and also the bank's available funds. It wasn't clear if we needed to include both pieces of information in the statement (customer balance, and bank available funds). I took it as there needed to be a way to get both pieces of information back to the user of the code. In real life I don't think that you would ever want to tell a customer how much available funds you had in the bank. This is why I made the decision to include this functionality as part of the bank domain.

The bank domain is aware of the customer domain, but the customer domain is not aware at all of the bank domain.

Within the bank domain, the balance is the available funds to the the bank, and the withdrawl and deposit of funds are adjusted for the given customer, and the result is then reflected in the available funds for the bank. You'll note that these are the same words as in the customer domain, but have different meanings for the bank domain.

## Final Comments

The resulting code seems very simple, and it implements only the functionality which was requested.

The two domains ended up as two classes (one class for each domain).

The main important logic is in the deposit and withdrawal functions. The `index.js` file uses the challenge code to demonstrate the use.

The test cases also demonstrate the use of the challenge code, and proves that the solution is correct, and also ensures that edge cases are correctly catered for. As much as possible the test cases try to test behaviour, rather than the implementation. The solution is very simple, and in some cases the test cases seem to test the implementation details, but this was not the goal.

## Thanks

Thanks for spending the time to review this, and I look forward to your feedback.
