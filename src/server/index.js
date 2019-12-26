const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('../library/i18next/configureI18Next');

const port = process.env.PORT || 3000;
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handle = app.getRequestHandler();

(async () => {
    await app.prepare();
    const server = express();

    /**
     * 開發 | 部署設定站台代碼
     * 若 .env 有設定 SITE_CODE 則捨動 Set Header Site-Code,
     * 反之則由反向代理伺服器 add_Header Site-Code proxy_pass
     */
    server.use((req, res, appNext) => {
        const siteCode = (process.env.SITE_CODE || res.getHeader('Site-Code')) || 'default';
        res.append('Site-Code', siteCode);
        appNext();
    });

    server.use(nextI18NextMiddleware(nextI18next));

    server.get('*', (req, res) => handle(req, res));

    await server.listen(port);
    console.log(`🚀 Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
