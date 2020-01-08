import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import nextI18NextMiddleware from 'next-i18next/middleware';
import nextI18next from '../library/i18next/configureI18Next';
import {getRequestHandler} from '../library/nextRoute';
import multiPlatformInit from './middleware/multiPlatformInit';
import mockApi from './mockApi';

const port = process.env.PORT || 3000;
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handle = getRequestHandler(app);

(async () => {
    await app.prepare();
    const server = express();

    server.use(bodyParser.json());
    server.use(multiPlatformInit);
    server.use(nextI18NextMiddleware(nextI18next));

    // 模擬後端資料
    server.use('/mockApi', mockApi);

    server.get('*', (req, res) => handle(req, res));

    await server.listen(port);
    console.log(`🚀 Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
