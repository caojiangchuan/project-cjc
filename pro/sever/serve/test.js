/**
 * @file
 * @author
 */
const model = require('../model/index');

async function test() {
    model.test.create({
        name: '小朋友'
    });
}

async function find() {
    return model.test.findAll();
}

module.exports = {
    test,
    find
};
