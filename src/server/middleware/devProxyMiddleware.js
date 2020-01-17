import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';

const route = express.Router();
const proxyMiddlewareApiBaseUrl = process.env.PROXY_MIDDLEWARE_API_BASE_URL;

/**
 * 開發時需要的 ReProxy, 避免Cors問題
 * ex:
 *     key                          | client url path       | /api                           | http://localhost:3000/api/system/setting
 *     proxyMiddlewareApiBaseUrl    | Redirect Server To    | http://localhost:3000/mockApi  | http://localhost:3000/api/system/setting => http://localhost:3000/mockApi
 *     pathRewrite                  | Fix Path              | {'^/api': '/'}                 | http://localhost:3000/mockApi/api => http://localhost:3000/mockApi
 */
const devProxy = {
    '/api': {
        target: proxyMiddlewareApiBaseUrl,
        pathRewrite: {'^/api': '/'},
        changeOrigin: true,
    },
};

Object.keys(devProxy).forEach(context => {
    route.use(proxyMiddleware(context, devProxy[context]));
});

export default route;
