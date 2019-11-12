import React from 'react';
import {storiesOf} from '@storybook/react';
import DatePicker from '../DatePicker';



class StateComponent extends React.PureComponent {

    state = {
        selectedDate: null
    };


    handleChange = (value) => {
        this.setState({
            selectedDate: value
        });
    };

    render() {
        const {selectedDate} = this.state;

        return (
            <React.Fragment>
                <div style={{color: '#fff', marginBottom: 80}}>selected: {selectedDate}</div>
                <DatePicker
                    value={selectedDate}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}


storiesOf('Atoms|DatePicker', module)
    .add('default', () => (
        <div className="container">
            <div className="row">
                <div className="col" style={{margin: '10px 50px'}}>
                    <StateComponent/>
                </div>
            </div>
        </div>
    ));
