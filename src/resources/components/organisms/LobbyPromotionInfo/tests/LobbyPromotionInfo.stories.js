import React from 'react';
import {storiesOf} from '@storybook/react';
import LobbyPromotionInfo from '../LobbyPromotionInfo';

storiesOf('Organisms|LobbyPromotionInfo', module).add('default', () => (
    <div style={{padding: 40}}>
        <LobbyPromotionInfo
            promotionTitle="Live Casino 100%  New iBET registration gets instant RM8 FREE"
            currentRollingAmount={5000}
            needRollingAmount={50000}
            isPormotionUnlockApply
            showRolling
        />
    </div>
));
