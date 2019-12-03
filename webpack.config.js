module.exports = {
    entry: __dirname + '/Views/React/Index.js',
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
            }
        ]
    }
};