const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

async function readTestMetaData(req,res) {
    try{
        const getTestData = await testData.find({});
        res.status(200).send(getTestData);
    } catch(err){
        console.log("Error!:(");
    }
}

module.exports = {readTestMetaData};
module.exports = {router};