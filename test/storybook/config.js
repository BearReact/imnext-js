/* eslint-disable */
import React from 'react';
import {configure} from '@storybook/react';

configure([
    require.context('../../src/resources/components/atoms', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/molecules', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/organisms', true, /\.stories\.(js|tsx?|mdx)$/),
], module);
