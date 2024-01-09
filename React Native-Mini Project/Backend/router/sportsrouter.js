const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const controller = require('../controller/sportscontroller');

router.post('/register', controller.register);
router.post('/adminlogin', controller.adminlogin);
module.exports = router;
