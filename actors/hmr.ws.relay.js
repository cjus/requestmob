'use strict';

const Actor = require('./actor');
const WSClient = require('../lib/wsClient');


/**
* @name HMRWsRelay
* @summary Call HMRWsRelay endpoint
* @return {undefined}
*/
module.exports = class HMRWsRelay extends Actor {
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
    return 'Call HMR websocket reply endpoint';
  }

  /**
  * @name execute
  * @summary execute module
  * @param {string} actorName - name of actor
  * @return {undefined}
  */
  async execute(actorName) {
    let messageHandler = (msg) => {
      if (msg.rmid) { // only track messages with rmid's
        this.logStat(actorName, 'process', msg.rmid);
      }
    };

    let wsClient = new WSClient();
    let msg = wsClient.createMessage({
      "bdy": {
        "ts": "00:00:01.0050",
        "datum": { "rpm": "58", "torq": "18", "tp": "0.25521" }
      }
    });

    try {
      await wsClient.open('ws://localhost:5353', messageHandler);
      this.logStat(actorName, 'request', msg.mid);
      wsClient.sendMessage(JSON.stringify(msg));
    } catch (e) {
      this.logStat(actorName, 'error', msg.mid);
    }
  }
}
