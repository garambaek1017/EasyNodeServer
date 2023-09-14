var redis  = require('redis');

class baseRedis {

    constructor() {

        this.host ="";
        this.port = 0;
        this.db =-1;
        this.name ="";
    }

    Init(_host, _port, _db, _name)
    {
        this.host = _host;
        this.port = _port;
        this.db = _db;
        this.name = _name;
    }

    Display()
    {
        console.log("host:"+ this.host +" port:" + this.port +" name:" + this.name);
    }
}

module.exports =  baseRedis