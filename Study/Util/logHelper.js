const winston = require('winston');
const dailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const serverTimeHelper = require('./serverTimeHelper.js');

// 로그 처리 클래스 
const logHelper = class {
    constructor() {
        
    }

    // 싱글턴으로 사용
    static getInstance() {
        if (!this.instance) {
            this.instance = new logHelper();
        }
        return this.instance;
    }

    // 로거 정보 초기화 
    init(_serverName, _dir, _env)
    {
        this.serverName = _serverName;
        this.dir = _dir;
        this.env = _env;

        if (fs.existsSync(this.dir) == false) {
            fs.mkdirSync(this.dir);
        }

        this.fileCreateTime = serverTimeHelper.getTimeForFilename();
    }

    // debug 로그 출력 
    debug(_message) {
        this.getLogger().debug(_message);
    }

    // error 로그 출력 
    error(_message){
        this.getLogger().error(_message);
    }

    // info 로그 출력 
    info(_message){
        this.getLogger().info(_message);
    }

    getLogger() {

        return new winston.createLogger({
            format: winston.format.printf(({ level, message }) => {
                return `[${serverTimeHelper.getTimeStr()}][${level}] : ${message}`;
            }),

            transports: [
                new winston.transports.Console({
                    level:'debug'
                }),
                new winston.transports.File({
                    level :'debug',
                    maxsize: 1024 * 10000,
                    maxFiles: 100000,
                    filename: `${this.dir}${this.serverName}_log_${this.fileCreateTime}.txt`,
                })
            ],
            exceptionHandlers: [
                new winston.transports.File({
                    level: 'error',
                    maxsize: 1024 * 10000,
                    maxFiles: 100000,
                    filename: `${this.dir}${this.serverName}_error_${this.fileCreateTime}.txt`,
                    showLevel: true,
                }),
            ],
            exitOnError: false // 예외 발생시 프로세스 종료 방지 
        });
    }
}

module.exports = logHelper;
