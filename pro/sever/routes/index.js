const router = require('koa-router')();
const sequelize = require('../config/mysql');
const dataControl = require('../controller/find');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});
router.get('/test', dataControl.test);

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    };
});

module.exports = router;
