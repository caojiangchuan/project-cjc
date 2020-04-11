const Sequelize = require('sequelize');
const db = require('./db');
const {
    database,
    username,
    password,
    host,
    port,
    dialect
} = db;
const connect = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect,
    define: {
        // 不要添加时间戳属性 (updatedAt, createdAt)
        timestamps: false,
        // 不使用驼峰式命令规则，这样会在使用下划线分隔
        // 这样 updatedAt 的字段名会是 updated_at
        underscored: true,
        charset: 'utf8mb4'
    }

});
// 测试连接池是否成功
connect.authenticate().then(() => {
    console.log('数据库连接成功');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
connect.sync({
    // force: true // 是否重新构造表
}).then(() => {
    // for (let n = 10; n < 20; n++) {
    //     User.create({firstName: `Janess${n}`, lastName: `don${n}`});
    // }  //可在此操作数据库
});
module.exports = connect;
