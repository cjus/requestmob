'use strict';

/**
* @name StorFlush
* @summary Flush local stor contents
* @return {undefined}
*/
module.exports = class StorFlush {
  /**
  * @name constructor
  * @description class contructor
  * @return {undefined}
  */
  constructor() {
  }

  /**
  * @name getDescription
  * @summary return module description
  * @return {string} description - module description
  */
  getDescription() {
    return 'Flush local stor contents';
  }

  /**
  * @name execute
  * @summary execute module
  * @param {object} stor - storage object
  * @return {object} json - json return
  */
  async execute(stor) {
    stor.flush();
    return {};
  }
}
