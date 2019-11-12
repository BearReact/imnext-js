import React from 'react';
import {storiesOf} from '@storybook/react';
import RefreshButton from '../RefreshButton';

storiesOf('Molecules|RefreshButton', module).add('default', () => (
    <React.Fragment>
        <RefreshButton />
        <RefreshButton isRefresh />
    </React.Fragment>
));
