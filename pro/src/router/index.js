import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({ // 按需加载
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/js'
        },
        {
            path: '/js',
            name: 'index',
            component: resolve => require(['@/view/index'], resolve)

        },
        {
            path: '/css',
            name: 'css',
            component: resolve => require(['@/view/css'], resolve)

        },
        {
            path: '/dom',
            name: 'dom',
            component: resolve => require(['@/view/dom'], resolve)

        },
        {
            path: '/http',
            name: 'http',
            component: resolve => require(['@/view/http'], resolve)

        },
        {
            path: '/js/sorting', // 排序算法
            name: 'sorting',
            component: resolve => require(['@/kinds/js/Sorting'], resolve)
        },
        {
            path: '/css/center', // 居中
            name: 'center',
            component: resolve => require(['@/kinds/css/center'], resolve)
        },
        {
            path: '*', // 404
            name: 'error',
            component: resolve => require(['@/view/error'], resolve)
        }

    ]
})
