/* eslint-disable no-console */

import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {asset} from '@utils/uri';

import Icon from '@components/atoms/Icon/Icon';
import Button from '@components/atoms/Button/Button';
import LiveChatButton from '@components/molecules/LiveChatButton/LiveChatButton';
import NavBar from '../NavBar';

storiesOf('Atoms|NavBar', module)
    .add('default', () => (
        <NavBar
            left={
                <Button onClick={() => console.log('click menu')}>
                    <Icon code="menu" color="#fff" size={24} />
                </Button>
            }
            title={<img src={asset('ibet/images/header-logo.png')} height="100%" />}
            right={
                <Fragment>
                    <LiveChatButton />

                    <Button onClick={() => console.log('click menu')}>
                        <Icon code="ellipsisv" color="#fff" size={24} />
                    </Button>
                </Fragment>
            }
            style={{marginBottom: 15}}
        />
    ))
    .add('with vipBet', () => (
        <NavBar
            theme={{bgColor: '#15849c'}}
            left={
                <Button onClick={() => console.log('click menu')}>
                    <Icon code="menu" color="#fff" size={24} />
                </Button>
            }
            title={<img src={asset('vipbet/images/header-logo.png')} height="100%" />}
            right={
                <Fragment>
                    <LiveChatButton />

                    <Button onClick={() => console.log('click menu')}>
                        <Icon code="ellipsisv" color="#fff" size={24} />
                    </Button>
                </Fragment>
            }
            style={{marginBottom: 15}}
        />
    ))
    .add('with ebo', () => (
        <NavBar
            theme={{bgColor: '#26815e'}}
            left={
                <Button onClick={() => console.log('click menu')}>
                    <Icon code="menu" color="#fff" size={24} />
                </Button>
            }
            title={<img src={asset('ebo/images/header-logo.png')} height="100%" />}
            right={
                <Fragment>
                    <LiveChatButton />

                    <Button onClick={() => console.log('click menu')}>
                        <Icon code="ellipsisv" color="#fff" size={24} />
                    </Button>
                </Fragment>
            }
            style={{marginBottom: 15}}
        />
    ))
    .add('with shiau9', () => (
        <NavBar
            theme={{bgColor: '#d9b472'}}
            left={
                <Button onClick={() => console.log('click menu')}>
                    <Icon code="menu" color="#fff" size={24} />
                </Button>
            }
            title={<img src={asset('shiau9/images/header-logo.png')} height="100%" />}
            right={
                <Fragment>
                    <LiveChatButton />

                    <Button onClick={() => console.log('click menu')}>
                        <Icon code="ellipsisv" color="#fff" size={24} />
                    </Button>
                </Fragment>
            }
            style={{marginBottom: 15}}
        />
    ))
    .add('with tbet', () => (
        <NavBar
            theme={{bgColor: '#e73580'}}
            left={
                <Button onClick={() => console.log('click menu')}>
                    <Icon code="menu" color="#fff" size={24} />
                </Button>
            }
            title={<img src={asset('tbet/images/header-logo.png')} height="100%" />}
            right={
                <Fragment>
                    <LiveChatButton />

                    <Button onClick={() => console.log('click menu')}>
                        <Icon code="ellipsisv" color="#fff" size={24} />
                    </Button>
                </Fragment>
            }
            style={{marginBottom: 15}}
        />
    ))
    .add('with only back', () => (
        <NavBar
            left={
                <Button onClick={() => console.log('click menu')}>
                    <Icon code="back" color="#fff" size={24} />
                </Button>
            }
            style={{marginBottom: 15}}
        />
    ));
