import React from 'react';
import {storiesOf} from '@storybook/react';
import Favorite from '../Favorite';

storiesOf('Molecules|Favorite', module).add('default', () => (
    <React.Fragment>
        <Favorite />
        <Favorite isFavourite />
    </React.Fragment>
));
