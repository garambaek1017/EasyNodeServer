'use strict';

class serverGlobal {
    constructor() {
        this.logHelper = require('./logHelper').getInstance();
        this.serverTimeHelper = require('./serverTimeHelper');
    }
}

module.exports = new serverGlobal;