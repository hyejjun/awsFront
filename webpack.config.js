const path = require('path')
const RefreshwebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const mode = 'production'       // 배포할때고, 개발할 때는 'development'
//const mode = 'development'
const devtool = 'hidden-source-map'     // 배포할때고, 개발할때는 'eval'
// const devtool = 'eval'
const isDevelopment = mode === 'production';
const refresh = isDevelopment ? [] : ['react-refresh/babel']

module.exports = {
    name:'ingoo',
    mode:mode,
    devtool:devtool,

    resolve:{
        extensions:['.js', '.jsx']
    },

    entry:{
        app:['./index.jsx']
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                loader:'babel-loader',
                options:{
                    presets:[
                        ['@babel/preset-env',{
                            targets:{browsers:['last 2 chrome versions']}
                        }],
                        '@babel/preset-react'
                    ],
                    plugins:refresh
                },
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
        ],
    },

    plugins:[
        new RefreshwebpackPlugin(),
        new webpack.LoaderOptionsPlugin({debug:true}),
        new MiniCssExtractPlugin({ filename: 'app.css' })
    ],
    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.js',
        publicPath:'/dist',
    },

    devServer:{
        publicPath:'/dist',
        hot:true,
        proxy: {
            '/api': 'http://localhost:3000',
        },
        host: '0.0.0.0',
    }
}