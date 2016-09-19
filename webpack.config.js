var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join (__dirname, 'app'),
    entry: {
        javascript: ["./js/app.js"],
        html: ["./index.html"],
        css: ["./styles/app.scss"]
    },
    debug : true,
    devtool : 'source-map',
    devServer : {
        contentBase : './dist'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot-loader/webpack", "babel?presets[]=es2015,presets[]=react"]
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?outputStyle=expanded'
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            }
        ]
    },

    output: {
        filename: "js/app.js",
        path: path.join (__dirname, 'dist')
    }
};
