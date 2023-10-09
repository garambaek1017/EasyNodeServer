
//--------------------------------

const express = require('express');
const path = require('path');
const http = require('http');
// Express의 미들웨어 불러오기
const bodyParser = require('body-parser');
const static = require('serve-static');
const logHelper = require('./util/logHelper').getInstance();
//--------------------------------


// 로그 헬퍼 초기화 
logHelper.init("PDBoyzServer", path.join(path.dirname(__dirname), '/log/'), 'dev');

let app = express();
// 기본 속성 설정 
app.set('port', process.env.PORT || 4000);
// json을 형식의 요청 본문을 파싱 
app.use(bodyParser.json())

//req 요청
//res 응답 
// 다음 미들 웨어로 넘김 
app.use(function (req, res, next) {
    // 인증, 세션, 공통된 작업을 수행하고 넘길때 처리함 
    next() 
});

// 라우터 등록 
app.use('/',require('./route/apiRoute'));

let expreeServer = null;
expreeServer = http.createServer(app);

// 이 앱의 시작점 
expreeServer.listen(app.get('port'));

expreeServer.on('listening', () => {
    logHelper.debug('Express server listening on port ' + app.get('port'));
});
