const router = require('koa-router')();
const dataControl = require('../controller/index');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});
router.get('/test', dataControl.test);

module.exports = router;
