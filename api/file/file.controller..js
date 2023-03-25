const upload = require("./file.service");

const create = async (req, res, next) => {
    try {
        const result = await upload(req, res);
        if(result.error) return res.status(400).send({ error: result.error });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(404).send(JSON.stringify(error));
    }
};
module.exports = { create }