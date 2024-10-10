const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Kết nối Sequelize
const PaymentMethod = require('../models/PaymentMethod'); // Model PaymentMethod để tạo quan hệ

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_method_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Không sử dụng các cột createdAt và updatedAt tự động
  tableName: 'Payment', // Tên bảng trong cơ sở dữ liệu
});

// Thiết lập quan hệ nếu cần (1 phương thức thanh toán có thể có nhiều thanh toán)
Payment.belongsTo(PaymentMethod, { foreignKey: 'payment_method_id', targetKey: 'id' });

module.exports = Payment;
