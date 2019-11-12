import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import BlockTitle from '@components/atoms/BlockTitle';
import {asset} from '@utils/uri';
import Button from '../Button';

storiesOf('Atoms|Button', module).add('default', () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>Size Button</BlockTitle>
            </div>

            <div className="col-6">
                <Button theme="darkBlue" size="small" style={{minHeight: 30}} onClick={action('button-click')}>
                    JOIN
                </Button>
            </div>

            <div className="col-6">
                <Button theme="darkBlue" size="small" style={{minHeight: 30}} onClick={action('button-click')}>
                    PLAY
                </Button>
            </div>

            <div className="col-12">
                <Button theme="primary" style={{padding: '0 20px'}} shape="raised" onClick={action('button-click')}>
                    立即付款
                </Button>
            </div>
        </div>

        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>Block Button</BlockTitle>
            </div>

            <div className="col">
                <Button theme="primary" block onClick={action('button-click')}>
                    Login
                </Button>
            </div>
        </div>

        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>Shape Button</BlockTitle>
            </div>

            <div className="col-6">
                <Button theme="primary" size="small" onClick={action('button-click')}>
                    Details
                </Button>
            </div>

            <div className="col-6">
                <Button theme="primary" shape="raised" size="small" onClick={action('button-click')}>
                    Details
                </Button>
            </div>
            <div className="col-6">
                <Button theme="primary" shape="circle" size="small" onClick={action('button-click')}>
                    Details
                </Button>
            </div>
        </div>

        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>Theme Button</BlockTitle>
            </div>

            <div className="col-12 pb-3">
                <Button theme="gray" block onClick={action('button-click')}>
                    Gray
                </Button>
            </div>

            <div className="col-12 pb-3">
                <Button theme="darkBlue" block onClick={action('button-click')}>
                    Dark Blue
                </Button>
            </div>

            <div className="col-12 pb-3">
                <Button theme="primary" block onClick={action('button-click')}>
                    Primary
                </Button>
            </div>

            <div className="col-12 pb-3">
                <Button theme="danger" block onClick={action('button-click')}>
                    Danger
                </Button>
            </div>

            <div className="col-12 pb-3">
                <Button theme="warning" block onClick={action('button-click')}>
                    Warning
                </Button>
            </div>

            <div className="col-24 pb-3">
                <Button onClick={action('button-click')}>
                    <img src={asset('common/images/button/btn-play.png')} alt="play" width="100%" />
                </Button>
            </div>
        </div>
    </div>
));
