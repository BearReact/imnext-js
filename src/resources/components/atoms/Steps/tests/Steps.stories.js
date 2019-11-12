import React from 'react';
import {storiesOf} from '@storybook/react';
import BlockTitle from '@components/atoms/BlockTitle';
import Steps from '../Steps';

storiesOf('Atoms|Steps', module).add('default', () => (
    <div className="container-fluid">
        <BlockTitle>In Step 1</BlockTitle>
        <div className="row">
            <Steps activeStep={1} />
        </div>

        <BlockTitle>In Step 2</BlockTitle>
        <div className="row">
            <Steps activeStep={2} />
        </div>

        <BlockTitle>In Step 3</BlockTitle>
        <div className="row">
            <Steps activeStep={3} />
        </div>

        <BlockTitle>All Step Only 2 Step1</BlockTitle>
        <div className="row">
            <Steps activeStep={1} totalStep={2} />
        </div>

        <BlockTitle>All Step Only 2 Step2</BlockTitle>
        <div className="row">
            <Steps activeStep={2} totalStep={2} />
        </div>
    </div>
));
