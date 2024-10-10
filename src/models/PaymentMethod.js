const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Kết nối Sequelize

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_method: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  timestamps: false, // Không sử dụng các cột createdAt và updatedAt tự động
  tableName: 'Payment_method', // Tên bảng trong cơ sở dữ liệu
});

module.exports = PaymentMethod;
