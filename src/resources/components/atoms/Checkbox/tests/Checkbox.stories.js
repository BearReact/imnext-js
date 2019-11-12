import React from 'react';
import {storiesOf} from '@storybook/react';
import BlockTitle from '@components/atoms/BlockTitle';
import Checkbox from '../Checkbox';

class StateComponent extends React.PureComponent {
    state = {
        isChecked: false
    };

    handleChange = () => {
        const {isChecked} = this.state;
        this.setState({
            isChecked: !isChecked
        });
    };

    render() {
        const {isChecked} = this.state;
        return <Checkbox label="Remember Account" onChange={this.handleChange} isChecked={isChecked} />;
    }
}

storiesOf('Atoms|Checkbox', module).add('default', () => (
    <div className="container">
        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>受控組件</BlockTitle>
            </div>
            <div className="col-24">
                <StateComponent />
            </div>

            <div className="col-24 p-0">
                <BlockTitle>非受控組件</BlockTitle>
            </div>
            <div className="col-24">
                <Checkbox label="Remember Password" />
            </div>
        </div>
    </div>
));
