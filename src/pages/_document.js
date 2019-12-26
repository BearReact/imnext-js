import React from 'react';
import Document from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import get from 'lodash/get';
import sites from '@config/site';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props}/>),
            });

            // ========= Setting global var (config: src/server/index.js) =============
            const siteCode = ctx.res.getHeader('Site-Code');
            const siteEnv = process.env.SITE_ENV || 'production'; // sandbox, staging, production
            const siteConfig = sites.find(row => row.siteCode === siteCode);

            // config/site.js 必須要有對應的 siteCode
            if (typeof siteConfig === 'undefined') {
                throw Error('can\'t find siteCode in config/site.js');
            }
            const {
                siteId, ...config
            } = siteConfig;

            // eslint-disable-next-line no-underscore-dangle
            global.__global__ = {
                ...config,
                siteId: get(siteId, siteEnv, ''), // SiteId因配合後端設計特例
            };
            const globalConst = JSON.stringify(__global__);
            // ========================================================================

            // getInitialProps
            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    // eslint-disable-next-line react/react-in-jsx-scope
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}

                        {
                            // Create global var
                            <script dangerouslySetInnerHTML={{
                                __html:
                                    `window.__global__ = ${globalConst.toString()};`,
                            }}
                            />
                        }
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

}
