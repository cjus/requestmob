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

  /**
   * @name doForDuration
   * @description perform an action for the length of duration at specific intervals
   * @param {number} duration - duration in milli-seconds
   * @param {number} interval - interval in milli-seconds per loop
   * @param {function} callback - function to clal each interval
   * @return {object} promise
   */
  doForDuration(duration, interval, callback) {
    return new Promise((resolve, _reject) => {
      let startTime = (new Date().getTime() / 1000) | 0;
      let timerHandle = setInterval(() => {
        let now = (new Date().getTime() / 1000) | 0;
        if (now > (startTime + (duration / 1000))) {
          clearInterval(timerHandle);
          resolve();
        } else {
          callback();
        }
      }, interval);
    });
  }
}

