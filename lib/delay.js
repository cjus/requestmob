'use strict';

/**
* @name Delay
* @summary program delay with sleep method
* @return {undefined}
*/
class Delay {
  /**
  * @name sleep
  * @summary sleep method
  * @param {number} ms - delay in millisconds
  * @return {object} promise - resolves on setTimeout
  */
  static sleep(ms) {
    let timeout = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    return timeout(ms);
  }
}

module.exports = Delay;
