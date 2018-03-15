'use strict';

const fs = require('fs');
const Utils = require('./utils');

/**
* @name Stor
* @summary Local data store
* @return {undefined}
*/
class Stor {
  /**
  * @name constructor
  * @description class contructor
  * @return {undefined}
  */
  constructor() {
    this.dataStor = {};
  }

  /**
  * @name load
  * @summary load data file
  * @param {string} filename - file path and name
  * @return {boolean} value - true if successful
  */
  load(filename) {
    this.filename = filename;
    let ret = false;
    try {
      let file = fs.readFileSync(filename, 'utf8');
      this.dataStor = Utils.safeJSONParse(file);
      ret = true;
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.log(e);
      }
    }
    return ret;
  }

  /**
  * @name save
  * @summary save data file
  * @return {boolean} value - true if successful
  */
  save() {
    let ret = false;
    try {
      let output = Utils.safeJSONStringify(this.dataStor);
      fs.writeFileSync(this.filename, output, 'utf8');
      ret = true;
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.log(e);
      }
    }
    return ret;
  }

  /**
  * @name get
  * @summary get a value based on key
  * @param {string} key - key where value can be found
  * @return {number, string, array, object} value
  */
  get(key) {
    return this.dataStor[key];
  }

  /**
  * @name set
  * @summary set a value based on key
  * @param {string} key - key where value will be stored
  * @return {undefined}
  */
  set(key, value) {
    this.dataStor[key] = value;
  }

  /**
  * @name view
  * @summary view local stor
  * @return {undefined}
  */
  view() {
    console.log(JSON.stringify(this.dataStor, null, 2));
  }

  /**
  * @name flush
  * @summary flush stor
  * @return {undefined}
  */
  flush() {
    this.dataStor = {};
    this.save();
  }

}

module.exports = new Stor();
