
const commonConfig = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig  = {
    mode: 'production',
    devtool: 'none',
    output: {
        filename: '[name].[contenthash].js',
        // path: path.resolve(__dirname, '../dist')   
        chunkFilename:'[name].[contenthash].chunk.js'
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,// 用这个替代style-loader style-loader是将css用style标签引入到页面的，这个是生成css文件的
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    }
                ]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
}

module.exports = merge(commonConfig,prodConfig);