# Request Mob
The angry mob load generation tool

![](./mob.png)

Request Mob is a load generation / testing tool. As a command line tool it will execute test scripts (called actors) on every CPU core on the machine it runs on.
A mob "actor" is a script which who represent a particular type of network client. That client might be an HTTP or WebSocket client or both if you wish.

You execute request mob by first specfiying the duration of the test in seconds.  The parameters that follow indicate the name of the actors you'd like to execute during the test duration.

For example, here we execute an actor call `hydra.health`:

```shell
$ node requestMob 10 hydra.health
```

## Other run options

You can install requestmob globally using:

```shell
$ npm install -g requestmob
```

Or you can run requestmob via a docker container using the `reqestmob` shell script which you can copy to /usr/bin/local or execute directly.

In both cases make sure that the directory where you execute the requestmob command contains both a config directory (with a config.json file) and an `actors` subdirectory with your test scripts.

```
.
├── actors
│   ├── actor.js
│   ├── hmr.http.relay.js
│   ├── hmr.ws.relay.c100.d60.js
│   ├── hmr.ws.relay.js
│   └── hydra.health.js
└── config
    └── config.json
```

## Building custom actors

An actor is a node script which sits inside of the actors subdirectory and which derives from the actor.js base class.

Each actor script requires a class with two functions: 1) constructor() 2) execute(). Actors also require a configuration entry in the config.json file.

```js
{
  "hmr.http.relay": {
    "description": "Call HMR HTTP relay endpoint",
    "host": "localhost",
    "port": 5353
  },
  "hmr.ws.relay": {
    "description": "Call HMR websocket relay endpoint",
    "wsTarget": "ws://localhost:5353"
  },
  "hmr.ws.relay.c100.d60": {
    "description": "Call HMR websocket repay endpoint using 100 clients for 60 seconds",
    "wsTarget": "ws://localhost:5353"
  },
  "hydra.health": {
    "description": "Call Hydra Health endpoint",
    "host": "localhost",
    "port": 5353
  }
}
```

A config entry consist of a named branch - using the name of the actor script (minus the .js extension) and an object containing a description and any other keys the actor requires.

