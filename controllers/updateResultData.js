'use strict';
const testMetaData = require('../models/registratioAndTestSchema');

async function updateResultData(req,res) {
    const updateResultDate = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            await testMetaData.collection.updateOne({ testVersion : updateResultDate.testVersion }, {
                $set:
                {
                    "resultStats.resultDateTime": new Date(updateResultDate.resultDateTime).getTime(),
                    "resultStats.assessmentReportDateTime": new Date(updateResultDate.assessmentReportDateTime).getTime()
                }
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports = {updateResultData};