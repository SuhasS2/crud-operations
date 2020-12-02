const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

module.exports = function(){
    router.get('/getTestData', async(req,res)=>{
        const allData = await testData.find();
        return res.send(allData);
    })
    return router;
};