// redis 
const redis = require('redis');

let redisClient = null;

function redisSet()
{
    // redis config setting
    var redis_config = {
        host : "127.0.0.1",
        port : 6379,
        db : 0,
    };

    redisClient = redis.createClient(redis_config);

    redisClient.on('connect', ()=> {
        console.info('Redis connected!');
    });

    redisClient.on('error', (err) => {
        console.error('Redis client error', err);
    });

    redisClient.connect();
}


function redisShow() {

    redisClient.set('key', 'value');
    const value = redisClient.get('key');
    
    console.log(`value : ${value}`);
}

module.exports = {
    redisShow,
    redisSet,
}

