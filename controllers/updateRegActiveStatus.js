'use strict';
const testMetaData = require('../models/registratioAndTestSchema');

async function updateRegStatus(req,res) {
    const regActiveStats = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data should not be used");
    } else {
        try {
            await testMetaData.collection.updateOne({ testVersion : regActiveStats.testVersion }, {
                $set:
                {registrationActiveStatus: regActiveStats.registrationActiveStatus}
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports = {updateRegStatus};