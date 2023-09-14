'use strict';

var redis = require('redis');

var baseRedis = require('./baseRedis');

class userRedis extends baseRedis {

    constructor() {
        
        super();

        super.Init("127.0.0.1","6379","userRedis","1");


        var config_redis = {
            host: "127.0.0.1",
            port: "6379",
            db: 1,     
        };

        this.redisClient = redis.createClient({
            config_redis
        });

        this.redisClient.on('connect', ()=> {
            console.info('user Redis connected!');
        });
    
        this.redisClient.on('error', (err) => {
            console.error('user Redis client error', err);
        });
    
        this.redisClient.connect();
    }

    SetData()
    {
        this.redisClient.set('foo','bar');
    }
}

module.exports =  userRedis