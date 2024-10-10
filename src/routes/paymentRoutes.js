const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

// Định nghĩa các route
router.get('/', paymentController.getAllPayments );
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);
router.post('/', paymentController.createPayment);

module.exports = router;
