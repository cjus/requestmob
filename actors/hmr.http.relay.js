'use strict';

const Actor = require('./actor');
const ServerRequest = require('../lib/server-request');

/**
* @name HMRHttpRelay
* @summary Call HMRHttpRelay endpoint
* @return {undefined}
*/
module.exports = class HMRHttpRelay extends Actor {
  /**
  * @name constructor
  * @description class contructor
  * @return {undefined}
  */
  constructor() {
    super();
  }

  /**
  * @name getDescription
  * @summary return module description
  * @return {string} description - module description
  */
  getDescription() {
    return 'Call HMR HTTP reply endpoint';
  }

  /**
  * @name execute
  * @summary execute module
  * @param {string} actorName - name of actor
  * @return {undefined}
  */
  async execute(actorName) {
    let serverRequest = new ServerRequest();
    let requestID = this.getRequestID();
    let result;
    try {
      this.logStat(actorName, 'request', requestID);
      result = await serverRequest.send({
        host: 'localhost',
        port: 5353,
        method: 'get',
        path: '/v1/hmr/relay'
      });
      this.logStat(actorName, 'process', requestID);
    } catch (e) {
      result = {
        error: e
      };
      this.logStat(actorName, 'error', requestID);
    }
  }
}
