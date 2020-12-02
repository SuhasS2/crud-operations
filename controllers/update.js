const express = require('express');
const router = express.Router();
const testMetaData = require('../models/registratioAndTestSchema');

module.exports = function () {
    router.put('/update-data', async (req, res) => {
        const { grade, newRegStartDate, newRegStopDate, newTestStartDate, newTestStopDate } = req.body;
        await testMetaData.updateOne(
            { grade: grade },
            {
                $set: { registrationStartDate: newRegStartDate, registrationStoptDate: newRegStopDate, testStartDate: newTestStartDate, testStopDate : newTestStopDate }
            }
        );
        res.send({ message: `Test Data Updated successfully` });
    });
    return router;
};