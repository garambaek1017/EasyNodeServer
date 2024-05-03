'use strict'

const g = require('../common/global');

/*
    로비 진입 일괄 처리
*/
function enterLobby(req,res)
{
    g.logHelper.debug(`reqSignup:${ JSON.stringify(req.query)}`);

    let responseJson = {
        code : 0,
        message : 'success'
    };

    res.json(responseJson);
}

module.exports = {
    enterLobby,
}