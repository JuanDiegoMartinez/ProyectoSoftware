var path = require('path');

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", __dirname + '/Views/React/Index.js'],
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query : {
                    presets: ['@babel/env', '@babel/react']
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env',
                              '@babel/react',{
                              'plugins': ['@babel/plugin-proposal-class-properties']}]
                }
            }
        ]
    }
};