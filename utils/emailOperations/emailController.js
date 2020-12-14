'use strict';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const logger = require('../../config/logger');

/**
 *
 * @param {String} email
 * @param {String} emailSubject
 * @param {String} emailBody
 */
function sendEmail(email, emailSubject, emailBody) {
  try {
    const msg = {
      to: `${email}`,
      from: `BYJU'S Learning <${process.env.LEARNING}>`,
      subject: `${emailSubject}`,
      html: `${emailBody}`,
    };
    if (parseInt(process.env.EMAIL_SERVICE) === 1) {
      sgMail.send(msg);
    }
  } catch (err) {
    logger.error({message: 'Error in Email Service', error: `${err}`});
  }
}

module.exports = {sendEmail};
