
const myredis = require('./redis');
const async = require('async');
let userRedis = require('./Redis/userRedis');
let matchingRedis = require('./Redis/matchingRedis');
const logHelper = require('./Util/logHelper').getInstance();


// Express 기본 모듈 불러오기
var express = require('express')
	, http = require('http')
	, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
	, static = require('serve-static');

// loghelper 초기화 
logHelper.init("myTestServer", path.join(path.dirname(__dirname), '/log/'), 'dev');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use(static(path.join(__dirname, 'public')));

// 미들웨어에서 파라미터 확인
app.use(function (req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');

	res.end();
});


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function () {

	logHelper.debug('Express server listening on port ' + app.get('port'));
	logHelper.info('Express server listening on port ' + app.get('port'));
	logHelper.error('Express server listening on port ' + app.get('port'));
});


userRedis = new userRedis();
userRedis.Display();
userRedis.SetData();
