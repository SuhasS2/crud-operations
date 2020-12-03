'use strict';
const testData = require('../models/registratioAndTestSchema');

async function deleteTestMetaData(req,res) {
    const deleteDataValue = req.body;
    if (!req.body) {
        res.status(200).send({});
    } else {
        try {
            await testData.deleteOne({grade : deleteDataValue})
            res.status(200).send({ message: "Data got Deleted" });
        } catch(err){
            console.log("Error:(");
        }
    }  
}

module.exports = {deleteTestMetaData};
//module.exports = {router};
