'use strict';
const path = require('path'); // 使用 NodeJS 自带的文件路径工具
const utils = require('./utils'); // 引入一些小工具
const webpack = require('webpack'); // 使用 webpack
const config = require('../config'); // 获取 config/index.js 的默认配置
const merge = require('webpack-merge'); // 使用 webpack 配置合并插件
const baseWebpackConfig = require('./webpack.base.conf'); // 加载 webpack.base.conf
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件，或者文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这个插件可以帮我们自动生成 html 并且注入到 .html 文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 一个 webpack 扩展，可以提取一些代码并且将它们和文件分离开
// 如果我们想将 webpack 打包成一个文件 css js 分离开，那我们需要这个插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js文件压缩插件

const env = require('../config/prod.env');
// 合并 webpack.base.conf.js
const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false, // 是否使用 #source-map 开发工具，更多信息可以查看 DDFE 往期文章
    output: {
        path: config.build.assetsRoot, // 编译输出目录
        filename: utils.assetsPath('js/[name].[chunkhash].js'), // 编译输出文件名
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 没有指定输出名的文件输出的文件名
    },
    plugins: [ // 使用的插件
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({ // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
            'process.env': env
        }),
        new UglifyJsPlugin({ // 压缩 js (同样可以压缩 css)
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({ // 将 css 文件分离出来
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({ // 将 css 文件提取
            cssProcessorOptions: config.build.productionSourceMap
                ? {
                    safe: true,
                    map: {
                        inline: false
                    }
                }
                : {
                    safe: true
                }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({ // 输入输出的 .html 文件
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({ // 没有指定输出文件名的文件输出的静态文件名
            name: 'vendor',
            minChunks(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});
// 开启 gzip 的情况下使用下方的配置
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 加载 compression-webpack-plugin 插件

    webpackConfig.plugins.push( // 向webpackconfig.plugins中加入下方的插件
        new CompressionWebpackPlugin({ // 使用 compression-webpack-plugin 插件进行压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
