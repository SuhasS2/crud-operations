const express = require('express');
const router = express.Router();
const testData = require('../models/studentSchema');

module.exports = function () {
    const { grade, addRegStartDate, addRegStopDate, addTestStartDate, addTestStopDate } = req.body;
    await testData.insertOne({
        grade: grade, registrationStartDate: addRegStartDate, registrationStoptDate: addRegStopDate,
        testStartDate: addTestStartDate, testStopDate: addTestStopDate
    })

    return router;
}