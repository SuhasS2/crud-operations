const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

module.exports = function () {
    router.delete('/removeData', async (req, res) => {
        const { grade } = req.body;
        await testData.deleteOne({ grade });
        res.send({ message: "Deleted Successfully" });
    });
    return router;
};