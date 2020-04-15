'use strict';
const utils = require('./utils'); // 使用一些小工具
const webpack = require('webpack'); // 使用 webpack
const config = require('../config'); // 获取 config/index.js 的默认配置
const merge = require('webpack-merge'); // 使用 webpack 配置合并插件
const path = require('path'); // 使用 NodeJS 自带的文件路径工具
const baseWebpackConfig = require('./webpack.base.conf'); // 加载 webpack.base.conf
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件，或者文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这个插件可以帮我们自动生成 html 并且注入到 .html 文件中
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 识别某些类别的webpack错误，并清理，聚合和优先级
const portfinder = require('portfinder'); // 自动获取端口

const HOST = process.env.HOST; // 未定义HOST
const PORT = process.env.PORT && Number(process.env.PORT); // 未定义PORT
// 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    }, // 使用 styleLoaders
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool, // 开发工具

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')}
            ]
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? {warnings: false, errors: true}
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [ // 加载插件
        new webpack.DefinePlugin({ // 编译时配置的全局变量
            'process.env': require('../config/dev.env')
        }), // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
        new webpack.HotModuleReplacementPlugin(), // HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件//热更新插件
        new webpack.NamedModulesPlugin(), // 这个插件的作用是在热加载时直接返回更新文件名
        new webpack.NoEmitOnErrorsPlugin(), // 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html', // filename表示生成html文件的名字，如果没有设置的话默认为index.html
            template: 'index.html', // 当webpack自动生成html文件的时候，会基于某个模板来进行。当然你也可以自定义自己的模板，如果没有定义webpack会使用默认的模板。但是需要指出的是，当你使用了其他模板类型（比如jade），那么你需要安装对应的loader。默认情况下webpack使用ejs模板。
            inject: true // 将js文件插入body的底部
        }),
        // copy custom static assets复制文件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'), // 拷贝源文件
                to: config.dev.assetsSubDirectory, //  定义要拷贝到的目标文件夹
                ignore: ['.*'] // 忽略拷贝指定的文件    
            }
        ])
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port; // 定义打开端口
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        }
        else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`快打开: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }));

            resolve(devWebpackConfig);
        }
    });
});
