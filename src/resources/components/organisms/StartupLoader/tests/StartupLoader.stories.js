/* eslint-disable no-console */

import React from 'react';
import {storiesOf} from '@storybook/react';
import StartupLoader from '../StartupLoader';

class StateComponent extends React.PureComponent {
    state = {
        selectCode: undefined
    };

    handleSelected = code => {
        this.setState({
            selectCode: code
        });
    };

    handleSetFavourite = code => {
        console.log(`送出API更新LobbyCode=${code} 設定為最愛遊戲館`);
    };

    render() {
        const {selectCode} = this.state;
        const sourceList = [
            {
                name: 'AG',
                code: 1560,
                amount: 99913.01,
                isFavourite: true,
                categoryList: [{categoryId: 'slot'}, {categoryId: 'lottery'}]
            },
            {
                name: 'XPG',
                code: 1090,
                amount: 40948.02,
                categoryList: [{categoryId: 'slot'}, {categoryId: 'casino'}]
            },
            {
                name: 'PT',
                code: 1220,
                amount: 233.01,
                categoryList: [{categoryId: 'sport'}, {categoryId: 'slot'}],
                isLocked: true
            },
            {
                name: 'BBIN',
                code: 1240,
                amount: 432.01,
                categoryList: [{categoryId: 'slot'}],
                isLocked: true
            }
        ];

        return (
            <StartupLoader
                activeCategoryCode="slot"
                source={sourceList}
                onSelected={this.handleSelected}
                onSetFavourite={this.handleSetFavourite}
                selectLobbyCode={selectCode}
            />
        );
    }
}

storiesOf('Organisms|StartupLoader', module).add('default', () => <StateComponent />);
