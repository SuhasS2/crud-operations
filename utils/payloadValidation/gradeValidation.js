'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const logger = require('../../config/logger');
const gradePattern = /^([A-Za-z0-9_]+\.?\s?)+$/;

const gradePayload = Joi.object({
  gradeName: Joi.string().min(1).max(255).trim().regex(gradePattern).required(),
  gradeValue: Joi.number().min(4).max(12).required(),
  gradeGroup: Joi.string().min(1).max(255).trim().regex(gradePattern).required(),
});

/**
 *
 * @param {Object} data
 * @return {Object}
 */
function gradeValidation(data) {
  const validationResult = {};
  try {
    const validationStats = gradePayload.validate(data);
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
  } catch (err) {
    logger.error({message: 'Unable to validate the given payload', errorMessage: `${err}`});
    validationResult['success'] = false;
    validationResult['message'] = 'Error in payload validation';
    return validationResult;
  }
}

module.exports = {gradeValidation};
