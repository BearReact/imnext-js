import React from 'react';
import {storiesOf} from '@storybook/react';
import VipBackground from '../VipBackground';

storiesOf('Molecules|VipBackground', module).add('default', () => (
    <React.Fragment>
        <container>
            <div style={{width: '100%', height: 200, backgroundColor: '#00a3e0'}}/>
            <VipBackground>
                <span style={{textAlign: 'center'}}>Hello World</span>
            </VipBackground>
        </container>
    </React.Fragment>
));
