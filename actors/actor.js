'use strict';

const uuid = require('uuid');

module.exports = class Actor {
  /**
  * @name constructor
  * @description class contructor
  * @return {undefined}
  */
  constructor() {

  }

  /**
  * @name getRequestID
  * @description return a guest request ID
  * @return {string} request id
  */
  getRequestID() {
    return uuid.v4();
  }

  /**
   * @name logStat
   * @description log a stat
   * @param {string} actorName - actor name
   * @param {string} type - log entry type
   */
  logStat(actorName, type, requestID) {
    process.send({ actorName, type, requestID });
  }

}

