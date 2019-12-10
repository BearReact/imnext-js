const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // CUSTOM PACKAGES:
            '@public': path.resolve(__dirname, 'public'),
            '@assets': path.resolve(__dirname, 'src/resources/assets'),
            '@layouts': path.resolve(__dirname, 'src/resources/layouts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@container': path.resolve(__dirname, 'src/resources/container'),
            '@components': path.resolve(__dirname, 'src/resources/components'),
            '@themes': path.resolve(__dirname, 'src/resources/themes'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@library': path.resolve(__dirname, 'src/library'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@middleware': path.resolve(__dirname, 'src/middleware'),
            '@config': path.resolve(__dirname, 'src/config'),
        },
    },
};
