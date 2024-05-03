'use strict';

const http = require('http');
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');

const g = require('./common/global');

let router = g.express.Router();

const gameDB = require('./db/gameDBConnector');

const apiServer = class {

    constructor() {

        // app 설정
        this.webApp = g.express();

        this.webApp.use(bodyParser.json());
        this.webApp.use(bodyParser.json());
        this.webApp.use(bodyParser.urlencoded({extended: true}));

        this.webApp.use(g.express.static(path.join(__dirname, 'public')));

        this.webApp.use(cookieParser());
        this.webApp.use(compression());
        this.webApp.use(methodOverride());
        this.webApp.use(errorHandler());

        // 라우터 등록
        this.webApp.use('/', require('./route/apiRoute'));

        this.webAppServer = http.createServer(this.webApp);

        this.port = 3000;

        this.gameDBConnetor = gameDB();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new apiServer();
        }
        return this.instance;
    }

    /*
    리스닝 시작
    * */
    startListen() {
        this.webAppServer.listen(this.port, () => {
            g.logHelper.info(`start listen :  ${this.port}`);
        });
    }

    startOn(){
        this.webAppServer.on('listening', () => {
            g.logHelper.info('Easy server listening on port ' + this.webApp.get('port'));
        });
    }



}

module.exports = apiServer;