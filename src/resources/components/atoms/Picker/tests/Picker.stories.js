/* eslint-disable no-console */

import React from 'react';
import {storiesOf} from '@storybook/react';
import Picker from '../Picker';

const dataList = [
    {value: '', text: 'No deposit account selected'},
    {value: 2, text: '9991-2536-4122'},
    {value: 3, text: '****_****_****-1235'},
    {value: 4, text: '****_****_****-5568'},
    {value: 5, text: '****_****_****-9876'}
];

class StateComponent extends React.PureComponent {
    state = {
        selectValue: ''
    };

    handleScrollChange = value => {
        this.setState({
            selectValue: value
        });
    };

    render() {
        const {selectValue} = this.state;
        return (
            <React.Fragment>
                <Picker
                    value={selectValue}
                    onScrollChange={val => console.log(`onScrollChange: ${val}`)}
                    onValueChange={this.handleScrollChange}
                >
                    {dataList.map(row => (
                        <Picker.Option value={row.value} key={row.value}>
                            {row.text}
                        </Picker.Option>
                    ))}
                </Picker>

                <div style={{color: '#fff', margin: 10}}>selectValue: {selectValue}</div>
                <div style={{color: '#ff6e95', margin: 10}}>該元件依賴套件 rmc-picker</div>
            </React.Fragment>
        );
    }
}

storiesOf('Atoms|Picker', module).add('default', () => <StateComponent />);
