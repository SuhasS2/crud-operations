'use strict';
const testMetaData = require('../models/registratioAndTestSchema');
//const {Validator} = require('node-input-validator');
//const updateValidator = require('../util/schemaValidation')
const moment = require('moment');

async function updateTestMetaData(req, res) {
    const updateDataValue = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            //const nonEmptyData = updateDataValue.filter(function(value){return(value[1]!==undefined || value[1]!==null || value[1]!=="");});
            //console.log(nonEmptyData);
            await testMetaData.collection.updateOne({ testVersion : updateDataValue.testVersion }, {
                $set:
                { registrationData: {
                    regWindowStartDateTime: new Date(updateDataValue.regWindowStartDateTime).getTime(),
                    regWindowStopDateTime: new Date(updateDataValue.regWindowStopDateTime).getTime()}, 
                  testData : {
                      testStartDateTime: new Date(updateDataValue.testStartDateTime).getTime(),
                      testEndDateTime: new Date(updateDataValue.testEndDateTime).getTime() },
                   resultStats : {
                       resultDateTime: new Date(updateDataValue.resultDateTime).getTime(),
                       assessmentReportDateTime: new Date(updateDataValue.assessmentReportDateTime).getTime()}
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
