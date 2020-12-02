const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

async function createTestMetaData(req,res) {
    const createDataValue = req.body;
    if (!req.body) {
        res.status(200).send({});
    } else {
        try {
            await testData.insertOne({ grade: createDataValue[0].grade,
                                       registrationStartDate: createDataValue[0].registrationStartDate,
                                       registrationStoptDate: createDataValue[0].registrationStoptDate,
                                       testStartDate:createDataValue[0].testStartDate,
                                       testStopDate: createDataValue[0].testStopDate 
            });
            res.status(200).send({ message: "Data Added Successfully" });
        } catch(err){
            console.log("Error:(");
        }
    }
}

module.exports = {createTestMetaData};
module.exports = {router};

