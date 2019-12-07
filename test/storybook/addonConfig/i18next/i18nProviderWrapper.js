// @flow

import React, {Suspense} from 'react';
import {I18nextProvider} from 'react-i18next';
import {i18n as providerProps} from '@library/i18next/configureI18Next';

type Props = {
    children?: React.Node,
    i18n: any,
    locale: string,
};
type State = {};

/**
 * provider
 */
function I18nProviderWrapper(props: Props) {
    const {children, i18n, locale} = props;

    React.useEffect(() => {
        i18n.changeLanguage(locale);
    }, [i18n, locale]);

    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
        </I18nextProvider>
    );
}
I18nProviderWrapper.defaultProps = {
    children: null,
};

export default {
    provider: I18nProviderWrapper,
    providerProps: {i18n: providerProps},
    supportedLocales: ['en-US', 'zh-CN'],
    providerLocaleKey: 'locale',
};
