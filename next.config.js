require('dotenv').config();
const path = require('path');
const DotEnv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const webpackConfig = require('./webpack.config');

const LANGUAGES = ['en', 'cn'];

const nextConfig = {
    exportTrailingSlash: false,
    exportPathMap() {
        const pathMap = {};

        const defaultPathMap = {
            '/': {page: '/'}, // fix not change language in first
            '/example/contact': {page: '/example/contact'},
            '/example/news': {page: '/example/news'},
            '/example': {page: '/example'},
        };

        console.log(defaultPathMap);

        // Object.entries(defaultPathMap).forEach(([key, value]) => {
        //     pathMap[key] = value;
        //
        //     LANGUAGES.forEach(language => {
        //         pathMap[`/${language}${key}`] = {...value, query: {language}};
        //     });
        // });

        return defaultPathMap;
    },

    publicRuntimeConfig: {
        localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'none',
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
