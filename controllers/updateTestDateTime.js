'use strict';
const testDateValidation = require('../utils/payloadValidation/testDetails');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');

async function updateTestDateTime(req, res) {
    const updateTestdata = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send("Empty data should not be used");
        } else {
            const validationResult = testDateValidation.updatePayloadValidationofTestDateTime(updateTestdata);
            if (validationResult.success) {
                await testMetaData.collection.updateOne({ testVersion: updateTestdata.testVersion }, {
                    $set:
                    {
                        "testData.testStartDateTime": new Date(updateTestdata.testStartDateTime).getTime(),
                        "testData.testEndDateTime": new Date(updateTestdata.testEndDateTime).getTime()
                    }
                });
                res.status(200).send({ message: "Updated test date & time successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = { updateTestDateTime };