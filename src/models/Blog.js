const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Kết nối Sequelize

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Không sử dụng các cột createdAt và updatedAt tự động
  tableName: 'Blog', // Tên bảng trong cơ sở dữ liệu
});

module.exports = Blog;
