import React from 'react';
import styled from 'styled-components';
import {storiesOf} from '@storybook/react';
import Button from '@components/atoms/Button';
import Select from '../Select';

class StateComponent extends React.PureComponent {
    state = {
        isOpen: false,
        selectValue: ''
    };

    handleToggleMenu = () => {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    };

    handleOk = value => {
        // console.log(value);
        this.setState({
            selectValue: value
        });
    };

    render() {
        const {isOpen, selectValue} = this.state;

        const optionList = [
            {value: '', text: 'No deposit account selected'},
            {
                value: 2,
                text: (
                    <React.Fragment>
                        <DangerText>NEW</DangerText> 9991-2536-4122
                    </React.Fragment>
                )
            },
            {value: 3, text: 'PAST ****_****_****-1235'},
            {value: 4, text: 'PAST ****_****_****-5568'},
            {value: 5, text: 'PAST ****_****_****-9876'}
        ];

        return (
            <React.Fragment>
                <Content>
                    <div>
                        <Button theme="primary" onClick={this.handleToggleMenu}>
                            Select: [{selectValue}]
                        </Button>

                        <div style={{margin: 15}}>
                            <a href="#" style={{color: '#fff'}}>
                                Mobile Test
                            </a>
                        </div>
                    </div>
                </Content>

                <Select
                    isOpen={isOpen}
                    value={selectValue}
                    options={optionList}
                    onToggleMenu={this.handleToggleMenu}
                    onOk={this.handleOk}
                />
            </React.Fragment>
        );
    }
}

storiesOf('Atoms|Select', module).add('default', () => <StateComponent />);

const DangerText = styled.span`
    color: #d0021b;
    font-weight: 900;
`;

const Content = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;
