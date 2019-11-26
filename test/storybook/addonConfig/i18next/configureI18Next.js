import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {join} from "path";
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
// load translation using xhr -> see /public/locales
// learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: process.env.I18N_DEBUG === 'true',
        preload: ['en-us'], // 預先載入語系字典檔
        whitelist: ['en-us', 'zh-cn'], // 可使用的語系白名單
        fallbackLng: 'en-us', // 預設使用的語系(當沒指定任何語系的時候)
        ns: ['common'], // 預先載入的語系字典檔類別
        defaultNS: 'common', // 預設使用的字典檔類別
        load: 'currentOnly', // 語系碼格式 ex:
        //                               'all'          -> 'en-US', 'en', 'dev'
        //                               'currentOnly'  -> 'en-US
        //                               'languageOnly' -> 'en'
        saveMissing: false, // 是否儲存有使用到卻位定義的字典
        lowerCaseLng: true, // 是否改成小寫 en-US
        backend: {
            // 字典檔讀取路徑
            loadPath: join(__dirname, '../../public/static/locales/{{lng}}/{{ns}}.json'),
            // 有使用到卻位定義的字典寫入路徑
            addPath: join(__dirname, '../../public/static/locales/{{lng}}/{{ns}}.missing.json')
        },
        // ==================== 只有ServerSide使用, ClientSide不使用這裡的設定 ====================
        detection: {
            order: ['querystring', 'cookie', 'header'], // 允許設定語系的方法 (ex: querystring,cookie,header)
            lookupQuerystring: 'lang', // 如果使用querystring,設定Key （ex: lang -> //localhost/home?lang=en-us)
            lookupSession: 'i18next', // 如果使用session,設定Key
            caches: false // client-side:cookie, server-side: false
        }
        // react i18next special options (optional)
        // react: {
        //     wait: false,
        //     nsMode: 'fallback' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
        // }
    });


export default i18n;
