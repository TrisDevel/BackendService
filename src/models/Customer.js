const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    loyalty_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'Customer',
});

module.exports = Customer;
