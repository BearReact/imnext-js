import React from 'react';
import {storiesOf} from '@storybook/react';
import DepositBranchSwiper from '../DepositBranchSwiper';

const branchCardList = [
    {id: 1, name: '支付寶渠道 1', depositMinAmount: 10, depositMaxAmount: 3000},
    {id: 2, name: '支付寶渠道 2', depositMinAmount: 50, depositMaxAmount: 5000},
    {id: 3, name: '支付寶渠道 3', depositMinAmount: 30, depositMaxAmount: 6600},
    {id: 4, name: '支付寶渠道 4', depositMinAmount: 100, depositMaxAmount: 10000}
];

class StateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: 1
        };
    }

    handleSelected = id => {
        this.setState({
            isSelected: id
        });
    };

    render() {
        const {isSelected} = this.state;
        return <DepositBranchSwiper isSelected={isSelected} onSelected={this.handleSelected} source={branchCardList} />;
    }
}

storiesOf('Molecules|DepositBranchSwiper', module).add('default', () => <StateComponent />);
