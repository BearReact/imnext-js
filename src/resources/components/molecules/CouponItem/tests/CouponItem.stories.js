import React from 'react';
import {storiesOf} from '@storybook/react';
import {asset} from '@utils/uri';
import CouponItem from '../CouponItem';

storiesOf('Molecules|BonusCard', module).add('default', () => (
    <CouponItem
        href="/"
        thumbUrl={asset('/common/images/sample/promotion/sample-01.jpg')}
        deadline="2019-01-13 15:51:14"
        promotionStartTime="5/12/2018"
        promotionEndTime="9/30/2018"
    />
));
