//--------------------------
// 외부 모듈 
const router = require('express').Router();
//--------------------------

// 내부 모듈
const loginProcessor = require('../processor/loginProcessor');
//--------------------------


router.get('/status', (req, res)=> {
    res.status(200).send('express status is success');
});

router.post('/login/signup', loginProcessor.DoSignUp);
router.post('/login/login', loginProcessor.Dologin);


module.exports = router;