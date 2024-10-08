const express = require('express');
const adminControllers = require('../controllers/AdminController');
const { Model } = require('sequelize');

const router = express.Router();

router.post('/login', adminControllers.loginAdmin );


module.exports = router;

module.exports = router;
