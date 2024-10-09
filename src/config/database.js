const { Sequelize } = require('sequelize');

// Cấu hình kết nối đến cơ sở dữ liệu MySQL
const sequelize = new Sequelize('sql12736315', 'sql12736315', 'KJtrFmTeUd', {
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',
});

module.exports = sequelize;
