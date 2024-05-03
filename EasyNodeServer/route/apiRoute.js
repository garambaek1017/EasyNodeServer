'use strict'

const g = require('../common/global');
const router = g.express.Router();
const loginProcessor = require('../processor/loginProcessor');

router.get('/status', (req, res)=> {
    res.status(200).send('express status is success');
});

router.post('/login/login', loginProcessor.reqLogin);

module.exports = router;