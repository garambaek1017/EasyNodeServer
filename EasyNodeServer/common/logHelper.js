'use strict';

const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');
const {combine, timestamp, printf} = winston.format;

const logDir = `${process.cwd()}/logs`;


/*
 log 출력 포맷 정의 함수
 */
const logFormat = printf(({level, message, timestamp}) => {
    return `[${timestamp}]|${level}| ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

/*
 * 서버 로그
 */
const logHelper = class {
    constructor() {
        this.logger = this.getLogger();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new logHelper();
        }
        return this.instance;
    }

    // 디버그 로그 출력
    debug(_message) {
        this.logger.debug(_message);
    }

    // 에러 로그 출력
    error(_message) {
        this.logger.error(_message);
    }

    info(_message) {
        this.logger.info(_message);
    }

    getLogger() {

        let logger = winston.createLogger({

            format: combine(
                timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}), // 밀리세컨즈까지 찍기
                logFormat,
            ),

            transports: [
                new winstonDaily({
                    level: 'info', // info 레벨에선
                    datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
                    dirname: logDir, // 파일 경로
                    filename: `%DATE%.log`, // 파일 이름 // (기본값: 'winston.log.%DATE%')
                    maxFiles: 30, // 최근 30일치 로그 파일을 남김
                    zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
                }),
                new winstonDaily({
                    level: 'error', // error 레벨에선
                    datePattern: 'YYYY-MM-DD',
                    dirname: logDir + '/error', // /logs/error 하위에 저장
                    filename: `error_%DATE%.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
                    maxFiles: 30,
                    zippedArchive: true,
                }),

                new winstonDaily({
                    level: 'debug', // info 레벨에선
                    datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
                    dirname: logDir, // 파일 경로
                    filename: `%DATE%.log`, // 파일 이름 // (기본값: 'winston.log.%DATE%')
                    maxFiles: 30, // 최근 30일치 로그 파일을 남김
                    zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
                }),
            ],
            //* uncaughtException 발생시 파일 설정
            exceptionHandlers: [
                new winstonDaily({
                    level: 'error',
                    datePattern: 'YYYY-MM-DD',
                    dirname: logDir,
                    filename: `exceptiton_%DATE%.log`,
                    maxFiles: 30,
                    zippedArchive: true,
                }),
            ],
        });

        logger.add(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(), // 색깔 넣어서 출력
                    winston.format.simple(), // ex) info: Hello world! my app {"timestamp":"2024-04-30 18:12:32"}
                    //winston.format.cli(), // ex) info:    Hello world! my app
                    //winston.format.json() // ex) {"level":"\u001b[32minfo\u001b[39m","message":"Hello world! my app","timestamp":"2024-04-30 18:11:57"}
                ),
            }),
        );

        return logger;
    }
}

module.exports = logHelper;