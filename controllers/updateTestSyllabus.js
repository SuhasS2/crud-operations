'use strict';
const syllabusValidation = require('../utils/payloadValidation/testDetails');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');

async function updateTestSyllabus(req, res) {
    const updatesyllabus = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send("Empty data should not be used");
        } else {
            const validationResult = syllabusValidation.updatePayloadValidationOfSyllabus(updatesyllabus);
            if (validationResult.success) {
                await bTDModel.collection.updateOne({ testVersion: updatesyllabus.testVersion }, {
                    $set:
                    {
                        "testData.syllabus": `${updatesyllabus.syllabus}`,
                        "testData.eligibility": `${updatesyllabus.eligibility}`,
                        "testData.duration": `${updatesyllabus.duration}`
                    }
                });
                res.status(200).send({ message: "Updated test syllabus, eligibility & duration successfully" });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = { updateTestSyllabus }