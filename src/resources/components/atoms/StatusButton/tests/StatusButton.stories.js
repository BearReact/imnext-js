import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import BlockTitle from '@components/atoms/BlockTitle';
import StatusButton from '../StatusButton';

storiesOf('Atoms|StatusButton', module).add('default', () => (
    <div className="container-fluid">
        <div className="row pb-2">
            <div className="col-24 p-0">
                <BlockTitle>default size</BlockTitle>
            </div>

            <div className="col-8">
                <StatusButton size="default" type='correct' isActive onClick={action('button-click')} />
            </div>

            <div className="col-8">
                <StatusButton size="default" type='next' isActive onClick={action('button-click')} />
            </div>

            <div className="col-8">
                <StatusButton size="default" type='next' isActive onClick={action('button-click')} />
            </div>
        </div>

        <div className="row pb-2">
            <div className="col-24 p-0">
                <BlockTitle>normal size</BlockTitle>
            </div>

            <div className="col-8">
                <StatusButton size="normal" type='correct' isActive={false} onClick={action('button-click')} />
            </div>

            <div className="col-8">
                <StatusButton size="normal" type='next' isActive={false} onClick={action('button-click')} />
            </div>

            <div className="col-8">
                <StatusButton size="normal" type='next' isActive={false} onClick={action('button-click')} />
            </div>
        </div>

        <div className="row pb-2">
            <div className="col-24 p-0">
                <BlockTitle>small size</BlockTitle>
            </div>

            <div className="col-8">
                <StatusButton size="small" type='correct' isActive onClick={action('button-click')} />
            </div>

            <div className="col-8">
                <StatusButton size="small" type='next' isActive onClick={action('button-click')} />
            </div>

            <div className="col-8">
                <StatusButton size="small" type='next' isActive onClick={action('button-click')} />
            </div>
        </div>
    </div>
));
