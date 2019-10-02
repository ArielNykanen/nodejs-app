const path = require('path');
const express = require('express');

const router = express.Router();

const homepageCtrl = require('../controllers/home-page.js');

router.get('/', homepageCtrl.getIndexPage);

module.exports = router;