// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
import {initReactI18next} from 'react-i18next';
import NextI18Next from 'next-i18next';

const I18Next = new NextI18Next({
    defaultLanguage: 'en-US',
    otherLanguages: ['zh-CN'],
    cleanCode: true,
    localePath: typeof window === 'undefined' ? 'public/static/locales' : 'static/locales',
    // localeSubpaths,
    // localeSubpaths: {
    //     'zh-CN': 'cn',
    //     'en-US': 'en',
    // }
    use: [initReactI18next],
});


export const {appWithTranslation, withTranslation, Link, i18n} = I18Next;
export default I18Next;
