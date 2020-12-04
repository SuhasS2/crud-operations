"use strict";
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const stringPattern = /^[a-zA-Z-]+$/;

const testMetaDataValidation = Joi.object().keys({
    grade : Joi.string().min(1).trim().regex().required(),
    registrationStartDate : Joi.date().iso().required(),
    registrationStoptDate : Joi.date().iso().required(),
    testStartDate : Joi.date().iso().required(),
    testStopDate : Joi.date().iso().required()
});

async function schemaValidation(inputArrayValue, schemaType) {
    const addedValue = [];
  
    if (inputArrayValue.length > 0) {
      for (let i = 0; i<inputArrayValue.length; i++) {
        const {error, value} = Joi.validate(inputArrayValue[i], schemaType);
        if (error) {
          console.log(' Record cannot be validated against DB Schema', error);
          break;
        } else {
          addedValue.push(value);
        }
      }
      return uploadValue;
    } else {
      const {error, value} = Joi.validate(inputArrayValue, schemaType);
      if (error) {
        console.log('Record cannot be validated against the schema', error);
      } else {
        uploadValue.push(value);
      }
      return uploadValue;
    }
  }

  module.exports = {schemaValidation};