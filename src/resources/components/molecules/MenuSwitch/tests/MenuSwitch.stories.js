import React from 'react';
import {storiesOf} from '@storybook/react';
import MenuSwitch from '../MenuSwitch';

storiesOf('Molecules|MenuSwitch', module).add('default', () => (
    <React.Fragment>
        <MenuSwitch />
        <MenuSwitch isHasNew />
    </React.Fragment>
));
