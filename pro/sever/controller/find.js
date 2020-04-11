const mockApiModel = require('../serve/test');

const test = async(ctx, next) => {
    mockApiModel.test().then(() => {
        ctx.body = {
            code: 200,
            msg: '成功'
        };
    });
};
module.exports = {
    test
};
