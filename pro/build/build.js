'use strict';
require('./check-versions')(); // 检查 Node 和 npm 版本

process.env.NODE_ENV = 'production'; // 区分环境

const ora = require('ora'); // 一个很好看的 loading 插件
const rm = require('rimraf'); // 以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除(//删除dist目录)
const path = require('path'); // 使用 NodeJS 自带的文件路径工具
const chalk = require('chalk'); // 字体颜色
const webpack = require('webpack'); // 使用 webpack
const config = require('../config'); // 获取 config/index.js 的默认配置
const webpackConfig = require('./webpack.prod.conf'); // 使用 pro 环境的 webpack 配置

const spinner = ora({
    color: 'red', // 图标颜色
    text: '正为生产环境打包，耐心点，不然自动关机。。。' // 打包提示语
});
spinner.start();
// 删除dist目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) {
        throw err
    }

    //  //在删除完成的回调函数中开始编译
    webpack(webpackConfig, (err, stats) => {
        // 编译成功的回调函数
        spinner.stop(); // 停止loading
        if (err) {
            throw err
        }

        // 在编译完成的回调函数中,在终端输出编译的文件
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + '\n\n');

        if (stats.hasErrors()) {
            console.log(chalk.red(' 发生错误.\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('  打包完成.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ));
    });
});
