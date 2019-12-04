const express = require('express');
const path = require('path');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('../../src/library/i18next/configureI18Next');

module.exports = router => {
    // 開放靜態資源路由
    router.use(nextI18NextMiddleware(nextI18next));
    router.use('/static', express.static(path.join(__dirname, '../../public/static')));
    router.use('/public/static', express.static(path.join(__dirname, '../../public/static')));
};
