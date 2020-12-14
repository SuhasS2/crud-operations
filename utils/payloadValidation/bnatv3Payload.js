'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const allowDomains = process.env.ALLOWED_EMAIL_DOMAINS.split(',');
const alphabetPattern = /^([A-Za-z]+\.?\s?)+$/;
const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

const bnatv3RegPayload = Joi.object({
  name: Joi.string().min(1).max(255).trim().regex(alphabetPattern).required(),
  emailId: Joi.string().trim().max(255).regex(emailpattern).email({minDomainSegments: 2, tlds: {allow: allowDomains}}).required(),
  phoneNumber: Joi.number().integer().min(1111111111).max(9999999999).required(),
  dob: Joi.date().format('YYYY-MM-DD').utc().required(),
  city: Joi.string().min(2).max(255).trim().required(),
  state: Joi.string().min(2).max(255).trim().required(),
  targetExam: Joi.string().max(255).required(),
  grade: Joi.string().required(),
  url: Joi.string().min(2).max(1500).trim().allow(null),
});

const utmParams = Joi.object({
  utm_campaign: Joi.string().min(2).max(255).trim().allow(null),
  utm_source: Joi.string().min(2).max(255).trim().allow(null),
  utm_content: Joi.string().min(2).max(255).trim().allow(null),
  utm_medium: Joi.string().min(2).max(255).trim().allow(null),
});

/**
 *
 * @param {Object} data
 * @param {Object} type
 * @return {Object}
 */
function validate(data, type) {
  const validationResult = {};
  if (!data || !type) {
    validationResult['success'] = false;
    validationResult['message'] = 'Payload is required for validation';
    return validationResult;
  } else {
    let validationStats = '';
    switch (type) {
      case 'register': validationStats = bnatv3RegPayload.validate(data);
        break;
      case 'utm': validationStats = utmParams.validate({utm_campaign: data.utm_campaign, utm_source: data.utm_source, utm_content: data.utm_content});
        break;
    }
    if (validationStats.error) {
      validationResult['success'] = false;
      validationResult['message'] = validationStats.error.details[0].message;
      return validationResult;
    } else {
      validationResult['success'] = true;
      validationResult['message'] = 'data is valid';
      validationResult['value'] = validationStats.value;
      return validationResult;
    }
  }
}

module.exports = {validate};
