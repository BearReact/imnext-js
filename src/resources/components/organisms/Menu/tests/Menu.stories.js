import React from 'react';
import {storiesOf} from '@storybook/react';
import Menu from '../Menu';

storiesOf('Organisms|Menu', module).add('default', () => (
    <div style={{width: 270, minHeight: '100%', backgroundColor: '#141618'}}>
        <Menu />
    </div>
));
