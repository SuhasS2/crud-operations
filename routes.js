const express = require("express");
var app = express();
const router = express.Router();

const createData = require('./controllers/create');
const readData = require('./controllers/read');
const updateData = require('./controllers/update');
const deleteData = require('./controllers/delete')

module.exports = function () {

    router.use('/create-data',createData());

    router.use('/read-data',readData());

    router.use('/update-data',updateData());

    router.use('/delete-data',deleteData());

  return router;
}