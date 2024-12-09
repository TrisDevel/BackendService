const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const emailSignUpRoutes = require('./src/middleware/EmailNotification/routes/emailSignUpRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const invidualRoutes = require('./src/routes/invidualRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const paymentMethodRoutes = require('./src/routes/PaymentMethodRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes'); 
const batchRoutes = require('./src/routes/batchRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const db = require('./src/config/db');

const app = express(); // Khởi tạo app

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/invidualKoi', invidualRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/paymentMethod', paymentMethodRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/batchKoi', batchRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/email', emailSignUpRoutes);

// Middleware xử lý lỗi của body-parser khi gặp JSON không hợp lệ
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ message: 'Invalid JSON format', error: err.message });
  }
  next();
});

// Middleware xử lý lỗi tổng quát (Internal Server Error)
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Bắt route không tồn tại (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});



app.use('/api/email', emailSignUpRoutes);

module.exports = app;
