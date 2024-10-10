const express = require('express');
const paymentMethodController = require('../controllers/PaymentMethodController');

const router = express.Router();

// Định nghĩa các route
router.get('/', paymentMethodController.getAllPaymentMethods );
router.get('/:id', paymentMethodController.getPaymentMethodById);
router.put('/:id', paymentMethodController.updatePaymentMethod);
router.delete('/:id', paymentMethodController.deletePaymentMethod);
router.post('/', paymentMethodController.createPaymentMethod);

module.exports = router;