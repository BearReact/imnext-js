import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import styled from 'styled-components';
import GameLobby from '@themes/Images/GameLobby';
import BlockTitle from '@components/atoms/BlockTitle';
import Icon from '@components/atoms/Icon';
import List from '../List';
import ListItem from '../ListItem';

storiesOf('Atoms|List', module).add('default', () => (
    <React.Fragment>
        <BlockTitle>Simple List</BlockTitle>
        <List>
            <ListItem title="Item 1" />
            <ListItem title="Item 2" />
            <ListItem title="Item 3" />
        </List>

        <BlockTitle>Simple Links List</BlockTitle>
        <List>
            <a href="#">
                <ListItem
                    title="Bank"
                    after={
                        <Fragment>
                            <span>MayBank</span>
                            <Icon code="chevron-right" color="#d8d8d8" size={16} />
                        </Fragment>
                    }
                    justContent="between"
                />
            </a>
            <ListItem
                title="Wallet"
                after="MayBank"
                afterIcon={<Icon code="update" color="#d8d8d8" size={20} />}
                justContent="between"
            />
            <ListItem title="Tel" after="0978123456" />
            <a href="#">
                <ListItem
                    title="Password"
                    afterIcon={<Icon code="chevron-right" color="#d8d8d8" size={16} />}
                    justContent="between"
                />
            </a>
        </List>

        <BlockTitle>DATA LIST, WITH ICONS</BlockTitle>
        <List>
            <ListItem
                title={<div style={{fontWeight: 900, fontSize: 14}}>BBIN</div>}
                media={<LobbyLogoRadio image={GameLobby['1240']} />}
            />
            <ListItem title="SUBBET" media={<LobbyLogoRadio image={GameLobby['1260']} />} />
            <a href="#">
                <ListItem
                    title="XPG"
                    after="Edit"
                    media={<LobbyLogoRadio image={GameLobby['1090']} />}
                    justContent="between"
                />
            </a>
        </List>

        <BlockTitle>No Background</BlockTitle>
        <List style={{backgroundColor: 'transparent'}}>
            <ListItem title="Deposit Bank" after="iCARD" />
            <ListItem title="Deposit Amount" after="$ 10,000.00" />
            <ListItem title="Gaming Platform" after="AsiaGaming" />
        </List>
    </React.Fragment>
));

const LobbyLogoRadio = styled.div`
    border-radius: 100%;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
    background: transparent url("${props => props.image}") center center;
    background-size: 100%;
    width: 36px;
    height: 36px;
`;
