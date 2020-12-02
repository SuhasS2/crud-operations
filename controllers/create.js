const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

module.exports = function () {
    router.post('/create-data', async (req, res) => {
    const { grade, addRegStartDate, addRegStopDate, addTestStartDate, addTestStopDate } = req.body;
    await testData.insertOne({
        grade: grade, registrationStartDate: addRegStartDate, registrationStoptDate: addRegStopDate,
        testStartDate: addTestStartDate, testStopDate: addTestStopDate
    })
        res.send({ message: `Test Data Added successfully` });
    });
    return router;
};
