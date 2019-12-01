import React from 'react';
import {storiesOf} from '@storybook/react';
import {linkTo} from '@storybook/addon-links';
import BlockTitle from '../BlockTitle';

// import { I18nextProvider } from 'react-i18next';
// import i18n from '@library/i18next/configureI18Next';
// import {appWithTranslation, i18n} from '@library/i18next/configureI18Next';

export default {
    title: 'Atoms|BlockTitle',
};

export const test = () => <BlockTitle>Title</BlockTitle>;
test.story = {
    name: 'to Storybook',
};

// export const default1 = appWithTranslation(test);
