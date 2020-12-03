'use strict';
const schema = require('../util/schemaValidation');
const testData = require('../models/registratioAndTestSchema');

async function createTestMetaData(req,res) {
    const createDataValue = req.body;
   // console.log(Object.keys(req.body));
   // console.log(req.body);
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            const inputDataValue = await schema.schemaValidation(createDataValue, schema.testMetaDataValidation);
            if(inputDataValue.details){
                res.status(200).send({success: false, message: inputDataValue.details});
            } else{
            await testData.collection.insertOne(inputDataValue) ;
            res.status(200).send({ message: "Data Added Successfully" });
        }} catch(err){
            console.log(err);
        }
    }
}

module.exports = {createTestMetaData}

