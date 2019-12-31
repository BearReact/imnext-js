import express from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
import get from 'lodash/get';
import sites from '@config/site';
import nextI18next from '../library/i18next/configureI18Next';
import routes from '../library/next-route';

const port = process.env.PORT || 3000;
const app = next({dev: process.env.NODE_ENV !== 'production'});
// const handle = app.getRequestHandler();
const handle = routes.getRequestHandler(app);

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
        const siteEnv = process.env.SITE_ENV || 'production'; // sandbox, staging, production
        const siteConfig = sites.find(row => row.siteCode === siteCode);

        // config/site.js 必須要有對應的 siteCode
        if (typeof siteConfig === 'undefined') {
            throw Error('can\'t find siteCode in config/site.js');
        }
        const {
            siteId, ...config
        } = siteConfig;

        // 依站台設定預設語系
        nextI18next.i18n.init({lng: config.defaultLang});
        // eslint-disable-next-line no-underscore-dangle
        global.__global__ = {
            ...config,
            siteId: get(siteId, siteEnv, ''), // SiteId 因配合後端設計特例
        };
        // ========================================================================

        appNext();
    });

    server.use(nextI18NextMiddleware(nextI18next));

    server.get('*', (req, res) => handle(req, res));

    await server.listen(port);
    console.log(`🚀 Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
