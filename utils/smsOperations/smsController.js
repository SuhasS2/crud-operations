'use strict';

const axios = require('axios');
const logger = require('../../config/logger');

/**
 *
 * @param {Number} number
 * @param {String} message
 */
function sendSMS(number, message) {
  try {
    if (parseInt(process.env.SMS_SERVICE) === 1) {
      axios.get(`${process.env.GUPSHUP_API}?method=SendMessage&msg=${encodeURIComponent(message)}&msg_type=TEXT&userid=${process.env.GUPSHUP_USER}&auth_scheme=plain&password=${encodeURIComponent(process.env.GUPSHUP_PASS)}&v=1.1&format=text&send_to=${number}`);
    }
  } catch (err) {
    logger.error({message: 'Error in SMS Service', error: `${err}`});
  }
}

module.exports = {sendSMS};
