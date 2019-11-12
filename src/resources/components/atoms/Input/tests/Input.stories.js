import React from 'react';
import {storiesOf} from '@storybook/react';

import BlockTitle from '@components/atoms/BlockTitle';
import List, {ListItem} from '@components/atoms/List';
import Input from '../Input';

class StateComponent extends React.PureComponent {
    state = {
        amount: 0
    };

    render() {
        const {amount} = this.state;
        return (
            <ListItem
                title="Deposit Amount"
                after={
                    <Input
                        isShowClean
                        type="number"
                        pattern="[0-9]{2}"
                        value={amount}
                        onChange={val => this.setState({amount: val})}
                    />
                }
            />
        );
    }
}

storiesOf('Atoms|Input', module).add('default', () => (
    <React.Fragment>
        <BlockTitle>Login Form</BlockTitle>
        <div className="container-fluid">
            <div className="row">
                <div className="col-24 pb-3">
                    <Input placeholder="USERNAME" icon="user" shape="circle" textAlign="center" color="#fff" />
                </div>
                <div className="col-24 pb-3">
                    <Input placeholder="PASSWORD" icon="key" shape="circle" textAlign="center" color="#fff" />
                </div>
            </div>
        </div>

        <BlockTitle>List Form</BlockTitle>
        <List>
            <ListItem title="Real Name" after="Imagine" afterStyle={{width: '50%'}} />
            <ListItem title="Deposit Amount" after={<Input symbol="$" />} />
            <StateComponent />
        </List>
    </React.Fragment>
));
