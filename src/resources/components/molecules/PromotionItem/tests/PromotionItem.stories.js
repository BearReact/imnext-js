import React from 'react';
import {storiesOf} from '@storybook/react';
import {asset} from '@utils/uri';
import PromotionItem from '../PromotionItem';

storiesOf('Molecules|PromotionItem', module).add('default', () => (
    <PromotionItem
        href="/"
        thumbUrl={asset('sample/images/promotion/sample-1.jpg')}
        deadline="2019-01-13 15:51:14"
        promotionStartTime="5/12/2019"
        promotionEndTime="9/30/2019"
        couponStatus="Free"
        title="Daily Unlimited Rebate Bonus , Double Cash Point Rebates , Daily Unlimited Rebate Bonus , Double Cash Point Rebates"
    />
));
