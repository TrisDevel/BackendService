const { Model } = require('firebase-admin/machine-learning');
const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
  const { payment_method_id, payment_status, payment_date, total_amount } = req.body;

  try {
    const newPayment = await Payment.create({
      payment_method_id,
      payment_status,
      payment_date,
      total_amount,
    });

    res.status(201).json({ message: 'Tạo thanh toán thành công', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Tạo thanh toán thất bại', error });
  }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const payment = await Payment.findByPk(id);
  
      if (!payment) {
        return res.status(404).json({ message: 'Thanh toán không tồn tại' });
      }
  
      res.status(200).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lấy thông tin thanh toán thất bại', error });
    }
  };

  const getAllPayments = async (req, res) => {
    try {
      const payments = await Payment.findAll();
  
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lấy danh sách thanh toán thất bại', error });
    }
  };

  const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { payment_method_id, payment_status, payment_date, total_amount } = req.body;
  
    try {
      const payment = await Payment.findByPk(id);
  
      if (!payment) {
        return res.status(404).json({ message: 'Thanh toán không tồn tại' });
      }
  
      await payment.update({
        payment_method_id,
        payment_status,
        payment_date,
        total_amount,
      });
  
      res.status(200).json({ message: 'Cập nhật thanh toán thành công', payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Cập nhật thanh toán thất bại', error });
    }
  };
  const deletePayment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const payment = await Payment.findByPk(id);
  
      if (!payment) {
        return res.status(404).json({ message: 'Thanh toán không tồn tại' });
      }
  
      await payment.destroy();
      res.status(200).json({ message: 'Xóa thanh toán thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Xóa thanh toán thất bại', error });
    }
  };
module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment,
}
