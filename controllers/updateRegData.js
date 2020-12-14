'use strict';
const regDataValidation = require('../utils/payloadValidation/testDetails');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');


async function updateRegData(req, res) {
    const updateDataValue = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send("Empty data should not be used");
        } else {
            const validationResult = regDataValidation.updatePayloadValidationOfRegData(updateDataValue);
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updateDataValue.testVersion }, {
                    $set:
                    {
                        "registrationData.regWindowStartDateTime": new Date(`${req.body.regWindowStartDateTime}`).getTime(),
                        "registrationData.regWindowStopDateTime": new Date(`${req.body.regWindowStopDateTime}`).getTime()
                    }
                });
                res.status(200).send({ message: "Updated Registration date & time successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = { updateRegData };
