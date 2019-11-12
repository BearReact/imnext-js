import React from 'react';
import {storiesOf} from '@storybook/react';
import Counter from '../Counter';

storiesOf('Molecules|Counter', module).add('default', () => (
    <Counter
        className="d-lg-none ml-auto"
        promotionEndTime='2019-11-31 22:17:00'
        dayText="D"
        hourText="H"
        minuteText="M"
        secondText="S"
    />
));
