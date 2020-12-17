"use strict";
const createData = require('./controllers/create');
const readData = require('./controllers/read');
const updateRegistrationData = require('./controllers/updateTestDetails');
const updateTestData = require('./controllers/updateTestDetails');
const updateTestCardData = require('./controllers/updateTestDetails');
const updateTestSyllabus = require('./controllers/updateTestDetails');
const updateResultData = require('./controllers/updateTestDetails');
const updateRegistrationActiveData = require('./controllers/updateTestDetails');
//const deleteData = require('./controllers/delete');


exports.init = (router) => {
  router.route('/').get((req, res) => {
    res.status(200).json({success:true, message: 'Welcome' });
  });

  router.route('/create-data').post(createData.createTestMetaData);
  router.route('/read-data').get(readData.readTestMetaData);
  router.route('/update/registration-data').put(updateRegistrationData.updateRegistrationTime);
  router.route('/update/test-time').put(updateTestData.updateTestDateTime);
  router.route('/update/testcard-data').put(updateTestCardData.updateTestCardData);
  router.route('/update/testsyllabuseligibility').put(updateTestSyllabus.updateTestDetails);
  router.route('/update/result-data').put(updateResultData.updateResultTime);
  router.route('/update/registrationstatus').put(updateRegistrationActiveData.updateRegistrationStatus);
  // router.route('/delete-data').post(deleteData.deleteTestMetaData);
};
