'use strict';

// JOI Validation Type
const register = 'Register';
const phone = 'Phone';
// Numeric Constants
const oneK = 1000;
const nineK = 9000;
const otpExp = 300;
const oneM = 60;
const otpExpires = Math.floor(otpExp/oneM);
// Password Range
const pswdMin = 111111;
const pswdMax = 999999;
// Landing Pages
const bnatLandingPage = process.env.BNAT_LANDING_PAGE;
const bnatExamDateTime = process.env.EXAMDATE;
// Test Names
const bnatV2Test = 'BNAT';
// Generic Constants
const emptyPayload = 'Payload cannot be empty';
const registerSuccess = 'Thank you for registering!';
const numberExists = 'You have already registered. Please login using your mobile number and password below.';
const numberNotVerified = 'Mobile number is not registered';
const noPhoneNumber = 'Please provide a verified mobile number';
const registerFail = 'Unsuccessful Registration!';
const loginSuccess = 'Successful Login!!';
const pwdIncorrect = 'Incorrect Password';
const mobileNoRequired = 'Mobile Number is requried';
const frgtPswd = 'Please check your Email/SMS for password!';
const pswdRequired = 'Password is requried!';
const rateLimitMaxReg = parseInt(process.env.MAX_RATE);
const tokenExpireTime = process.env.JWT_TOKEN_LIFE;
const userDomain = 'byjus.com';
const examDay = process.env.EXAMDAY;
const examTime = process.env.EXAMTIME;
const testVersion = parseInt(process.env.TEST_VERSION);
const gradeClass4to10 = 'Class_4_10';
const gradeClass11to12 = 'Class_11_12';
const regTemplate = 'Registration';
const forgotPasswordTemplate = 'Forgot Password';
const otpTemplate = 'OTP';
const JEEPage = 'JEE';
const K10Page = 'K10';
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const currentApiVersion = parseInt(process.env.API_VERSION);
const registrationStatus = 'registrationStatus';
const registrationDate = 'registrationDate';
const resultdate = 'resultdate';
const testCardData = 'testCardData';
const testDate = 'testDate';
const testDetails = 'testDetails';

module.exports = {register, phone, oneK, nineK, otpExp, oneM, otpExpires, pswdMin, pswdMax, bnatV2Test, emptyPayload, registerSuccess, numberExists, numberNotVerified, 
    registerFail, bnatLandingPage, bnatExamDateTime, noPhoneNumber, loginSuccess, pwdIncorrect, mobileNoRequired, frgtPswd, pswdRequired, rateLimitMaxReg, tokenExpireTime, 
    userDomain, examDay, examTime, testVersion, gradeClass4to10, gradeClass11to12, regTemplate, forgotPasswordTemplate, otpTemplate, JEEPage, K10Page, saltRounds, currentApiVersion,
registrationStatus,registrationDate,resultdate,testCardData,testDate,testDetails};
