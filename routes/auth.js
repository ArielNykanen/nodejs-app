const path = require('path');
const express = require('express');

const router = express.Router();

const authCtrl = require('../controllers/auth');

router.get('/login', authCtrl.getLogin);
router.get('/register', authCtrl.getRegister);


router.post('/login', authCtrl.postLogin);
router.post('/register', authCtrl.postRegister);
router.post('/logout', authCtrl.postLogOut);


module.exports = router;