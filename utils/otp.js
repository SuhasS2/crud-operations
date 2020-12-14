/* eslint-disable new-cap */
'use strict';

const gConst = require('../gConstants');
// Models
const oModel = require('../models/otpStats');
// SMS Service
const logger = require('../config/logger');
const buildMsg = require('../controllers/registration').sendConfirmation;
const mongoose = require('mongoose');

/**
 *
 * @param {Number} number
 */
async function generateOtp(number) {
  try {
    const OTP = Math.floor(gConst.oneK + Math.random() * gConst.nineK);
    const getId = await oModel.collection.insertOne({phoneNumber: parseInt(number), otpValue: OTP, created_at: new Date()});
    const msgGroup = gConst.otpTemplate;
    buildMsg(null, msgGroup, null, OTP, number, null);
    return getId.insertedId;
  } catch (err) {
    logger.error({message: 'Unable to save to DB', errorMessage: `${err}`});
  }
}

/**
 *
 * @param {String} id
 * @param {Number} mobile
 * @param {Number} otp
 */
async function validateOtp(id, mobile, otp) {
  const otpValidateStats = {};
  const getValue = await oModel.findOne({$and: [{_id: mongoose.Types.ObjectId(id)}, {phoneNumber: mobile}]});
  const otpGeneratedTime = Math.floor(getValue.created_at/gConst.oneK);
  const otpReceivedTime = Math.floor(Date.now()/gConst.oneK);
  const timeDiff = otpReceivedTime - otpGeneratedTime;
  if (timeDiff >= gConst.otpExp) {
    await oModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {$set: {otpValue: null, isVerified: false}}, {upsert: false});
    otpValidateStats['success'] = false;
    otpValidateStats['message'] = 'OTP has expired! Request for a new OTP';
    return otpValidateStats;
  } else if (getValue.otpValue === parseInt(otp)) {
    await oModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {$set: {otpValue: null, isVerified: true}}, {upsert: false});
    otpValidateStats['success'] = true;
    otpValidateStats['message'] = 'OTP Verified';
    return otpValidateStats;
  } else {
    await oModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {$set: {isVerified: false}}, {upsert: false});
    otpValidateStats['success'] = false;
    otpValidateStats['message'] = 'Entered OTP is incorrect.';
    return otpValidateStats;
  }
}

module.exports = {generateOtp, validateOtp};
