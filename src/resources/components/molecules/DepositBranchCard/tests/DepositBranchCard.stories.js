import React from 'react';
import {storiesOf} from '@storybook/react';
import DepositBranchCard from '../DepositBranchCard';

class StateComponent extends React.Component {
    state = {
        isSelected: false
    };

    handleSelect = () => {
        const {isSelected} = this.state;
        this.setState({
            isSelected: !isSelected
        });
    };

    render() {
        const {isSelected} = this.state;
        return (
            <DepositBranchCard
                depositBranchName="微信渠道 1"
                depositMinAmount={10}
                depositMaxAmount={3000}
                isSelected={isSelected}
                onClick={this.handleSelect}
            />
        );
    }
}

storiesOf('Molecules|DepositBranchCard', module).add('default', () => (
    <div style={{margin: 15}}>
        <StateComponent />
    </div>
));
