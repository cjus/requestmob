#!/usr/bin/env node
'use strict';

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const version = require('./package.json').version;
const config = require('./config');
const processor = require('./lib/processor');
const stor = require('./lib/stor');
const Delay = require('./lib/delay');
const COMMAND_DELAY = 1000; // 1 second
const EXIT_DELAY = 250;

/**
* @name Program
* @summary Main program file
* @return {undefined}
*/
class Program {
  /**
  * @name constructor
  * @description main contructor
  * @return {undefined}
  */
  constructor() {
    config.actionsPath = require('path').join(__dirname, '/actions');
    processor.init(config);
  }

  /**
  * @name displayHelp
  * @description Display program help info
  * @return {undefined}
  */
  displayHelp() {
    console.log(`requestmob - Request Mob ${version}`);
    console.log('Usage: requestmob command1 command2 ...');
    console.log('');
    console.log('A tool for generating network request load');
    console.log('');
    console.log('Command IDs:');
    processor.getCommandlist().forEach((command) => {
      console.log(`  ${command.name} - ${command.description}`);
    });
    console.log('');
  }

  /**
  * @name main
  * @description entry point for command dispatch processing
  * @return {undefined}
  */
  async main() {
    if (!stor.load('./requestmob.json')) {
      stor.save();
    }
    stor.set('config', config);

    if (process.argv.length < 3) {
      this.displayHelp();
      this.exitApp();
      return;
    }

    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);

      let totalWorkers = numCPUs * 2;
      for (let i = 0; i < totalWorkers; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        // console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      // worker
      // console.log(`Worker ${process.pid} started`);

      let args = process.argv.slice(2);
      for (let command of args) {
        console.log(`\nProcessing: ${command}`);
        await Delay.sleep(COMMAND_DELAY);
        let result = await processor.executeCommand(command, stor);
        console.log(JSON.stringify(result, null, 2));
      }
      this.exitApp();
    }
  }

  /**
  * @name exitApp
  * @description properly exit this app
  * @return {undefined}
  */
  async exitApp() {
    await Delay.sleep(EXIT_DELAY);
    stor.save();
    process.exit();
  }
}

new Program().main();
