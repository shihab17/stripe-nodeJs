const crypto = require('crypto');
const { Token } = require('./../models/index');
const { logger } = require('./logger');
const generateLink = async (userId) => {
    let token = parseInt(Math.floor((Math.random() * 1000000) + 99999)) + (new Date().getTime());
    token = crypto.createHash('md5').update(token + '').digest("hex");
    token = new Token({
        userId: userId,
        consumed: false,
        token: token
    });
    token = await token.save();

    return token.token;
}
const errorHandler = async (error) => {
    logger.error(error);
    if (error.error) {
        error = error.error;
    } else if (!error.message && !error.stack) {
        error = error.error || {};
        const { details } = error;
        error = { message: (details || []).map(i => i.message).join(',') };
    } else {
        error = { message: error.message };
    }
    // logger.log("error" + JSON.stringify(error));

    return {
        status: "ERROR",
        error: error
    };
}
module.exports = {
    generateLink,
    errorHandler
}