const serverTimeHelper = require('../util/serverTimeHelper');
const logHelper = require('../util/logHelper').getInstance();
//------------------------------

function Dologin(req,res) 
{
    logHelper.debug(`로그인 시도 완료 query : ${ JSON.stringify(req.query)}`);

    let responseJson = {
        code : 0, 
        message : 'success'
    };

    res.json(responseJson);
}

function DoSignUp(req,res)
{
    logHelper.debug("회원 가입");
}

module.exports = {
    Dologin,            // 로그인
    DoSignUp,           // 회원가입 
}