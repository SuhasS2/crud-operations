'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const logger = require('../../config/logger');
const allowDomains = process.env.ALLOWED_EMAIL_DOMAINS.split(',');
const gConst = require('../../gConstants');
const alphabetPattern = /^([A-Za-z]+\.?\s?)+$/;
// const alPattern = /^([A-Za-z]+[\s]?)+$/;
const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

const numberValidator = Joi.object({
  phoneNumber: Joi.number().integer().min(1111111111).max(9999999999).required(),
  page: Joi.string().trim(),
});

const bnatV2RegistrationPayload = Joi.object({
  firstName: Joi.string().min(1).max(255).trim().regex(alphabetPattern).required(),
  lastName: Joi.string().min(1).max(255).trim().regex(alphabetPattern).required(),
  emailId: Joi.string().trim().max(255).regex(emailpattern).email({minDomainSegments: 2, tlds: {allow: allowDomains}}).required(),
  phoneNumber: Joi.number().integer().min(1111111111).max(9999999999).required(),
  dob: Joi.date().format('YYYY-MM-DD').utc().required(),
  board: Joi.string().min(2).max(255).trim().required(),
  city: Joi.string().min(2).max(255).trim().required(),
  state: Joi.string().min(2).max(255).trim().required(),
  testQualification: Joi.array().items(Joi.string()).min(1).allow(null),
  school: Joi.string().allow(null),
  grade: Joi.string().required(),
  interestedIn: Joi.string().max(255).required(),
  phVerification: Joi.boolean().required(),
  url: Joi.string().min(2).max(1500).trim().allow(null),
  utmCampaign: Joi.string().min(2).max(255).trim().allow(null),
  utmSource: Joi.string().min(2).max(255).trim().allow(null),
  utmContent: Joi.string().min(2).max(255).trim().allow(null),
  page: Joi.string().trim(),
});

const bnatK10RegistrationPayload = Joi.object({
  firstName: Joi.string().min(1).max(255).trim().regex(alphabetPattern).required(),
  lastName: Joi.string().min(1).max(255).trim().regex(alphabetPattern).required(),
  emailId: Joi.string().trim().max(255).regex(emailpattern).email({minDomainSegments: 2, tlds: {allow: allowDomains}}).required(),
  phoneNumber: Joi.number().integer().min(1111111111).max(9999999999).required(),
  dob: Joi.date().format('YYYY-MM-DD').utc().required(),
  board: Joi.string().min(2).max(255).trim().required(),
  city: Joi.string().min(2).max(255).trim().required(),
  state: Joi.string().min(2).max(255).trim().required(),
  testQualification: Joi.array().items(Joi.string()).min(1).allow(null),
  school: Joi.string().allow(null),
  grade: Joi.string().required(),
  interestedIn: Joi.string().max(255),
  phVerification: Joi.boolean().required(),
  url: Joi.string().min(2).max(1500).trim().allow(null),
  utmCampaign: Joi.string().min(2).max(255).trim().allow(null),
  utmSource: Joi.string().min(2).max(255).trim().allow(null),
  utmContent: Joi.string().min(2).max(255).trim().allow(null),
  page: Joi.string().trim(),
});

/**
 *
 * @param {Object} data
 * @param {String} type
 * @param {String} test
 * @param {String} page
 * @return {Object}
 */
function payloadValidation(data, type, test, page) {
  const testPage = `${test}-${page}`;
  const validationResult = {};
  try {
    if (!data || !type) {
      validationResult['success'] = false;
      validationResult['message'] = 'Type and data both are required for validation';
      return validationResult;
    } else {
      if (type === 'Register') {
        let validationStats = {};
        switch (testPage) {
          case `${gConst.bnatV2Test}-${gConst.JEEPage}`: validationStats = bnatV2RegistrationPayload.validate(data);
            break;
          case `${gConst.bnatV2Test}-${gConst.K10Page}`: validationStats = bnatK10RegistrationPayload.validate(data);
            break;
        }
        if (validationStats.error) {
          validationResult['success'] = false;
          validationResult['message'] = validationStats.error.details[0].message;
          return validationResult;
        } else {
          validationResult['success'] = true;
          validationResult['message'] = 'Registration payload is valid';
          validationResult['value'] = validationStats.value;
          return validationResult;
        }
      } else if (type === 'Phone') {
        const validationStats = numberValidator.validate({phoneNumber: data.phoneNumber});
        if (validationStats.error) {
          validationResult['success'] = false;
          validationResult['message'] = validationStats.error.details[0].message;
          return validationResult;
        } else {
          validationResult['success'] = true;
          validationResult['message'] = 'Phone number payload is valid';
          validationResult['value'] = validationStats.value;
          return validationResult;
        }
      } else {
        validationResult['success'] = false;
        return validationResult;
      }
    }
  } catch (err) {
    logger.error({message: 'Unable to validate the given payload', errorMessage: `${err}`});
    validationResult['success'] = false;
    validationResult['message'] = 'Payload validation errored!';
    return validationResult;
  }
}

module.exports = {payloadValidation};

