const mongoose = require('mongoose');

const testMetaData = new mongoose.Schema({
    grade : String,
    registrationStartDate : Date,
    registrationStoptDate : Date,
    testStartDate : Date,
    testStopDate : Date
})

module.exports = mongoose.model('testdatas',testMetaData);