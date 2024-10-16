const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./Customer'); 

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL(20, 2), 
        allowNull: false,
    },
}, {
    tableName: 'order',
    timestamps: false,
});

// Thiết lập quan hệ giữa Order và Customer
Order.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = Order;
