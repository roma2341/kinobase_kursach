var webpack = require('webpack');
var path = require('path');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var define = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
console.log(process.env.NODE_ENV);
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        root: path.resolve('./'),
        extensions: ['', '.js'],
        modules: [
            path.resolve('./js')
        ]
    },

    module: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
        loaders: [{
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel'
        }]
    },
    watch: process.env.NODE_ENV && 'development'
};

module.exports = config;
