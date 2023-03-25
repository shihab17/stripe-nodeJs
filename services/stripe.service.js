const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);
const createCustomer = async (customerInfo) => {
    const customer = await stripe.customers.create(customerInfo);
    return customer;
}
const getCustomer = async () => {
    const customers = await stripe.customers.list({
        limit: 3,
      });
    return customers;
}

module.exports = { createCustomer, getCustomer };