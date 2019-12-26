import {asset} from '@utils/uri';

export default [
    {
        siteCode: 'default',
        siteName: 'IMNEXT-JS',
        meta: {
            title: 'IMNEXT-JS - React Out-of-the-box, integrated third-party suites required for website development',
            description: 'React Out-of-the-box, integrated third-party suites required for website development',
        },
        googleBot: {
            noIndex: true,
        },
        country: 'malaysia',
        defaultLang: 'en-US',
        blackLang: ['en-US', 'zh-CN'],
        siteId: {
            sandbox: 'A',
            staging: 'A',
            production: 'E',
        },
        templateCode: 'default',
        image: {
            loginLogo: asset('site/default/images/login-logo.png'),
        },
        theme: {
            pwaStartUpBackground: '#0e0f13',
            primaryColor: '#d9b472',
            primaryContrastColor: '#d9b472',
            primaryGradientColor: '#d9b472',
        },
    },
];
