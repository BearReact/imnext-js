require('dotenv').config();
const path = require('path');
const DotEnv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const webpackConfig = require('./webpack.config');

// https://github.com/zeit/next.js/issues/5509#issuecomment-432456576
const generateLocalePath = defaultPathMap => {
    const pathMap = {};
    const allLanguage = ['en', 'cn'];

    Object.entries(defaultPathMap).forEach(([key, value]) => {
        pathMap[key] = value;

        allLanguage.forEach(language => {
            pathMap[`/${language}${key}`] = {...value, query: {language}};
        });
    });
};

const nextConfig = {
    exportTrailingSlash: false,
    assetPrefix: process.env.ASSET_BASE_PATH || '',
    exportPathMap() {
        const pathMap = {
            '/': {page: '/'}, // fix not change language in first
            '/example/contact': {page: '/example/contact'},
            '/example/news': {page: '/example/news'},
            '/example': {page: '/example'},
        };

        return pathMap;

        // return generateLocalePath(defaultPathMap);
    },

    webpack: config => {
        config.node = {
            fs: 'empty',
        };

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new DotEnv({
                path: path.join(__dirname, '.env'),
                systemvars: true,
            }),
        ];

        // 附加 webpack.config 的 alias 別名路徑設定
        config.resolve.alias = Object.assign(config.resolve.alias, webpackConfig.resolve.alias);

        return config;
    },
};

module.exports = withSass(withCss(nextConfig));
