import express from 'express';
import get from 'lodash/get';
import sites from '@config/site';
import nextI18next from '@library/i18next/configureI18Next';
import {checkIsUrl} from '@utils/uri';
import {jsonDecode} from '@utils/format';
import {version} from '../../../package';

const route = express.Router();

/**
 * 開發 | 部署設定站台代碼
 * 若 .env 有設定 SITE_CODE 則捨動 Set Header Site-Code,
 * 反之則由反向代理伺服器 add_Header Site-Code proxy_pass
 */
route.use(async (req, res, appNext) => {
    const siteCode = process.env.SITE_CODE || get(req, 'headers.Site-Code', 'default');
    const siteEnv = process.env.SITE_ENV || 'production'; // sandbox, staging, production
    const siteConfig = sites.find(row => row.siteCode === siteCode);

    // config/site.js 必須要有對應的 siteCode
    if (typeof siteConfig === 'undefined') {
        throw Error('can\'t find siteCode in config/site.js');
    }
    const {
        siteId, ...config
    } = siteConfig;

    // 如果不是url是path, 則使用 req host 作為API前綴域名路徑
    const envApiBaseUrl = process.env.API_BASE_URL || '/';
    const hostName = `${req.protocol}://${req.get('host')}`;
    const baseApiUrl = checkIsUrl(process.env.API_BASE_URL) ? process.env.API_BASE_URL : `${hostName}${envApiBaseUrl}`;
    const cookies = await req.cookies;

    // console.log('server cookie', dayjs().format('h:m:s'), cookies);

    // 依站台設定預設語系
    nextI18next.i18n.init({lng: config.defaultLang});

    // eslint-disable-next-line no-underscore-dangle
    global.__global__ = {
        ...config,
        appVersion: version, // version
        siteId: get(siteId, siteEnv, ''), // SiteId 因配合後端設計特例
        baseApiUrl,
    };

    // eslint-disable-next-line no-underscore-dangle
    global.__cookie__ = {
        // 持久化Redux State
        persistState: jsonDecode(get(cookies, 'persistState', '{}')),
    };
    // ========================================================================

    appNext();
});

export default route;
