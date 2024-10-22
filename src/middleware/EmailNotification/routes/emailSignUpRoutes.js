const express = require('express');
const emailSignUpController = require('../controller/emailSignUpController');

const router = express.Router();

router.post('/signup', emailSignUpController.emailSignUpNotification);

module.exports = router;