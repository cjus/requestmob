'use strict';

/**
* @name StorView
* @summary View local stor contents
* @return {undefined}
*/
module.exports = class StorView {
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
    return 'View local stor contents';
  }

  /**
  * @name execute
  * @summary execute module
  * @param {object} http - http object
  * @param {object} ws - ws object
  * @param {object} stor - storage object
  * @return {object} json - json return
  */
  async execute(http, ws, stor) {
    stor.view();
    return {};
  }
}
