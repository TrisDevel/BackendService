const { Sequelize } = require('sequelize');

// Cấu hình kết nối đến cơ sở dữ liệu MySQL
const sequelize = new Sequelize('koi_farm_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
