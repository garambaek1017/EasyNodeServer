'use strict'

const g = require('../common/global');
function reqLogin(req,res)
{
    g.logHelper.debug(`로그인 시도 완료 query : ${ JSON.stringify(req.query)}`);

    let responseJson = {
        code : 0,
        message : 'success'
    };

    res.json(responseJson);
}

module.exports = {
    reqLogin,
}