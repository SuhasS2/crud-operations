'use strict';
const testData = require('../models/registratioAndTestSchema');

async function readTestMetaData(req,res) {
    try{
        const getTestData = await testData.find({});
        res.status(200).send(getTestData);
        //console.log(getTestData);
    } catch(err){
        console.log("Error!:(");
    }
}

module.exports = {readTestMetaData};
//module.exports = {router};