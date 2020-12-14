'use strict';
const testData = require('../models/bnatTestData');

async function readTestMetaData(req,res) {
    try{
        const getTestData = await testData.findOne({});
        res.status(200).send(getTestData);
        console.log("Reading Data",getTestData);
    } catch(err){
        console.log(err);
    }
}

module.exports = {readTestMetaData};
//module.exports = {router};
