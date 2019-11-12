import React from 'react';
import {storiesOf} from '@storybook/react';
import DepositTypeCard from '../DepositTypeCard';

storiesOf('Molecules|DepositTypeCard', module)
    .add('default', () => (
        <div className="container">
            <div className="row">
                <div className="col" style={{marginTop: 10, marginBottom: 10}}>
                    <DepositTypeCard href="/" name="Online Bank" desc="Easy deposit online bank transfer" />
                </div>
            </div>
        </div>
    ))
    .add('maintaining', () => (
        <div className="container">
            <div className="row">
                <div className="col" style={{marginTop: 10, marginBottom: 10}}>
                    <DepositTypeCard href="/" name="Online Bank" desc="Easy deposit online bank transfer" isMaintain />
                </div>
            </div>
        </div>
    ));
