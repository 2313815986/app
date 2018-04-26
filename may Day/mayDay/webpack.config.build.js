const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const srcPath = './dev/src/dh-appactivity/redbagLotteryAPP/';
const outputPath = './unity/dh-appactivity/redbagLotteryAPP';

module.exports = {
    // devtool: 'eval-source-map',
    entry: {
        index: `${srcPath}assets/js/index.js`,
        draw: `${srcPath}assets/js/draw.js`,
        history:`${srcPath}assets/js/history.js`
    },
    output: {
        path: path.resolve(outputPath),
        filename: 'assets/js/[name].js?[hash]',
        publicPath: '/dh-appactivity/redbagLotteryAPP/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'less-loader', 'postcss-loader'],
                    fallback: 'style-loader'
                }),
                exclude: /node_modules/
            }
            , {
                test: /\.(jpg|jqeg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '1024',
                        name: '[name].[ext]',
                        outputPath: 'assets/imgs/'
                    }
                }]
            }
            , {
                test: /\.vue/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        extractCSS: true
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-withimg-loader'
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __httpHost__: 6 // 0：本地   其他：代理
        }),
        new htmlWebpackPlugin({
            template: `${srcPath}index.html`,
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['index']
        }),
        new htmlWebpackPlugin({
            template: `${srcPath}draw.html`,
            filename: 'draw.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['draw']
        }),
        new htmlWebpackPlugin({
            template: `${srcPath}history.html`,
            filename: 'history.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['history']
        }),
        new ExtractTextWebpackPlugin('assets/[name].css?[hash]'),
        new OptimizeCssAssetsPlugin(),
        new CopyWebpackPlugin([{
            from: `${srcPath}/imgs`,
            to: 'imgs'
        }]),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css/g,
            // cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

