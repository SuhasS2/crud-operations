'use strict';
const testMetaData = require('../models/registratioAndTestSchema');
//const {Validator} = require('node-input-validator');
//const updateValidator = require('../util/schemaValidation')


async function updateRegData(req, res) {
    const updateDataValue = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            await testMetaData.collection.findOneAndUpdate({ testVersion : updateDataValue.testVersion }, {
                $set:
                {
                    "registrationData.regWindowStartDateTime": new Date(`${req.body.regWindowStartDateTime}`).getTime(),
                    "registrationData.regWindowStopDateTime": new Date(`${req.body.regWindowStopDateTime}`).getTime()
                }
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports = {updateRegData};
//module.exports = {router};
