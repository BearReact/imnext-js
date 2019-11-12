/* eslint-disable react/no-unused-state */

import React from 'react';
import {storiesOf} from '@storybook/react';
import TabSwiper from '../TabSwiper';

const tabList = [
    {name: 'NEW MEMBER'},
    {name: 'LIVE CASINO'},
    {name: 'SLOTS'},
    {name: 'SPORTSBOOK'},
    {name: 'LOTTERY'},
    {name: 'OTHERS'}
];

class StateComponent extends React.PureComponent {
    state = {
        activeIndex: 0
    };

    handleChangeIndex = index => {
        this.setState({activeIndex: index});
    };

    render() {
        const {activeIndex} = this.state;
        return (
            <React.Fragment>
                <TabSwiper item={tabList} onChangeIndex={this.handleChangeIndex} />
                <div style={{padding: 10}}>
                    <div style={{paddingBottom: 30}}>Active Index: {activeIndex}</div>
                    <div style={{paddingBottom: 30}}>
                        因有的目錄較名稱較長, 若要按照設計稿保持3個在中間 (slidesPerView=4), 需要確認名稱长度不可太長,
                        否則會斷行 或需要用 省略符號處理(...)
                    </div>
                    <div>
                        <a href="#">[手機測試連結點我]</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

storiesOf('Atoms|TabSwiper', module).add('default', () => (
    <div style={{backgroundColor: '#f2f4f9', height: '100%', width: '100%'}}>
        <StateComponent />
    </div>
));
