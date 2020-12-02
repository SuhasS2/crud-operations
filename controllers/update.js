const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

async function updateTestMetaData(req, res) {
    const updateDataValue = req.body;
    if (!req.body) {
        res.status(200).send({});
    } else {
        try {
            await testData.updateOne({ grade: updateDataValue[0].grade }, {
                $set:
                {
                    registrationStartDate: updateDataValue[0].registrationStartDate,
                    registrationStoptDate: updateDataValue[0].registrationStoptDate,
                    testStartDate: updateDataValue[0].testStartDate,
                    testStopDate: updateDataValue[0].testStopDate
                }
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(");
        }
    }
}

module.exports = {updateTestMetaData};
module.exports = {router};
