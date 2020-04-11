const mockApiModel = require('../serve/test');

const test = async(ctx, next) => {
    mockApiModel.test().then(() => {
        ctx.body = {
            code: 200,
            msg: '成功'
        };
    });
};
const find = async(ctx, next) => {
    const reslut = await mockApiModel.find();
    ctx.status = 200;
    ctx.body = {
        code: 200,
        msg: '成功',
        data: reslut
    };
};
module.exports = {
    test,
    find
};
