'use strict'

let mysql = require('mysql');
let async = require('async');

const config = require('../config');
const logHelper = require('../common/global').logHelper;
const Promise = require('bluebird');

const g = require('../common/global');

let instance = null;

class gameDBConnector {
    constructor() {
        if (instance) {
            return instance;
        }

        instance = this;

        this.dbConnPool = null;

        // db config 설정
        this.dbConfig = {
            host: config.gamedb_host,
            port: config.gamedb_port,
            user: config.gamedb_user,
            password: config.gamedb_password,
            database: config.gamedb_database,
            connectionLimit: config.gamedb_maxconn,     //default 10, 동시에 몇개의 접속을 허용할 것인가 ?
            queueLimit: 0,                              //default 0(unlimit)
            dateStrings: config.gamedb_dateStrings,
            charset: 'utf8mb4_unicode_ci',

            timeout: 300000,
            acquireTimeout: 300000,     //default 10000
            connectTimeout: 30000,      //default 10000

            multipleStatements: true,
            supportBigNumbers: true,   // bigint support
            bigNumberStrings: true,    // bigint to string
            waitForConnections: true,   //default true
        }

        // pool
        let poolResult = this.createPool();

        if (poolResult) {
            setInterval(() => this.dbMonitor(), 60 * 1000);
            logHelper.info(' db connect success');
        } else {
            logHelper.info(' db connect fail..');
        }
    }

    createPool() {

        this.dbConnPool = mysql.createPool(this.dbConfig);

        if (this.dbConnPool) {
            setInterval(() => this.dbMonitor(), 60 * 1000);
            logHelper.info('db connect success');
            return true;
        }
        logHelper.info('db connect fail');
        return false;
    }

    dbMonitor() {

        let logObj = {
            // @ts-ignore
            all: this.dbConnPool._allConnections.length,
            // @ts-ignore
            free: this.dbConnPool._freeConnections.length,
            // @ts-ignore
            queue: this.dbConnPool._connectionQueue.length
        };

        console.log(g.serverTimeHelper.getNowTime() + ' - [DB Monitor] : ' + JSON.stringify(logObj));
    }

    /*
     * db pool에서 connection 가져오는  함수
     */
    async getConnection() {
        // MySQL 연결 가져오기
        const connection = await new Promise((resolve, reject) => {
            this.dbConnPool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });

        // 연결 및 해제 함수 반환
        return {
            connection,
            release: () => connection.release()
        };
    }

}

module.exports = new gameDBConnector;