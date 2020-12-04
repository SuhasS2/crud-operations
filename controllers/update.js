'use strict';
const testData = require('../models/registratioAndTestSchema');
const updateValidator = require('../util/schemaValidation')
const moment = require('moment');

async function updateTestMetaData(req, res) {
    const updateDataValue = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            console.log(req.body);
            await testData.collection.updateOne({ grade: updateDataValue[0].grade }, {
                $set:
                { 
                    registrationStartDate: moment(updateDataValue[0].registrationStartDate).format(),
                    registrationStoptDate: moment(updateDataValue[0].registrationStoptDate).format(),
                    testStartDate: updateDataValue[0].testStartDate,
                    testStopDate: new Date(`${updateDataValue[0].testStopDate}`).getTime()
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
