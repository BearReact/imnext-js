/* eslint-disable */
import {configure, addParameters, addDecorator} from '@storybook/react';
import {withI18n} from "storybook-addon-i18n";
import {themes} from '@storybook/theming';
import {viewports, i18next} from './addonConfig';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

// Option defaults.
addParameters({
    options: {
        theme: themes.dark
    },
    viewport: viewports,
    i18n: i18next
});


// Option Decorator.
addDecorator(withI18n);
addDecorator(withTranslation);


// Load stories file
configure([
    require.context('../../src/resources/components/atoms', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/molecules', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/organisms', true, /\.stories\.(js|tsx?|mdx)$/),
], module);
