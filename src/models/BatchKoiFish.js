const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BatchKoiFish = sequelize.define('BatchKoiFish', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category', // Bảng Category mà category_id tham chiếu đến
            key: 'id',
        },
        onUpdate: 'CASCADE', // Cập nhật khóa ngoại khi thay đổi
        onDelete: 'SET NULL', // Nếu xóa Category, set category_id về null
    },
    batch_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING(50), // Kích thước của lô cá (vd: 10-15 cm)
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Giá theo từng con trong lô
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER, // Số lượng cá trong lô
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT, // Lưu URL của ảnh từ Firebase hoặc hệ thống lưu trữ
        allowNull: false,
    },
    certificate: {
        type: DataTypes.TEXT, // URL của giấy chứng nhận nếu có
        allowNull: true,
    },
}, {
    timestamps: false, // Không tự động tạo createdAt và updatedAt
    tableName: 'Batch_Koi_Fish', // Tên bảng trong cơ sở dữ liệu
});

module.exports = BatchKoiFish;
