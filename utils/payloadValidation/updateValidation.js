'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const gConst = require('../../gConstants');

const gradeData = Joi.object({
  'gradeValue': Joi.number().integer().min(1).max(13).required(),
  'gradeGroup': Joi.string().trim().required(),
  'academicGroup': Joi.string().trim().required(),
  'questionPaperId': Joi.array().items(Joi.number()).required(),
});

const registrationDateTime = Joi.object({
  'regWindowStartDateTime': Joi.date().utc().required(),
  'regWindowStopDateTime': Joi.date().utc().required(),
  'pageUrl': Joi.string().min(2).max(1500).trim(),
});

const testCardDetails = Joi.object({
  'color': Joi.string().min(2).max(60).trim().required(),
  'hasAppeared': Joi.boolean(),
});

const testDateTime = Joi.object({ 
  'testStartDateTime': Joi.date().utc().required(),
  'testEndDateTime': Joi.date().utc().required(),});

const testDetails = Joi.object({
  'syllabus': Joi.string().min(2).max(1500).trim().required(),
  'eligibility': Joi.string().min(2).max(1500).trim().required(),
  'duration': Joi.string().min(2).max(1500).trim().required(),
  'testMode': Joi.string().min(2).max(1500).trim(),
  'target': Joi.string().min(2).max(1500).trim(),
  'testCard': testCardDetails,
});

const resultDateTime = Joi.object({
  'status': Joi.string().min(2).max(1500).trim(),
  'resultDateTime': Joi.date().utc().required(),
  'assessmentReportDateTime': Joi.date().utc().required(),
});

const testDataDetails = Joi.object({
  'testVersion': Joi.number().integer().min(1).max(99999).required(),
  'registrationActiveStatus': Joi.boolean().required(),
  'testActiveStatus': Joi.boolean().required(),
  'button': Joi.string().min(2).max(1500).trim().allow(null),
  'grade': gradeData,
  'registrationData': registrationDateTime,
  'testData': {testDateTime,testDetails},
  'resultStats': resultDateTime,
});

function updatePayloadValidationOfTestData(data, type) {
    const validationResult = {};
    try {
      if (!data || !type) {
        validationResult['success'] = false;
        validationResult['message'] = 'Updation failed due to empty field value';
        return validationResult;
      } else {
        let validationStatus = '';
        switch (type) {
          case gConst.registrationDate : validationStatus = registrationDateTime.validate({
            regWindowStartDateTime: data.regWindowStartDateTime,
            regWindowStopDateTime: data.regWindowStopDateTime,
            pageUrl : data.pageUrl
          });
            break;
          case gConst.testCardData: validationStatus = testCardDetails.validate({
            color: data.color
          });
            break;
          case gConst.registrationStatus: validationStatus = testDataDetails.validate({
            registrationActiveStatus: data.registrationActiveStatus
          });
            break;
          case gConst.testDate: validationStatus = testDateTime.validate({
            testStartDateTime: data.testStartDateTime,
            testEndDateTime: data.testEndDateTime
          });
            break;
          case gConst.resultdate: validationStatus = resultDateTime.validate({
            resultDateTime: data.resultDateTime,
            assessmentReportDateTime: data.assessmentReportDateTime
          });
            break;
          case gConst.testDetails: validationStatus = testDetails.validate({
            syllabus: data.syllabus,
            eligibility: data.eligibility,
            duration: data.duration,
            target : data.target,
            testMode : data.testMode
          });
            break;
        }
        if (validationStatus.error) {
          validationResult['success'] = false;
          validationResult['message'] = validationStatus.error.details[0].message;
          return validationResult;
        } else {
          validationResult['success'] = true;
          validationResult['message'] = 'Input data is valid';
          validationResult['value'] = validationStatus.value;
          return validationResult;
        }
      }
    } catch (err) {
      logger.error({ message: 'Validation failed', errorMessage: `${err}` });
      validationResult['success'] = false;
      validationResult['message'] = 'payload validation failed';
      return validationResult;
    }
  }

  module.exports = {updatePayloadValidationOfTestData}