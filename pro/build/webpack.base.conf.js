'use strict';
const path = require('path'); // 使用 NodeJS 自带的文件路径插件
const utils = require('./utils'); // 引入一些小工具
const config = require('../config'); // 获取 config/index.js 的默认配置
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    }, // 编译文件入口
    output: {
        path: config.build.assetsRoot, // 编译输出的根路径
        filename: '[name].js', // 编译输出的文件名
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    }, // 正式发布环境下编译输出的发布路径
    resolve: { // 解析
        extensions: ['.js', '.vue', '.json', '.css'], // 自动补全的扩展名 页面引入时即可不写
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src') // @ 直达某个src下的路径
        } // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.esm.js'中寻找
    },
    module: { // 它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程；
        rules: [ // 把源模块转换成通用模块。这些选项决定了如何处理项目中的不同类型的模块。
            {
                test: /\.vue$/, // vue文件后缀
                loader: 'vue-loader', // 使用vue-loader处理
                options: vueLoaderConfig // 额外选项配置
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')] // 必须处理包含src和test文件夹
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片后缀
                loader: 'url-loader',
                options: {
                    limit: 10000, // 图片小于10000字节时以base64的方式引
                    name: utils.assetsPath('img/[name].[hash:7].[ext]') // 文件名为name.7位hash值.拓展名
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体文件
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: { // node 核心模块
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
