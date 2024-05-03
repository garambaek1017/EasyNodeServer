'use strict';

const g = require('./common/global');
const apiServer = require('./apiServer').getInstance();

g.logHelper.info("** BGR Total Server Start **");

apiServer.startListen();
apiServer.startOn();

process.title ="BGR EasyNodeServer";

process.on('uncaughtException', function (err) {
    g.logHelper.error(err.stack);
});