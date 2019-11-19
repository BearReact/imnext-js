const path = require('path');
const webpack = require('webpack');
const webpackBase = require('../../webpack.config');

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, '../../')
            }
        ]
    },
    resolve: {
        alias: {
            ...webpackBase.resolve.alias
        }
    }
};
