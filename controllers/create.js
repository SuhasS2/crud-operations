'use strict';
const testData = require('../models/bnatTestData');
const logger = require('../config/logger')
const inputValidation = require('../utils/payloadValidation/testDetails');

async function createTestMetaData(req, res) {
    const createDataValue = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(200).send("Error ! Empty data cannot be added");
        } else {
            const validationResult = inputValidation.payloadValidation(createDataValue);
            if (validationResult.success) {
                await testData.collection.insertOne(createDataValue);
                res.status(200).send({ message: "Data Added Successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Adding Data', message: `${err}` });
        res.status(500).send({ message: 'Something went wrong' });
    }
}

module.exports = { createTestMetaData }

