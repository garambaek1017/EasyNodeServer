const enumTypes = require('../common/enum');

const userRedis = require('./userRedis');
const matchingRedis = require('./matchingRedis');

class redisManager {

    constructor(){

        if(redisManager.instance){

            return redisManager.instance;
        }

        redisManager.instance = this;

        this.redisPool = new HashMap();

        this.redisPool.Add(enumTypes.RedisType.user, this.CreateRedisClient(enumTypes.RedisType.user));
        this.redisPool.Add(enumTypes.RedisType.mathing, this.CreateRedisClient(enumTypes.RedisType.mathing));
    }

    CreateRedisClient(type)
    {
        if(type == enumTypes.RedisType.user)
        {
            return new userRedis("127.0.0.1", 6379, 1, 'user');
        }
        else if(type === enumTypes.RedisType.mathing)
        {
            return new matchingRedis("127.0.0.1", 6379, 2, 'matching');
        }
    }

    GetRedisClient(type)
    {
        return this.redisPool.get(type);
    }
}

module.exports = redisManager;