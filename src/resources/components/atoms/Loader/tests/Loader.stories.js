import React from 'react';
import {storiesOf} from '@storybook/react';
import Loader from '../Loader';

storiesOf('Atoms|Loader', module).add('default', () => (
    <Loader isLoading>
        <div style={{height: '100vh', width: '100vw', backgroundColor: '#bdbdbd'}}>test loading</div>
    </Loader>
));
