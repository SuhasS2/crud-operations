"use strict";
const createData = require('./controllers/create');
const readData = require('./controllers/read');
const updateData = require('./controllers/update');
const deleteData = require('./controllers/delete');

exports.init = (router) => {
  router.route('/').get((req, res) => {
    res.status(200).json({success:true, message: 'Welcome' });
  });

  router.route('/create-data').post(createData.createTestMetaData);
  router.route('/read-data').get(readData.readTestMetaData);
  router.route('/update-data').put(updateData.updateTestMetaData);
  router.route('/delete-data').delete(deleteData.deleteTestMetaData);
};
