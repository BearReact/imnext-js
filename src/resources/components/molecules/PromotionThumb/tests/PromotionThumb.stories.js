import React from 'react';
import {storiesOf} from '@storybook/react';
import PromotionThumb from '../PromotionThumb';

storiesOf('Molecules|PromotionThumb', module).add('default', () => (
    <PromotionThumb startTime="2018/01/20" endTime="2019/03/13" deadline="2019-03-13 15:51:14" />
));
