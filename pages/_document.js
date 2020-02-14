import React from 'react';
import Document from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props}/>),
            });

            // ========= Setting Global Var (config: src/server/index.js) =============
            const globalConst = JSON.stringify(__global__);

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
