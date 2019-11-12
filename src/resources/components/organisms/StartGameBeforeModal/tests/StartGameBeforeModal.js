import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import StartGameBeforeModal from '../StartGameBeforeModal';

const walletData = {
    data: {
        amount: 10,
        name: 'iMoney',
        lobbyCode: 1140
    },
    statusType: 'success',
    statusCode: 709,
    message: 'Congratulations on your successful storage.'
};

const categoryList = [
    {id: 1, name: 'PT', categoryId: 'Casino', hasComputer: true, link: 'www.google.com'},
    {id: 2, name: 'PT', categoryId: 'Slots', hasComputer: false, link: 'www.google.com'}
];

const PromotionInfo = {
    promotionTitle: 'Live Casino 100%  New iBET registration gets instant RM8 FREE',
    currentRollingAmount: 15000,
    needRollingAmount: 50000,
    isPromotionUnlockApply: true
};

const PromotionInfo2 = {
    promotionTitle: 'Live Casino 100%  New iBET registration gets instant RM8 FREE',
    currentRollingAmount: 15000,
    needRollingAmount: 50000,
    isPromotionUnlockApply: false
};

storiesOf('Organisms|StartGameBeforeModal', module)
    .add('noPromotion', () => (
        <StartGameBeforeModal
            source={categoryList}
            depositLink="http://www.yahoo.com"
            withdrawalLink="http://www.pchome.com.tw"
            onClick={action('click button-close')}
            amount={walletData.data.amount}
        />
    ))
    .add('pormotionUnlockApplyTrue', () => (
        <StartGameBeforeModal
            promotionInfo={PromotionInfo}
            source={categoryList}
            depositLink="http://www.yahoo.com"
            withdrawalLink="http://www.pchome.com.tw"
            onClick={action('click button-close')}
        />
    ))
    .add('pormotionUnlockApplyFalse', () => (
        <StartGameBeforeModal
            promotionInfo={PromotionInfo2}
            source={categoryList}
            depositLink="http://www.yahoo.com"
            withdrawalLink="http://www.pchome.com.tw"
            onClick={action('click button-close')}
        />
    ));
