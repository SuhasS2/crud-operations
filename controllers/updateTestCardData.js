'use strict';
const testCardDataValidation = require('../utils/payloadValidation/testDetails');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');

async function updateTestCardData(req, res) {
    const updateTestCardValues = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send("Empty data should not be used");
        } else {
            const validationResult = testCardDataValidation.updatePayloadValidationOfTestCardData(updateTestCardValues);
            if (validationResult.success) {
                await bTDModel.collection.updateOne({ testVersion: updateTestCardValues.testVersion }, {
                    $set:
                    {
                        "testData.testCard.color": updateTestCardValues.color,
                        "testData.testCard.hasAppeared": updateTestCardValues.hasAppeared
                    }
                });
                res.status(200).send({ message: "Updated test card details successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = { updateTestCardData }