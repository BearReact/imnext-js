import React from 'react';
import {storiesOf} from '@storybook/react';
import LobbyTabs from '../LobbyTabs';

const tabList = [
    {code: 'casino', name: 'CASINO'},
    {code: 'sport', name: 'SPORT'},
    {code: 'solts', name: 'SOLTS'},
    {code: 'lottery', name: 'LOTTERY'}
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
                <LobbyTabs item={tabList} onChange={this.handleOnChange} activeItemCode={activeCode} />
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

storiesOf('Molecules|LobbyTabs', module).add('default', () => <StateComponent />);
