const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const srcPath = './dev/src/dh-apph5/mayDay/';
const outputPath = './unity/dh-apph5/mayDay/';

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        index: `${srcPath}assets/index.js`
    },
    output: {
        path: path.resolve(outputPath),
        filename: 'assets/[name].js?[hash]',
        publicPath: '/'
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
                        outputPath: 'imgs/'
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
            __httpHost__: 99
        }),
        new htmlWebpackPlugin({
            template: `${srcPath}index.html`,
            filename: 'index.html',
            chunks: ['index']
        }),    
        new ExtractTextWebpackPlugin('assets/[name].css?[hash]'),
        new OptimizeCssAssetsPlugin(),
        new CopyWebpackPlugin([{
            from: `${srcPath}/img`,
            to: '/img'
        }])
    ]
    , devServer: {
        proxy: {

        }
    }
};

