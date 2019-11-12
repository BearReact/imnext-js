import React from 'react';
import {storiesOf} from '@storybook/react';
import Tabs from '../Tabs';

const tabList = [
    {value: 'casino', text: 'CASINO'},
    {value: 'sport', text: 'SPORT'},
    {value: 'solts', text: 'SOLTS'},
    {value: 'lottery', text: 'LOTTERY'}
];

class StateComponent extends React.PureComponent {
    state = {
        activeCode: null
    };

    handleOnChange = activeCode => {
        this.setState({activeCode});
    };

    render() {
        const {activeCode} = this.state;
        return (
            <React.Fragment>
                <Tabs item={tabList} onChange={this.handleOnChange} activeValue={activeCode} />
                <div style={{padding: 10, color: '#fff'}}>
                    <div style={{paddingBottom: 30}}>Active Index: {activeCode}</div>
                    <div>
                        <a href="#">[手機測試連結點我]</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

storiesOf('Molecules|Tabs', module).add('default', () => <StateComponent />);
