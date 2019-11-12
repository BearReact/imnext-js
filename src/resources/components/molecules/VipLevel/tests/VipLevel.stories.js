import React from 'react';
import {storiesOf} from '@storybook/react';
import VipLevel from '../VipLevel';

storiesOf('Molecules|VipLevel', module).add('default', () => (
    <div>
        <VipLevel level={1} />
        <VipLevel level={2} />
        <VipLevel level={3} />
        <VipLevel level={4} />
        <VipLevel level={5} />
    </div>
));
