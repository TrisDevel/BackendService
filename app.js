const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const customerRoutes = require('./src/routes/customerRoutes'); // Đường dẫn tới customerRoutes
const db = require('./src/config/db');


// Tạo ứng dụng Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/customers', customerRoutes); // Kết nối route khách hàng

module.exports = app;
