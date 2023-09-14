'use strict';

var baseRedis = require('./baseRedis');

class matchingRedis extends baseRedis {

    constructor() {
        super();
        super.Init("127.0.0.1", "6379", "matchRedis", "0");
    }
}


module.exports = matchingRedis