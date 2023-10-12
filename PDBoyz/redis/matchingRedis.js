"use strict";

var redis = require("redis");

class matchingRedis {
    
  constructor(_host, _port, _db, _name) {

    this.host = _host;
    this.port = _port;
    this.db = _db;
    this.name = _name;

    this.redisClient = redis.createClient({
      config_redis,
    });

    this.redisClient.on("connect", () => {
      console.info("matching Redis connected!");
    });

    this.redisClient.on("error", (err) => {
      console.error("matching Redis client error", err);
    });

    this.redisClient.connect();
  }
}

module.exports = matchingRedis;
