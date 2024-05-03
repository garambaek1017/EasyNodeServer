'use strict';

class serverGlobal {
    constructor() {
        this.express = require('express');
        this.logHelper = require('./logHelper').getInstance();
        this.serverTimeHelper = require('./serverTimeHelper');
    }
}

module.exports = new serverGlobal;