const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Đảm bảo username là duy nhất
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true, // Đảm bảo email là duy nhất
        validate: {
            isEmail: true // Kiểm tra định dạng email
        }
    },
    phone_number: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    loyalty_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Giá trị mặc định cho loyalty points
    }
}, {
    tableName: 'customer',
    timestamps: false,
});

module.exports = Customer;
