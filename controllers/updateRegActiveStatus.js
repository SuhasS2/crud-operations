'use strict';
const regStatusValidation = require('../utils/payloadValidation/testDetails');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');

async function updateRegStatus(req, res) {
    const regActiveStats = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send("Empty data should not be used");
        } else {
            const validationResult = regStatusValidation.updatePayloadValidationOfRegStatus(regActiveStats);
            if (validationResult.success) {
                await bTDModel.collection.updateOne({ testVersion: regActiveStats.testVersion }, {
                    $set:
                        { registrationActiveStatus: regActiveStats.registrationActiveStatus }
                });
                res.status(200).send({ message: "Updated Registration Status Successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = { updateRegStatus };