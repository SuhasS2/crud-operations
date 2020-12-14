'use strict';

const logger = require('../config/logger');
const lModel = require('../models/login');
const gConst = require('../gConstants');

/**
 *
 * @param {String} testValue
 */
async function uniquePassword(testValue) {
  try {
    const pswdArray = await lModel.find({testName: testValue}, {_id: 0, password: 1});
    const generateCode = generateFrmRange(gConst.pswdMin, gConst.pswdMax);
    const mapPswdArr = pswdArray.map((obj) => obj.password);

    if (mapPswdArr.indexOf(generateCode) < 0) {
      return generateCode;
    } else {
      const generateNewCode = generateFrmRange(gConst.pswdMin, gConst.pswdMax);
      return generateNewCode;
    }
  } catch (err) {
    logger.error({message: 'Password generator function fail', errorMessage: `${err}`});
  }
}

/**
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function generateFrmRange(min, max) {
  return (Math.floor(Math.random() * (max - min)) + min);
}

/**
 *
 * @param {String} name
 * @param {Number} number
 * @param {Date} dob
 * @return {String}
 */
function bnatV2PwdFormat(name, number, dob) {
  const part1 = name.replace(/[\. ]+/g, '').substring(0, 4).toLowerCase();

  const part2 = number.toString();
  const p2 = part2.substring(part2.length - 4);

  const part3 = dob.getDate();
  const p3 = get2Digit(part3);

  const part4 = dob.getMonth()+1;
  const p4 = get2Digit(part4);

  const pwd = `${part1}${p2}${p3}${p4}`;
  return pwd;
}

/**
 *
 * @param {Number} number
 * @return {String}
 */
function get2Digit(number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

module.exports = {uniquePassword, bnatV2PwdFormat};
