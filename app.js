const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const customerRoutes = require('./src/routes/customerRoutes');
const adminRoutes = require('./src/routes/adminRoutes') 
const invidualRoutes = require('./src/routes/invidualRoutes');
const blogRoutes = require('./src/routes/blogRoutes')
const paymentMethodRoutes = require('./src/routes/PaymentMethodRoutes')
const PaymentRoutes = require('./src/routes/paymentRoutes')
const BatchRoutes = require('./src/routes/batchRoutes')
const db = require('./src/config/db');


const app = express();

app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/customers', customerRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/invidualKoi', invidualRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/paymentMethod', paymentMethodRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/batchKoi', BatchRoutes);

module.exports = app;
