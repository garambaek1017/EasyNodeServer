const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const fs = require('fs');
const serverTimeHelper = require('./serverTimeHelper.js');

const config = { 
    levels: { // 숫자가 낮을 수록 우선순위가 높습니다.
        error: 0,
        debug: 1,
        warn: 2,
        info: 3,
        data: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: { // 각각의 레벨에 대한 색상을 지정해줍니다.
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        info: 'green',
        data: 'magenta',
        verbose: 'cyan',
        silly: 'grey',
        custom: 'yellow'
    }
}

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

    //
    init(_serverName, _dir, _env)
    {
        this.servername = _serverName;
        this.dir = _dir;
        this.env = _env;

        if (fs.existsSync(this.dir) == false) {
            fs.mkdirSync(this.dir);
        }

        console.log('dir : ' + _dir);
        
        this.fileCreateTime = serverTimeHelper.getTimeForFilename();
    }

    write(_message) {
        this.getLogger('debug').debug(_message);
    }

    error(_message){
        this.getLogger().debug(_message);
    }

    // 디버거 콘솔에는 안나오지만 프로세스 콘솔에는 찍히고 파일로그 생성
    getLogger(_level) {
        return new winston.createLogger({
            level:config.levels,

            format: winston.format.printf(({ level, message }) => {
                return `[${serverTimeHelper.getTimeStr()}][${level}] : ${message}`;
            }),

            transports: [
                // console. 로그 동작안함
                new winston.transports.Console({
                    colorize:true,
                }),
                new winston.transports.File({
                    level: 'debug',
                    json: true,
                    colorize:false,
                    maxsize: 1024 * 10000,
                    maxFiles: 100000,
                    filename: `${this.dir}${this.servername}_Log_${this.fileCreateTime}.txt`,
                })
            ],
            exceptionHandlers: [
                new winston.transports.File({
                    filename: `${this.dir}${this.servername}_Exception_${this.fileCreateTime}.txt`,
                    maxsize: 1024 * 10000,
                    maxFiles: 100000,
                    level: 'error',
                    showLevel: true,
                    json: false,
                    colorize: false,
                }),
            ],
            exitOnError: false
        });
    }
}

module.exports = logHelper;
