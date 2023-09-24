"use strict";

var redis = require("redis");

class userRedis {
  constructor(_host, _port, _db, _name) {
    this.host = _host;
    this.port = _port;
    this.db = _db;
    this.name = _name;

    this.redisClient = redis.createClient({
      config_redis,
    });

    this.redisClient.on("connect", () => {
      console.info("user Redis connected!");
    });

    this.redisClient.on("error", (err) => {
      console.error("user Redis client error", err);
    });

    this.redisClient.connect();
  }

  SetData() {
    this.redisClient.set("foo", "bar");
  }

  getData(key) {
    return this.redisClient.get(key);
  }
}

module.exports = userRedis;
