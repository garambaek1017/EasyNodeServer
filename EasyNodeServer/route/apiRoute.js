'use strict'


/*
 * 라우터 정의
 */

const g = require('../common/global');
const router = g.express.Router();

const loginProcessor = require('../processor/loginProcessor');
const EnterLobbyProcessor = require('../processor/enterLobbyProcessor');

router.get('/status', (req, res)=> {
    res.status(200).send('easy node server status is success');
});

router.post('/login/', loginProcessor.login);                   // 로그인
router.post('/enterLobby/', EnterLobbyProcessor.enterLobby);    // 로비 진입시 관련된 작업 일괄 처리

module.exports = router;