import React, {Suspense} from "react";
import {I18nextProvider} from "react-i18next";
import i18n  from './configureI18Next';


/**
 * provider
 * @param children
 * @param i18n
 * @param locale
 * @returns {*}
 * @constructor
 */
function I18nProviderWrapper({ children, i18n, locale }) {
    React.useEffect(() => {
        i18n.changeLanguage(locale);
    }, [i18n, locale]);

    return <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>loading...</div>}>
            {children}
        </Suspense>
    </I18nextProvider>;
}


export default {
    provider: I18nProviderWrapper,
    providerProps: {i18n},
    supportedLocales: ["en-us", "zh-cn"],
    providerLocaleKey: "locale"
}
