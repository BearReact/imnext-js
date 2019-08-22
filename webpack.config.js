// webpack設定至 next.config.js, 這裡設定只是為了輔助 webstorm 識別對應路徑

const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // CUSTOM PACKAGES:
            '@components': path.resolve(__dirname, 'src/resources/components'),
            '@assets': path.resolve(__dirname, 'src/resources/assets'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@stores': path.resolve(__dirname, 'src/modules/redux'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@service': path.resolve(__dirname, 'src/service'),
            '@config': path.resolve(__dirname, 'src/config')
        }
    }
};
