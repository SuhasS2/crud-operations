'use strict';
const testMetaData = require('../models/registratioAndTestSchema');

async function updateTestSyllabus(req,res) {
    const updatesyllabus = req.body;
    if(!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else{
        try{
            await testMetaData.collection.updateOne({ testVersion : updatesyllabus.testVersion }, {
                $set:
                {
                    "testData.syllabus": `${updatesyllabus.syllabus}`,
                    "testData.eligibility": `${updatesyllabus.eligibility}`,
                    "testData.duration": `${updatesyllabus.duration}`
                }
            });
            res.status(200).send({ message: "Update Success" });
        } catch(err){
            console.log("Error:(",err);
        }
    }
}

module.exports ={updateTestSyllabus}