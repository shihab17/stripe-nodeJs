// const { logger } = require('./../../lib/');
const { createCustomer, getCustomer } = require('./../../../services/stripe.service');

const create = async (req, res) => {
    try {
        const customer = await createCustomer(req.body);
        if (customer.error) return res.status(400).send({ error: customer.error })
        return res.status(200).send({ result: customer });
    }
    catch (err) {
        // logger.error("creating new user error " + JSON.stringify(error));
        return res.status(400).send({ error: error });
    }
};
const get = async (req, res) => {
    try {
        const customer = await getCustomer();
        if (customer.error) return res.status(400).send({ error: customer.error })
        return res.status(200).send({ result: customer });
    }
    catch (err) {
        // logger.error("creating new user error " + JSON.stringify(error));
        return res.status(400).send({ error: error });
    }
};
module.exports = {
    create,
    get
}