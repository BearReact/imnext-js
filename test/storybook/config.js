/* eslint-disable */
import React from 'react';
import {configure, addParameters} from '@storybook/react';
import { base, viewports } from './addonConfig';

// Option defaults.
addParameters({
    options: base,
    viewport: viewports,
});

configure([
    require.context('../../src/resources/components/atoms', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/molecules', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/organisms', true, /\.stories\.(js|tsx?|mdx)$/),
], module);
