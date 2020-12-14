'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const allowDomains = process.env.ALLOWED_EMAIL_DOMAINS.split(',');
const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userLoginPayload = Joi.object({
  emailId: Joi.string().trim().max(255).regex(emailpattern).email({minDomainSegments: 2, tlds: {allow: allowDomains}}).required(),
});

/**
 *
 * @param {Object} data
 * @return {Object}
 */
function payLoadValidation(data) {
  const validationResult = {};
  if (!data) {
    validationResult['success'] = false;
    validationResult['message'] = 'Email ID is required for validation';
    return validationResult;
  } else {
    const validationStats = userLoginPayload.validate(data);
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
  }
}

module.exports = {payLoadValidation};
