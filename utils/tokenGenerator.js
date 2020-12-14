'use strict';

const jwt = require('jsonwebtoken');
const gConst = require('../gConstants');
const moment = require('moment');

/**
 *
 * @param {Object} payload
 * @param {Date} registeredDate
 * @param {String} tokenSecret
 * @return {String}
 */
function generateToken(payload, registeredDate, tokenSecret) {
  payload['verified_mobile'] = `+91-${payload.verified_mobile}`;
  const localDateTime = moment.parseZone(registeredDate).local().format();
  payload['registered_on'] = moment(localDateTime).format('DD-MM-YYYY');
  payload['registered_time'] = moment(localDateTime).format('HH:mm:ss');
  const getMonth = moment(payload.registeredDate).format('MMM');

  if ((payload.grade === 11) && (['Apr', 'May', 'Jun'].includes(getMonth))) {
    payload.exam_type = 'Regular';
  }


  const signToken = jwt.sign(payload, tokenSecret, {expiresIn: parseInt(gConst.tokenExpireTime)});
  return signToken;
}

/**
 *
 * @param {String} email
 * @param {String} tokenSecret
 * @return {String}
 */
function userToken(email, tokenSecret) {
  const payload = {
    emailId: email,
  };

  const signedToken = jwt.sign(payload, tokenSecret, {expiresIn: parseInt(gConst.tokenExpireTime)});
  return signedToken;
}

/**
 *
 * @param {String} record
 * @param {String} mobile
 * @param {Number} tokenSecret
 * @return {String}
 */
function documentToken(record, mobile, tokenSecret) {
  const payload = {
    id: record,
    mobile: mobile,
  };

  const signToken = jwt.sign(payload, tokenSecret, {expiresIn: parseInt(gConst.tokenExpireTime)});
  return signToken;
}

module.exports = {generateToken, userToken, documentToken};
