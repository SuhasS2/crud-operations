'use strict';
const testMetaData = require('../models/registratioAndTestSchema');

async function updateTestCardData(req,res) {
    const updateTestCardValues = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(400).send("Empty data should not be used");
    } else {
        try {
            await testMetaData.collection.updateOne({ testVersion : updateTestCardValues.testVersion }, {
                $set:
                { 
                    "testData.testCard.color": updateTestCardValues.color,
                    "testData.testCard.hasAppeared": updateTestCardValues.hasAppeared
                }
            });
            res.status(200).send({ message: "Updated test card details successfully" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports = {updateTestCardData}