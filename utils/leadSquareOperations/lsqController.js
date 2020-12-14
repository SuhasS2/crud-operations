'use strict';

const axios = require('axios');
const dateformat = require('dateformat');
// Config
const logger = require('../../config/logger');
const currentTime = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');

/**
 *
 * @param {Number} number
 */
async function findLead(number) {
  const leadDetails = {};
  try {
    if (number) {
    // Call LSQ FIND LEAD API.
      const findALead = await axios.get(`${process.env.LS_FIND_LEAD}?accessKey=${process.env.LS_ACCESS}&secretKey=${process.env.LS_SECRET}&phone=${number}`);
      // return an object with success boolean and along with the phone number and prospect id of that phone number.
      if (findALead.data[0]) {
        leadDetails['success'] = true;
        leadDetails['phoneNumber'] = parseInt(number);
        leadDetails['prospectID'] = findALead.data[0].ProspectID;
        logger.info({messge: leadDetails});
        return leadDetails;
      } else {
        leadDetails['success'] = false;
        leadDetails['phoneNumber'] = number;
        leadDetails['message'] = 'No Record Found, Please check the number and create a lead';
        logger.info({message: leadDetails});
        return leadDetails;
      }
    } else {
      leadDetails['success'] = false;
      leadDetails['message'] = 'Please provide a Phone Number';
      logger.info({message: leadDetails});
      return leadDetails;
    }
  } catch (err) {
    logger.error({message: 'LSQ Find API Fail', errorMessage: `${err}`});
  }
}

/**
 *
 * @param {String} prospectID
 * @param {Number} activityNo
 */
async function checkLeadActivity(prospectID, activityNo) {
  const activityDetails = {};
  try {
    if (!prospectID || !activityNo) {
      activityDetails['success'] = false;
      activityDetails['message'] = 'Please provide both prospectID and activityNo values';
      logger.info({message: activityDetails});
      return activityDetails;
    } else {
      const findActivity = await axios.post(`${process.env.LS_CHECK_ACTIVITY}?accessKey=${process.env.LS_ACCESS}&secretKey=${process.env.LS_SECRET}&leadId=${prospectID}`, {'Parameter': {'ActivityEvent': activityNo}});
      if (findActivity.data.RecordCount === 0) {
        activityDetails['success'] = true;
        activityDetails['message'] = 'Update Lead Activity';
        logger.info({message: activityDetails});
        return activityDetails;
      } else {
        activityDetails['success'] = false;
        activityDetails['message'] = 'Activity is already updated';
        logger.info({message: activityDetails});
        return activityDetails;
      }
    }
  } catch (err) {
    logger.error({message: 'LSQ Check Activity API Fail', errorMessage: `${err}`});
  }
}

/**
 *
 * @param {String} prospectID
 * @param {Number} lsqEventID
 * @param {String} lsqEventNote
 */
async function updateLeadActivity(prospectID, lsqEventID, lsqEventNote) {
  const updateActivityDetails = {};
  try {
    if (!prospectID || !lsqEventID || !lsqEventNote) {
      updateActivityDetails['success'] = false;
      updateActivityDetails['message'] = 'Please provide prospectID or lsqEventID or lsqEventNote values';
      logger.info({message: updateActivityDetails});
      return updateActivityDetails;
    } else {
      const buildActivityDetails = {
        'RelatedProspectId': `${prospectID}`,
        'ActivityDateTime': `${currentTime}`,
        'ActivityEvent': lsqEventID,
        'ActivityNote': `${lsqEventNote}`,
      };
      const activityUpdate = await axios.post(`${process.env.LS_UPDATE_ACTIVITY}?accessKey=${process.env.LS_ACCESS}&secretKey=${process.env.LS_SECRET}`, buildActivityDetails);
      if (activityUpdate.data.Status === 'Success') {
        updateActivityDetails['success'] = true;
        updateActivityDetails['message'] = 'Lead Activity Updated Successsfully';
        logger.info({message: updateActivityDetails});
        return updateActivityDetails;
      } else {
        updateActivityDetails['success'] = false;
        return updateActivityDetails;
      }
    }
  } catch (err) {
    logger.error({message: 'LSQ Update Activity API Fail', errorMessage: `${err}`});
  }
}

/**
 *
 * @param {String} name
 * @param {Number} number
 * @param {String} email
 * @param {Number} classNo
 * @param {String} schoolName
 * @param {Number} lsqActivityID
 * @param {String} lsqActivityNote
 * @return {Object}
 */
function createBstLeadDetails(name, number, email, classNo, schoolName, lsqActivityID, lsqActivityNote) {
  const createNewLead = {
    'LeadDetails': [
      {
        'Attribute': 'FirstName',
        'Value': `${name}`,
      }, {
        'Attribute': 'Phone',
        'Value': parseInt(number),
      }, {
        'Attribute': 'EmailAddress',
        'Value': `${email}`,
      }, {
        'Attribute': 'mx_Course_Name',
        'Value': parseInt(classNo),
      }, {
        'Attribute': 'mx_School',
        'Value': `${schoolName}`,
      },
    ],
    'Activity': {
      'ActivityEvent': parseInt(lsqActivityID),
      'ActivityNote': `${lsqActivityNote}`,
      'ActivityDateTime': `${currentTime}`,
    },
  };

  return createNewLead;
}

/**
 *
 * @param {Object} registeredData
 * @param {Number} lsqActivityID
 * @param {String} lsqActivityNote
 * @return {Object}
 */
function createBnatV2LeadDetails(registeredData, lsqActivityID, lsqActivityNote) {
  const createNewLead = {
    'LeadDetails': [{
      'Attribute': 'FirstName',
      'Value': registeredData.name,
    }, {
      'Attribute': 'EmailAddress',
      'Value': registeredData.emailId,
    }, {
      'Attribute': 'Phone',
      'Value': registeredData.phoneNumber,
    }, {
      'Attribute': 'mx_City',
      'Value': registeredData.city,
    }, {
      'Attribute': 'mx_Course_Name',
      'Value': registeredData.class,
    }, {
      'Attribute': 'SourceCampaign',
      'Value': registeredData.utmCampaign,
    }, {
      'Attribute': 'SourceContent',
      'Value': registeredData.utmContent,
    }, {
      'Attribute': 'SourceMedium',
      'Value': registeredData.utmSource,
    }],
    'Activity': {
      'ActivityEvent': parseInt(lsqActivityID),
      'ActivityNote': `${lsqActivityNote}`,
      'ActivityDateTime': `${currentTime}`,
    },
  };

  return createNewLead;
}

/**
 *
 * @param {Object} leadData
 */
async function createFreshLead(leadData) {
  try {
    const freshLead = await axios.post(`${process.env.LS_CREATE_LEAD_AND_ACTIVITY}?accessKey=${process.env.LS_ACCESS}&secretKey=${process.env.LS_SECRET}`, leadData);
    logger.info({message: freshLead.data});
    return freshLead.data;
  } catch (err) {
    logger.error({message: 'LSQ Create Lead & Activity API Fail', errorMessage: `${err}`});
  }
}

module.exports = {findLead, checkLeadActivity, updateLeadActivity, createBstLeadDetails, createBnatV2LeadDetails, createFreshLead};
