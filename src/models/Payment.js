const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Kết nối Sequelize

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_method_id: {
    type: DataTypes.INTEGER, // Phải là INTEGER để khớp với id của bảng PaymentMethod
    allowNull: false,        // Không cho phép null
    references: {
      model: 'PaymentMethod', // Tên bảng PaymentMethod
      key: 'id',              // Tham chiếu tới cột id của bảng PaymentMethod
    },
  },
  payment_status: {
    type: DataTypes.STRING(50), // Kiểu STRING với độ dài tối đa 50 ký tự
    allowNull: false,           // Không được để trống
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,           // Không được để trống
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2), // Số thập phân với tối đa 10 chữ số và 2 chữ số sau dấu thập phân
    allowNull: false,               // Không được để trống
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Mặc định là thời gian hiện tại
  },
}, {
  timestamps: false,              // Không sử dụng createdAt và updatedAt tự động
  tableName: 'Payment',           // Tên bảng trong cơ sở dữ liệu
});

module.exports = Payment;
