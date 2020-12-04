'use strict';
const testData = require('../models/registratioAndTestSchema');
//const updateValidator = require('../util/schemaValidation')
const moment = require('moment');

async function updateTestMetaData(req, res) {
    const updateDataValue = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            await testData.collection.updateOne({ grade: updateDataValue[0].grade }, {
                $set:
                { 
                    registrationStartDate: new Date(updateDataValue[1].registrationStartDate).getTime(),
                    registrationStopDate: new Date(updateDataValue[1].registrationStopDate).getTime(),
                    testStartDate: new Date(updateDataValue[1].testStartDate).getTime(),
                    testStopDate: new Date(updateDataValue[1].testStopDate).getTime() 
                }
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports = {updateTestMetaData};
//module.exports = {router};
