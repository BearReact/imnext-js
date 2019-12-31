const {setConfig} = require('next/config');
setConfig(require('./next.config'));

// issue: https://github.com/zeit/next.js/issues/1735
require('@babel/register')({
    presets: ['@babel/preset-env'],
    ignore: ['node_modules', '.next'],
});

require('./src/server');
