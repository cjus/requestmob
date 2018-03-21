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
    fs.readdirSync(config.actorsPath).
      forEach((file) => {
        let baseName = path.basename(file, '.js');
        if (baseName !== 'actor') {
          let MOD = require(`../actors/${file}`);
          let mod = new MOD(config[baseName] || {});
          this.commandMap[baseName] = {
            name: baseName,
            module: mod
          };
        }
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
  * @param {string} actorName - name of actor
  * @return {object} json
  */
  executeCommand(actorName) {
    if (!this.commandMap[actorName]) {
      throw new Error(`Warning, unknown actor: ${actorName}`);
    }
    this.commandMap[actorName].module.execute(actorName);
  }
}

module.exports = new CommandProcessor();
