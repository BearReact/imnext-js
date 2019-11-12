import React from 'react';
import {storiesOf} from '@storybook/react';
import TimePicker from '../TimePicker';



class StateComponent extends React.PureComponent {

    state = {
        selectedTime: null
    };


    handleChange = (value) => {
        this.setState({
            selectedTime: value
        });
    };

    render() {
        const {selectedTime} = this.state;

        return (
            <React.Fragment>
                <div style={{color: '#fff', marginBottom: 80}}>selected: {selectedTime}</div>
                <TimePicker
                    value={selectedTime}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}


storiesOf('Atoms|TimePicker', module)
    .add('default', () => (
        <div className="container">
            <div className="row">
                <div className="col" style={{margin: '10px 50px'}}>
                    <StateComponent/>
                </div>
            </div>
        </div>
    ));
