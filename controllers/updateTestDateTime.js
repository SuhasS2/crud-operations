'use strict';
const testMetaData = require('../models/registratioAndTestSchema');

async function updateTestDateTime(req,res) {
    const updateTestdata = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            await testMetaData.collection.updateOne({ testVersion : updateTestdata.testVersion }, {
                $set:
                { 
                    "testData.testStartDateTime": new Date(updateTestdata.testStartDateTime).getTime(),
                    "testData.testEndDateTime": new Date(updateTestdata.testEndDateTime).getTime()
                }
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports = {updateTestDateTime};