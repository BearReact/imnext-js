// https://medium.com/blueeast/adding-internationalization-addon-in-storybook-72c1bc793bcd
import React from 'react';
import {addLocaleData} from 'react-intl';

addLocaleData([
    ...require('react-intl/locale-data/en'),
    ...require('react-intl/locale-data/zh'),
    ...require('react-intl/locale-data/th')
]);

const langConfig = {
    'zh-CN': require('../../../src/resources/lang/zh-CN.json'),
    'en-US': require('../../../src/resources/lang/en-US.json'),
    'th-TH': require('../../../src/resources/lang/th-TH.json')
};

const getMessages = (locale) => langConfig[locale];

// eslint-disable-next-line react/prop-types
const TranslationWrapper = ({dangerouslySetInnerHTML, ...props}) =>
    dangerouslySetInnerHTML ? (
        <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props} />
    ) : (
        <React.Fragment {...props} />
    );


export default {
    locales: ['en-US', 'zh-CN', 'th-TH'],
    defaultLocale: 'en-US',
    getMessages,
    textComponent: TranslationWrapper
};
