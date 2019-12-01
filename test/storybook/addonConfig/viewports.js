import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';

const {
    iphone5, iphone6, iphone6p, iphonex, iphonexr, iphonexsmax,
} = INITIAL_VIEWPORTS;

// Viewport List
// https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts

export default {
    viewports: {
        iphone5, iphone6, iphone6p, iphonex, iphonexr, iphonexsmax,
    }, // newViewports would be an ViewportMap. (see below for example)
};
