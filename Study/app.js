

var myredis = require('./redis');
var async = require('async');


// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , static = require('serve-static');

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
app.use(function(req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');


	var rval = Math.floor(Math.random() * 1000);     // 합성 확률(1/1000 확률)
	console.log('rval : ' + rval);

	var result = 0.2 < rval;

	console.log(`0.2 < ${rval} = ${result}` )
	

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	
	res.end();
});


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


async.waterfall([
	function(callback)
	{
		myredis.redisSet();
		console.log("redisSet!!")
		return callback(null);
	},
	function(callback)
	{
		myredis.redisShow();
		console.log("redis show!!")
		return callback(null);

	}], function(err,result){
		console.log("waterfall is success");

});

