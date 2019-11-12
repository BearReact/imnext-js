import React from 'react';
import {storiesOf} from '@storybook/react';
import BlockTitle from '@components/atoms/BlockTitle';
import SerialNumberInput from '../SerialNumberInput';

storiesOf('Atoms|SerialNumberInput', module).add('default', () => (
    <React.Fragment>
        <BlockTitle>Serial Number</BlockTitle>

        <div className="container-fluid">
            <div className="row">
                <div className="col-24 pb-3">
                    <SerialNumberInput placeholder="請輸入充值卡密碼" />
                </div>
                <div className="col-24 pb-3">
                    <SerialNumberInput placeholder="請輸入充值卡密碼" />
                </div>
            </div>
        </div>
    </React.Fragment>
));
