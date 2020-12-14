'use strict';
const testDataValidation = require('../utils/payloadValidation/testDetails');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');

async function updateResultData(req, res) {
    const updateResultDate = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send("Empty data should not be used");
        } else {
            const validationResult = testDataValidation.updatePayloadValidationOfResultDateTime(updateResultDate);
            if (validationResult.success) {
                await bTDModel.collection.updateOne({ testVersion: updateResultDate.testVersion }, {
                    $set:
                    {
                        "resultStats.resultDateTime": new Date(updateResultDate.resultDateTime).getTime(),
                        "resultStats.assessmentReportDateTime": new Date(updateResultDate.assessmentReportDateTime).getTime()
                    }
                });
                res.status(200).send({ message: "Updated Result date & time successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = { updateResultData };