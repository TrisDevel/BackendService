const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const IndividualKoiFish = sequelize.define('IndividualKoiFish', {
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    name: {
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    size: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT, // Lưu URL của ảnh từ Firebase
        allowNull: false,
    },
    certificate: {
        type: DataTypes.TEXT, // Có thể lưu URL của giấy chứng nhận nếu cần
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'Individual_Koi_Fish',
});

module.exports = IndividualKoiFish;
