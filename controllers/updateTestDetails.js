'use strict';
const inputValidation = require('../utils/payloadValidation/updateValidation');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');

async function updateRegStatus(req, res) {
    const regActiveStats = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfRegData(regActiveStats,'registrationStatus');
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: regActiveStats.testVersion }, {
                    $set:
                        { 
                            'testDetails.registrationActiveStatus': regActiveStats.registrationActiveStatus
                        }
                });
                res.status(200).send({ message: 'Updated Registration Status Successfully' });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

async function updateRegData(req, res) {
    const updateDataValue = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfRegData(updateDataValue,'registrationDate');
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updateDataValue.testVersion }, {
                    $set:
                    {
                        'registrationData.regWindowStartDateTime': new Date(`${req.body.regWindowStartDateTime}`).getTime(),
                        'registrationData.regWindowStopDateTime': new Date(`${req.body.regWindowStopDateTime}`).getTime(),
                        'registrationData.pageUrl': updateDataValue.pageUrl
                    }
                });
                res.status(200).send({ message: 'Updated Registration date & time successfully' });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

async function updateResultData(req, res) {
    const updateResultDate = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfRegData(updateResultDate,'resultdate');
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updateResultDate.testVersion }, {
                    $set:
                    {
                        'resultStats.resultDateTime': new Date(updateResultDate.resultDateTime).getTime(),
                        'resultStats.assessmentReportDateTime': new Date(updateResultDate.assessmentReportDateTime).getTime()
                    }
                });
                res.status(200).send({ message: 'Updated Result date & time successfully' });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

async function updateTestCardData(req, res) {
    const updateTestCardValues = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfRegData(updateTestCardValues,'testCardData');
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updateTestCardValues.testVersion }, {
                    $set:
                    {
                        'testData.testCard.color': updateTestCardValues.color,
                    }
                });
                res.status(200).send({ message: 'Updated test card details successfully' });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

async function updateTestDateTime(req, res) {
    const updateTestdata = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfRegData(updateTestdata,'testDate');
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updateTestdata.testVersion }, {
                    $set:
                    {
                        'testData.testStartDateTime': new Date(updateTestdata.testStartDateTime).getTime(),
                        'testData.testEndDateTime': new Date(updateTestdata.testEndDateTime).getTime()
                    }
                });
                res.status(200).send({ message: 'Updated test date & time successfully' });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

async function updateTestSyllabus(req, res) {
    const updatesyllabus = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfRegData(updatesyllabus,'syllabuseligibility');
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updatesyllabus.testVersion }, {
                    $set:
                    {
                        'testData.syllabus': `${updatesyllabus.syllabus}`,
                        'testData.eligibility': `${updatesyllabus.eligibility}`,
                        'testData.duration': `${updatesyllabus.duration}`
                    }
                });
                res.status(200).send({ message: 'Updated test syllabus, eligibility & duration successfully' });
            } else {
                res.status(400).send({ message: `${validationResult.message}` });
            }
        }
    } catch (err) {
        logger.error({ topic: 'Storing test details', message: `${err}` });
        res.status(500).send({ message: `${err}` });
    }
}

module.exports = {updateRegData,updateRegStatus,updateResultData,updateTestCardData,updateTestDateTime,updateTestSyllabus}