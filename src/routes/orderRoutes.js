const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/', orderController.createOrder); // POST tạo mới order
router.get('/', orderController.getAllOrders); // GET tất cả orders
router.get('/:id', orderController.getOrderById); // GET order theo ID
router.put('/:id', orderController.updateOrder); // PUT cập nhật order
router.delete('/:id', orderController.deleteOrder); // DELETE order theo ID
// Route lấy đơn hàng theo ID cùng thông tin khách hàng (trừ id)
router.get('/with-customer/:id', orderController.getOrderWithCustomerById); // Đặt sau

module.exports = router;
