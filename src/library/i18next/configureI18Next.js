// @flow
const remove = require('lodash/remove');
const NextI18Next = require('next-i18next').default;

/** ==================
        全部語系
================== */
const languagesObj = [
    {code: 'en-US', subPath: 'en'},
    {code: 'zh-CN', subPath: 'cn'},
];
const allLanguages = languagesObj.map(row => row.code);

/** ==================
        預設語系
================== */
const defaultLanguage = 'en-US';
let clientStaticBaseUrl = process.env.STATIC_BASE_URL || 'static';

// first string can not '/' (ex: /static)
if (clientStaticBaseUrl.substr(0) === '/') {
    clientStaticBaseUrl = clientStaticBaseUrl.substr(1);
}

/** ==================
     初始化I18Next (https://github.com/isaachinman/next-i18next#options)
 ================== */
const I18Next = new NextI18Next({
    defaultLanguage,
    defaultNS: 'common',
    otherLanguages: allLanguages,
    cleanCode: true,
    localePath: typeof window === 'undefined' ? 'public/static/locales' : `${clientStaticBaseUrl}/locales`,
});

// 將預設語系從全部語系中刪除 (若重複將導致 next export 缺少語系, 變成無法切換)
I18Next.i18n.languages = allLanguages.filter(code => code !== defaultLanguage);

module.exports = I18Next;
