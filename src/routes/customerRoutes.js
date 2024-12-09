const express = require('express');
const customerController = require('../controllers/CustomerControllers');

const router = express.Router();

// Định nghĩa các route
router.post('/login', customerController.loginCustomer);
router.post('/register', customerController.registerCustomer);
router.post('/', customerController.createCustomer); 
router.get('/', customerController.getAllCustomers); 
router.get('/:id', customerController.getCustomerById); 
router.put('/:id', customerController.updateCustomer); 
router.delete('/:id', customerController.deleteCustomer); 
router.post('/loginGoogle', customerController.loginWithGoogle);

module.exports = router;



module.exports = router;
