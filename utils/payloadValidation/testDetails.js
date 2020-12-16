'use strict';

const { expression, date } = require('joi');
const { validate } = require('../../models/bnatTestData');

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));


const gradeData = Joi.object({
  'gradeValue': Joi.number().integer().min(1).max(13).required(),
  'gradeGroup': Joi.string().trim().required(),
  'academicGroup': Joi.string().trim().required(),
  'questionPaperId': Joi.array().items(Joi.number()).required(),
});

const regData = Joi.object({
  'regWindowStartDateTime': Joi.date().utc().required(),
  'regWindowStopDateTime': Joi.date().utc().required(),
  'pageUrl': Joi.string().min(2).max(1500).trim().required(),
});

const testCardDetails = Joi.object({
  'color': Joi.string().min(2).max(60).trim().required(),
  'hasAppeared': Joi.boolean().required(),
});

const testDetails = Joi.object({
  'testStartDateTime': Joi.date().utc().required(),
  'testEndDateTime': Joi.date().utc().required(),
  'syllabus': Joi.string().min(2).max(1500).trim().required(),
  'eligibility': Joi.string().min(2).max(1500).trim().required(),
  'duration': Joi.string().min(2).max(1500).trim().required(),
  'testMode': Joi.string().min(2).max(1500).trim().required(),
  'target': Joi.string().min(2).max(1500).trim().required(),
  'testCard': testCardDetails,
});

const resultDetails = Joi.object({
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
  'registrationData': regData,
  'testData': testDetails,
  'resultStats': resultDetails,
});

/**
 *
 * @param {Object} data
 * @return {Object}
 */
function payloadValidation(data) {
  const validationResult = {};
  if (!data) {
    validationResult['success'] = false;
    validationResult['message'] = 'Data cannot be empty';
    return validationResult;
  } else {
    const validationStats = testDataDetails.validate(data);
    if (validationStats.error) {
      validationResult['success'] = false;
      validationResult['message'] = validationStats.error.details[0].message;
      return validationResult;
    } else {
      validationResult['success'] = true;
      validationResult['message'] = 'Grade data is valid';
      validationResult['value'] = validationStats.value;
      return validationResult;
    }
  }
}


/*
function updatePayloadValidationOfTestCardData(data) {
  const testCardValidation = {};
  if (!data) {
    testCardValidation['success'] = false;
    testCardValidation['message'] = 'Updation failed due to empty field value';
    return testCardValidation;
  } else {
    const updateStatus = testDataDetails.validate(data);
    if (updateStatus.error) {
      testCardValidation['success'] = false;
      testCardValidation['message'] = updateStatus.error.details[0].message;
      return testCardValidation;
    } else {
      testCardValidation['success'] = true;
      testCardValidation['message'] = 'Input data is valid';
      testCardValidation['value'] = updateStatus.value;
    }
  }
}

function updatePayloadValidationofTestDateTime(data) {
  const testDateTimeValidation = {};
  if (!data) {
    testDateTimeValidation['success'] = false;
    testDateTimeValidation['message'] = 'Updation failed due to empty field value';
    return testDateTimeValidation;
  } else {
    const updateStatus = testDataDetails.validate(data);
    if (updateStatus.error) {
      testDateTimeValidation['success'] = false;
      testDateTimeValidation['message'] = updateStatus.error.details[0].message;
      return testDateTimeValidation;
    } else {
      testDateTimeValidation['success'] = true;
      testDateTimeValidation['message'] = 'Input data is valid';
      testDateTimeValidation['value'] = updateStatus.value;
    }
  }
}

function updatePayloadValidationOfSyllabus(data) {
  const syllabusEligibilityValidation = {};
  if (!data) {
    syllabusEligibilityValidation['success'] = false;
    syllabusEligibilityValidation['message'] = 'Updation failed due to empty field value';
    return syllabusEligibilityValidation;
  } else {
    const updateStatus = testDataDetails.validate(data);
    if (updateStatus.error) {
      syllabusEligibilityValidation['success'] = false;
      syllabusEligibilityValidation['message'] = updateStatus.error.details[0].message;
      return syllabusEligibilityValidation;
    } else {
      syllabusEligibilityValidation['success'] = true;
      syllabusEligibilityValidation['message'] = 'Input data is valid';
      syllabusEligibilityValidation['value'] = updateStatus.value;
    }
  }
}

function updatePayloadValidationOfResultDateTime(data) {
  const updateVadlidationResultDateTime = {};
  if (!data) {
    updateVadlidationResultDateTime['success'] = false;
    updateVadlidationResultDateTime['message'] = 'Updation failed due to empty field value';
    return updateVadlidationResultDateTime;
  } else {
    const updateStatus = testDataDetails.validate(data);
    if (updateStatus.error) {
      updateVadlidationResultDateTime['success'] = false;
      updateVadlidationResultDateTime['message'] = updateStatus.error.details[0].message;
      return updateVadlidationResultDateTime;
    } else {
      updateVadlidationResultDateTime['success'] = true;
      updateVadlidationResultDateTime['message'] = 'Input data is valid';
      updateVadlidationResultDateTime['value'] = updateStatus.value;
    }
  }
}

function updatePayloadValidationOfRegStatus(data) {
  const regStatusValidation = {};
  if (!data) {
    regStatusValidation['success'] = false;
    regStatusValidation['message'] = 'Updation failed due to empty field value';
    return regStatusValidation;
  } else {
    const updateStatus = testDataDetails.validate(data);
    if (updateStatus.error) {
      regStatusValidation['success'] = false;
      regStatusValidation['message'] = updateStatus.error.details[0].message;
      return regStatusValidation;
    } else {
      regStatusValidation['success'] = true;
      regStatusValidation['message'] = 'Input data is valid';
      regStatusValidation['value'] = updateStatus.value;
    }
  }
}*/


module.exports = {payloadValidation} //updatePayloadValidationOfRegStatus, updatePayloadValidationOfResultDateTime, updatePayloadValidationOfSyllabus,
 // updatePayloadValidationOfTestCardData, updatePayloadValidationofTestDateTime
//};
