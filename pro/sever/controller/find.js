const mockApiModel = require('../serve/test');

const test = async(ctx, next) => {
    ctx.body = {
        code: 200,
        msg: '成功'
    };
    mockApiModel.test();

};
module.exports = {
    test
};
