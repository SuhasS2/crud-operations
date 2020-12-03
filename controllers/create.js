'use strict';
const testData = require('../models/registratioAndTestSchema');

async function createTestMetaData(req,res) {
    const createDataValue = req.body;
    if (!req.body) {
        res.status(200).send({});
    } else {
        try {
            await testData.insertOne({ /*grade: createDataValue[0].grade,
                                       registrationStartDate: createDataValue[0].registrationStartDate,
                                       registrationStoptDate: createDataValue[0].registrationStoptDate,
                                       testStartDate:createDataValue[0].testStartDate,
                                       testStopDate: createDataValue[0].testStopDate */
                                       "grade" :"IAS", "registrationStartDate ":"2020-12-15", "registrationStopDate" :"2020-12-22",
                                       "testStartDate" :"2020-12-23","testStopDate":"2020-12-24"
            });
            res.status(200).send({ message: "Data Added Successfully" });
        } catch(err){
            console.log("Error:(");
        }
    }
}

module.exports = {createTestMetaData}

