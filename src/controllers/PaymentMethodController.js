const PaymentMethod = require('../models/PaymentMethod');

const createPaymentMethod = async (req, res) => {
  const { payment_method } = req.body;

  try {
    const newPaymentMethod = await PaymentMethod.create({
      payment_method,
    });

    res.status(201).json({ message: 'Tạo phương thức thanh toán thành công', paymentMethod: newPaymentMethod });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Tạo phương thức thanh toán thất bại', error });
  }
};

const getPaymentMethodById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
  
      if (!paymentMethod) {
        return res.status(404).json({ message: 'Phương thức thanh toán không tồn tại' });
      }
  
      res.status(200).json(paymentMethod);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lấy thông tin phương thức thanh toán thất bại', error });
    }
  };

  const getAllPaymentMethods = async (req, res) => {
    try {
      const paymentMethods = await PaymentMethod.findAll();
  
      res.status(200).json(paymentMethods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lấy danh sách phương thức thanh toán thất bại', error });
    }
  };

  const updatePaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { payment_method } = req.body;
  
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
  
      if (!paymentMethod) {
        return res.status(404).json({ message: 'Phương thức thanh toán không tồn tại' });
      }
  
      await paymentMethod.update({ payment_method });
  
      res.status(200).json({ message: 'Cập nhật phương thức thanh toán thành công', paymentMethod });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Cập nhật phương thức thanh toán thất bại', error });
    }
  };

  const deletePaymentMethod = async (req, res) => {
    const { id } = req.params;
  
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
  
      if (!paymentMethod) {
        return res.status(404).json({ message: 'Phương thức thanh toán không tồn tại' });
      }
  
      await paymentMethod.destroy();
      res.status(200).json({ message: 'Xóa phương thức thanh toán thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Xóa phương thức thanh toán thất bại', error });
    }
  };

  module.exports = {
    getAllPaymentMethods,
    getPaymentMethodById,
    deletePaymentMethod,
    updatePaymentMethod,
    createPaymentMethod,
  }