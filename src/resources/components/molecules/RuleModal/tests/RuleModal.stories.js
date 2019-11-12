import React from 'react';
import {storiesOf} from '@storybook/react';
import ReactHtmlParser from 'react-html-parser';

import RuleModal from '../RuleModal';

const content = `
    <span>Advancement condition: Calculated based on the total accumulated deposit amount of the member. Members will be upgraded to the corresponding VIP level depending on the total accumulated deposit amount. Promotion bonus will be given immediately when the VIP level of the member is upgraded.</span>
    <span>Example: If a member has a total accumulated deposits of 125,000 on January 5th, he will be promoted to become a level VIP10 member. He or she will be entitled to receive all the promotion bonuses from VIP1~VIP10 (limited to one time only).</span>
    <span>Example: If a member has a total accumulated deposits of 125,000 on January 5th, he will be promoted to become a level VIP10 member. He or she will be entitled to receive all the promotion bonuses from VIP1~VIP10 (limited to one time only).</span>
    <span>Example: If a member has a total accumulated deposits of 125,000 on January 5th, he will be promoted to become a level VIP10 member. He or she will be entitled to receive all the promotion bonuses from VIP1~VIP10 (limited to one time only).</span>
    <span>Example: If a member has a total accumulated deposits of 125,000 on January 5th, he will be promoted to become a level VIP10 member. He or she will be entitled to receive all the promotion bonuses from VIP1~VIP10 (limited to one time only).</span>
`;

storiesOf('Molecules|RuleModal', module)
    .add('default', () => (
        <RuleModal
            titleStyle={{
                color: 'black'
            }}
            html={ReactHtmlParser(content)}
            isShow
        />
    ));
