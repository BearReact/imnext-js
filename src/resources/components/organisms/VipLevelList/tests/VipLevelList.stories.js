/* eslint-disable no-console */

import React from 'react';
import {storiesOf} from '@storybook/react';
import VipLevelList from '../VipLevelList';

const vipListData = [
    {
        level: 1,
        depositAmount: 1000,
        upLevelBonus: 100,
        weekBonus: 10,
        weekNeedDeposit: 100,
        monthBonus: 10,
        monthNeedDeposit: 100,
        birthdayBonus: 10,
        casinoRebate: '0.15%',
        sportRebate: '0.25%',
        slotsRebate: '0.35%',
        lotteryRebate: ''
    },
    {
        level: 2,
        depositAmount: 2000,
        upLevelBonus: 200,
        weekBonus: 20,
        weekNeedDeposit: 200,
        monthBonus: 20,
        monthNeedDeposit: 200,
        birthdayBonus: 20,
        casinoRebate: '0.45%',
        sportRebate: '0.55%',
        slotsRebate: '0.65%',
        lotteryRebate: ''
    },
    {
        level: 3,
        depositAmount: 3000,
        upLevelBonus: 300,
        weekBonus: 30,
        weekNeedDeposit: 300,
        monthBonus: 30,
        monthNeedDeposit: 300,
        birthdayBonus: 30,
        casinoRebate: '0.75%',
        sportRebate: '0.85%',
        slotsRebate: '0.95%',
        lotteryRebate: ''
    },
    {
        level: 4,
        depositAmount: 4000,
        upLevelBonus: 400,
        weekBonus: 40,
        weekNeedDeposit: 400,
        monthBonus: 40,
        monthNeedDeposit: 400,
        birthdayBonus: 40,
        casinoRebate: '1.05%',
        sportRebate: '1.15%',
        slotsRebate: '1.25%',
        lotteryRebate: ''
    },
    {
        level: 5,
        depositAmount: 5000,
        upLevelBonus: 500,
        weekBonus: 50,
        weekNeedDeposit: 500,
        monthBonus: 50,
        monthNeedDeposit: 500,
        birthdayBonus: 50,
        casinoRebate: '1.35%',
        sportRebate: '1.45%',
        slotsRebate: '1.55%',
        lotteryRebate: ''
    },
    {
        level: 6,
        depositAmount: 4000,
        upLevelBonus: 400,
        weekBonus: 40,
        weekNeedDeposit: 400,
        monthBonus: 40,
        monthNeedDeposit: 400,
        birthdayBonus: 40,
        casinoRebate: '1.05%',
        sportRebate: '1.15%',
        slotsRebate: '1.25%',
        lotteryRebate: ''
    },
    {
        level: 7,
        depositAmount: 5000,
        upLevelBonus: 500,
        weekBonus: 50,
        weekNeedDeposit: 500,
        monthBonus: 50,
        monthNeedDeposit: 500,
        birthdayBonus: 50,
        casinoRebate: '1.35%',
        sportRebate: '1.45%',
        slotsRebate: '1.55%',
        lotteryRebate: ''
    },
    {
        level: 8,
        depositAmount: 5000,
        upLevelBonus: 500,
        weekBonus: 50,
        weekNeedDeposit: 500,
        monthBonus: 50,
        monthNeedDeposit: 500,
        birthdayBonus: 50,
        casinoRebate: '1.35%',
        sportRebate: '1.45%',
        slotsRebate: '1.55%',
        lotteryRebate: ''
    },
    {
        level: 9,
        depositAmount: 4000,
        upLevelBonus: 400,
        weekBonus: 40,
        weekNeedDeposit: 400,
        monthBonus: 40,
        monthNeedDeposit: 400,
        birthdayBonus: 40,
        casinoRebate: '1.05%',
        sportRebate: '1.15%',
        slotsRebate: '1.25%',
        lotteryRebate: ''
    },
    {
        level: 10,
        depositAmount: 5000,
        upLevelBonus: 500,
        weekBonus: 50,
        weekNeedDeposit: 500,
        monthBonus: 50,
        monthNeedDeposit: 500,
        birthdayBonus: 50,
        casinoRebate: '1.35%',
        sportRebate: '1.45%',
        slotsRebate: '1.55%',
        lotteryRebate: ''
    }
];


storiesOf('Organisms|VipLevelList', module).add('default', () =>
    <VipLevelList
        source={vipListData}
    />);
