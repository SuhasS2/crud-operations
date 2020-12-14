'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeData = new Schema({
  gradeValue: Number,
  gradeGroup: String,
  academicGroup: String,
  questionPaperId: Array,
});

const registrationMetaData = new Schema({
  regWindowStartDateTime: Date,
  regWindowStopDateTime: Date,
  pageUrl: String,
});

const testCardData = new Schema({
  color: String,
  hasAppeared: Boolean,
});

const testMetaData = new Schema({
  testStartDateTime: Date,
  testEndDateTime: Date,
  syllabus: String,
  eligibility: String,
  duration: String,
  testMode: String,
  target: String,
  testCard: testCardData,
});

const resultMetaData = new Schema({
  status: String,
  resultDateTime: Date,
  assessmentReportDateTime: Date,
});

const testDetails = new Schema({
  testVersion: Number,
  registrationActiveStatus: Boolean,
  testActiveStatus: Boolean,
  button: String,
  grade: gradeData,
  registrationData: registrationMetaData,
  testData: testMetaData,
  resultStats: resultMetaData,
});

module.exports = mongoose.model('testdetails', testDetails);
