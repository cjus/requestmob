'use strict';

const fs = require('fs');
const path = require('path');


/**
* @name Processor
* @summary Command processor
* @return {undefined}
*/
class CommandProcessor {
  /**
  * @name constructor
  * @description class contructor
  * @return {undefined}
  */
  constructor() {
    this.commandMap = {};
  }

  /**
  * @name init
  * @summary init commands
  * @param {object} config - configuration
  * @return {undefined}
  */
  init(config) {
    this.config = config;
    this.http = null;
    this.ws = null;
    fs.readdirSync(config.actionsPath).
      forEach((file) => {
        let baseName = path.basename(file, '.js');
        this.commandMap[baseName] = {
          name: baseName,
          module: new (require(`../actions/${file}`))
        };
      });
  }

  /**
  * @name getComandList
  * @summary get list of command
  * @return {array} arr - array of command object names and descriptions
  */
  getCommandlist() {
    let arr = [];
    Object.keys(this.commandMap).forEach((commandName) => {
      let command = this.commandMap[commandName];
      arr.push({
        name: commandName,
        description: this.commandMap[commandName].module.getDescription()
      });
    });
    return arr;
  }

  /**
  * @name executeCommand
  * @summary execute a command
  * @param {string} name - name of command
  * @param {object} stor - storage object
  * @return {object} json
  */
  executeCommand(name, stor) {
    if (!this.commandMap[name]) {
      throw new Error(`Warning, unknown command: ${name}`);
    }
    return this.commandMap[name].module.execute(this.http, this.ws, stor);
  }
}

module.exports = new CommandProcessor();
