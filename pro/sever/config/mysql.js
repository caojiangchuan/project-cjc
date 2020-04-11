const Sequelize = require('sequelize');

const connect = new Sequelize('nodemysql', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        underscored: true,
        charset: 'utf8mb4'
    }

});
connect.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
connect.sync({
    // force: true // 是否重新构造表
}).then(() => {
    // for (let n = 10; n < 20; n++) {
    //     User.create({firstName: `Janess${n}`, lastName: `don${n}`});
    // }
});
module.exports = connect;
