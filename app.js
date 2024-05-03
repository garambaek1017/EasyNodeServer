'use strict';
const g = require('./common/global');

const apiServer = require('./apiServer').getInstance();

process.title ="BGR Total Server";

g.logHelper.info("** BGR Total Server Start **");

apiServer.startListen();