
var webpack = require('webpack');
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://dolltoys.exfox.com.cn:15000',
        //         // pathRewrite: { '^/api': '' },
        //         changeOrigin: true,
        //         // secure: false, // 接受 运行在 https 上的服务
        //     }
        // }
        host:'192.168.20.151',
        port:8081,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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
                    'style-loader',
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
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig, devConfig);