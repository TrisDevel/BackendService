const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Cấu hình kết nối đến cơ sở dữ liệu MySQL 
const sequelize = new Sequelize('koi_farm_db', 'root', 'root', {
    host: 'localhost',
    port: '3306', 
    dialect: 'mysql',
});

module.exports = sequelize;
