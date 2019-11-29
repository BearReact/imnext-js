// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
// const {initReactI18next} = require('react-i18next');
const NextI18Next = require('next-i18next').default;

const I18Next = new NextI18Next({
    defaultLanguage: 'en-US',
    otherLanguages: ['en-US', 'zh-CN', 'th-TH', 'vi-VN'],
    cleanCode: true,
    localePath: typeof window === 'undefined' ? 'public/static/locales' : 'static/locales',
    // localeSubpaths,
    // localeSubpaths: {
    //     'zh-CN': 'cn',
    //     'en-US': 'en',
    // }
    // use: [initReactI18next],
});


module.exports = I18Next;