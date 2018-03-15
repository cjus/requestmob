'use strict';

const ServerRequest = require('../lib/server-request');

/**
* @name HydraHealth
* @summary Call Hydra Health endpoint
* @return {undefined}
*/
module.exports = class HydraHealth {
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
    return 'Call Hydra Health endpoint';
  }

  /**
  * @name execute
  * @summary execute module
  * @param {object} stor - storage object
  * @return {object} json - json return
  */
  async execute(stor) {
    let serverRequest = new ServerRequest();
    let result = {};
    try {
      result = await serverRequest.send({
        host: 'localhost',
        port: 5353,
        method: 'get',
        path: '/v1/router/health'
      });
    } catch (e) {
      result = {
        error: e
      };
    }
    return result;
  }
}
