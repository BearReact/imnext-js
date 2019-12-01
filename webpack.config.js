const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // CUSTOM PACKAGES:
            '@public': path.resolve(__dirname, 'public'),
            '@assets': path.resolve(__dirname, 'src/resources/assets'),
            '@themes': path.resolve(__dirname, 'src/resources/themes'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@container': path.resolve(__dirname, 'src/container'),
            '@components': path.resolve(__dirname, 'src/resources/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@library': path.resolve(__dirname, 'src/library'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@middleware': path.resolve(__dirname, 'src/middleware'),
        },
    },
};
