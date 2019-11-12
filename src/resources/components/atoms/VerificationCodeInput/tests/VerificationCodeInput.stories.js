// @flow
import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import styled from 'styled-components';
import VerificationCodeInput from '../VerificationCodeInput';

type Props = {};
type State = {
    serial: string
};

class StateComponent extends Component<Props, State> {
    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            serial: ''
        };
    }

    render() {
        const {serial} = this.state;

        return (
            <div style={{
                padding: 20
            }}>
                <VerificationCodeInput
                    length={14}
                    onChange={val => {
                        this.setState({serial: val});
                    }}
                />
                <Content>Serial: {serial}</Content>
            </div>
        );
    }
}

const Content = styled.div`
    color: #fff;
`;

storiesOf('Atoms|VerificationCodeInput', module).add(
    'default', () => <StateComponent />
);
