"use strict";
const createData = require('./controllers/create');
const readData = require('./controllers/read');
const updateRegistrationData = require('./controllers/updateRegData');
const updateTestData = require('./controllers/updateTestDateTime');
const updateTestCardData = require('./controllers/updateTestCardData');
const updateTestSyllabus = require('./controllers/updateTestSyllabus');
const updateResultData = require('./controllers/updateResultData');
const updateRegistrationActiveData = require('./controllers/updateRegActiveStatus');
const deleteData = require('./controllers/delete');


exports.init = (router) => {
  router.route('/').get((req, res) => {
    res.status(200).json({success:true, message: 'Welcome' });
  });

  router.route('/create-data').post(createData.createTestMetaData);
  router.route('/read-data').get(readData.readTestMetaData);
  router.route('/update-registrationdata').put(updateRegistrationData.updateRegData);
  router.route('/update-testdatetime').put(updateTestData.updateTestDateTime);
  router.route('/update-testcarddata').put(updateTestCardData.updateTestCardData);
  router.route('/update-syllabuseligibility').put(updateTestSyllabus.updateTestSyllabus);
  router.route('/update-resultdata').put(updateResultData.updateResultData);
  router.route('/update-registrationstatus').put(updateRegistrationActiveData.updateRegStatus);
  router.route('/delete-data').delete(deleteData.deleteTestMetaData);
};
