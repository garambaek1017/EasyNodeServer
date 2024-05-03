'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');

const g = require('./common/global');

let router = express.Router();

const apiServer = class {

    constructor() {

        // app 설정
        this.webApp = new express();

        this.webApp.use(bodyParser.json());
        this.webApp.use(bodyParser.json());
        this.webApp.use(bodyParser.urlencoded({extended: true}));
        this.webApp.use(cookieParser());
        this.webApp.use(express.static(path.join(__dirname, 'public')));
        this.webApp.use(compression());
        this.webApp.use(methodOverride());
        this.webApp.use(errorHandler());

        this.webAppServer = http.createServer(this.webApp);

        this.port = 3000;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new apiServer();
        }
        return this.instance;
    }

    startListen() {
        this.webAppServer.listen(this.port, () => {
            g.logHelper.info(`start listen :  ${this.port}`);
        });
    }
}

module.exports = apiServer;