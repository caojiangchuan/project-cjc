const router = require('koa-router')();
const dataControl = require('../controller/index');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});
router.post('/test', dataControl.test);
router.post('/find', dataControl.find);

module.exports = router;
