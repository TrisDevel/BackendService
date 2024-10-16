const Order = require('../models/Order');
const Payment = require('../models/Payment'); 
const Customer = require('../models/Customer');


const validateOrderInput = (data) => {
    const { customer_id, order_date, total_price } = data;
    if (!customer_id || !order_date || !total_price) {
        return 'Missing required fields: customer_id, order_date, total_price';
    }
    return null;
};

exports.createOrder = async (req, res) => {
    try {
        const error = validateOrderInput(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const { customer_id, order_date, total_price } = req.body;
        const newOrder = await Order.create({ customer_id, order_date, total_price });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
    }
};



exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;  // ID của order
        const { customer_id, order_date, total_price } = req.body; 

        // Chỉ cập nhật các trường khác, không thay đổi ID
        const [updated] = await Order.update(
            { customer_id, order_date, total_price }, 
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const updatedOrder = await Order.findByPk(id);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Xóa tất cả các payments liên quan trước khi xóa order
        await Payment.destroy({ where: { order_id: id } });

        // Sau đó xóa order
        const deleted = await Order.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
};

// API lấy đơn hàng theo ID kèm thông tin khách hàng (trừ id)
exports.getOrderWithCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({
            where: { id },
            include: [
                {
                    model: Customer,
                    attributes: ['name', 'email', 'phone_number', 'address', 'loyalty_points'], // Không lấy id
                },
            ],
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order with customer:', error);
        res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
    }
}; 

