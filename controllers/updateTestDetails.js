'use strict';
const inputValidation = require('../utils/payloadValidation/updateValidation');
const bTDModel = require('../models/bnatTestData');
const logger = require('../config/logger');
const gConst = require('../gConstants');

async function updateRegistrationStatus(req, res) {
    const regActiveStats = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfTestData(regActiveStats,gConst.registrationStatus);
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

async function updateRegistrationTime(req, res) {
    const updateDataValue = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfTestData(updateDataValue,gConst.registrationDate);
            if (validationResult.success) {
                await bTDModel.collection.findOneAndUpdate({ testVersion: updateDataValue.testVersion }, {
                    $set:
                    {
                        'registrationData.regWindowStartDateTime': new Date(`${req.body.regWindowStartDateTime}`).getTime(),
                        'registrationData.regWindowStopDateTime': new Date(`${req.body.regWindowStopDateTime}`).getTime()
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

async function updateResultTime(req, res) {
    const updateResultDate = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfTestData(updateResultDate,gConst.resultdate);
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
            const validationResult = inputValidation.updatePayloadValidationOfTestData(updateTestCardValues,gConst.testCardData);
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
            const validationResult = inputValidation.updatePayloadValidationOfTestData(updateTestdata,gConst.testDate);
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

async function updateTestDetails(req, res) {
    const updatesyllabus = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('Empty data should not be used');
        } else {
            const validationResult = inputValidation.updatePayloadValidationOfTestData(updatesyllabus,gConst.testDetails);
            if (validationResult.success) {
                await bTDModel.collection.updateOne({ testVersion: updatesyllabus.testVersion },{
                    $set :{
                        'testData.syllabus': `${updatesyllabus.syllabus}`,
                        'testData.eligibility': `${updatesyllabus.eligibility}`,
                        'testData.duration': `${updatesyllabus.duration}`,
                        'testData.testMode' : `${updatesyllabus.testMode}`,
                        'testData.target' : `${updatesyllabus.target}`
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

module.exports = {updateRegistrationTime,updateRegistrationStatus,updateResultTime,updateTestCardData,updateTestDateTime,updateTestDetails}