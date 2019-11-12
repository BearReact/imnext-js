import React from 'react';
import {storiesOf} from '@storybook/react';
import MemberInfo from '../MemberInfo';

storiesOf('Molecules|MemberInfo', module).add('default', () => (
    <div className="container">
        <div className="row">
            <div style={{marginTop: 30, marginLeft: 30}}>
                <MemberInfo level={4} account="VV5C1029" memberLevelName="Platinum" />
            </div>
        </div>
    </div>
));
