
const path = require('path');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: [
        // 'react-hot-loader/patch',
        './src/App.js'
    ],
    module: {
        rules: [{
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            
        }
        ]
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            // automaticNameDelimiter: '~',
            // enforceSizeThreshold: 50000,
            name: true,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'akak.js'
                }
            }

        },
        usedExports: true,//测试环境 tree shaking 要加这个配置
    }
}