const connect = require('../config/mysql');
const Sequelize = require('sequelize');

const api = connect.define('koo', {
    api_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    api_req_type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    api_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
    freezeTableName: true, // 默认表名复数 自带s字母 
    timestamps: false // 默认时间是否展示
});

const test = connect.define('test', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
    freezeTableName: true, // 默认表名复数 自带s字母 
    timestamps: false // 默认时间是否展示
});
module.exports = {
    api,
    test
};
