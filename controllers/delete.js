'use strict';
const testData = require('../models/bnatTestData');

async function deleteTestMetaData(req,res) {
    const deleteDataValue = req.body;
    if (!req.body || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(200).send("Error ! Empty data cannot be added");
    } else {
        try {
            await testData.collection.updateOne({testVersion : deleteDataValue},{$set : {"registrationActiveStatus" : 0}});
            res.status(200).send({ message: "Data got Deleted" });
        } catch(err){
            console.log("Error:(",err);
        }
    }  
}

module.exports = {deleteTestMetaData};
//module.exports = {router};
