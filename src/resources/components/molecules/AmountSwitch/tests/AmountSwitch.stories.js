import React from 'react';
import {storiesOf} from '@storybook/react';
import AmountSwitch from '../AmountSwitch';

const tabList = [
    50, 100, 300.00, 500, 1000, 3000
];

class StateComponent extends React.PureComponent {
    state = {
        activeIndex: null
    };

    handleOnChange = activeIndex => {
        this.setState({activeIndex});
    };

    render() {
        const {activeIndex} = this.state;
        return (
            <React.Fragment>
                <AmountSwitch item={tabList} onChange={this.handleOnChange} activeIndex={activeIndex} />
                <div style={{padding: 10, color: '#fff'}}>
                    <div style={{paddingBottom: 30}}>Active Index: {activeIndex}</div>
                    <div>
                        <a href="#">[手機測試連結點我]</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

storiesOf('Molecules|AmountSwitch', module).add('default', () => <StateComponent />);
