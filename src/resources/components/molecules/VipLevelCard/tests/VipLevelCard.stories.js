import React from 'react';
import {storiesOf} from '@storybook/react';
import VipLevelCard from '../VipLevelCard';

storiesOf('Molecules|VipLevelCard', module).add('bonus', () => (
    <VipLevelCard
        isBonus
        level={4}
        upLevelBonus={10}
        weekBonus={20}
        weekNeedDeposit={200}
        monthBonus={30}
        monthNeedDeposit={300}
        birthdayBonus={40}
        lotteryRebate=""
        depositAmount={500}
        casinoRebate="0.75%"
        sportRebate="0.35%"
        slotsRebate="0.65%"
        iPointBonusCalcUnit="350"
    />
)).add('rebate', () => (
    <VipLevelCard
        level={4}
        upLevelBonus={10}
        weekBonus={20}
        weekNeedDeposit={200}
        monthBonus={30}
        monthNeedDeposit={300}
        birthdayBonus={40}
        lotteryRebate=""
        depositAmount={500}
        casinoRebate="0.75%"
        sportRebate="0.35%"
        slotsRebate="0.65%"
        iPointBonusCalcUnit="500"
    />
));
