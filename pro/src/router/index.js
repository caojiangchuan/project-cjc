import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({ // 按需加载
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/view/index'], resolve)
        }
    ]
})
