import React from 'react';
import styled from 'styled-components';
import {storiesOf} from '@storybook/react';

import Button from '@components/atoms/Button/Button';
import Menu from '@components/organisms/Menu/Menu';
import Panel from '../Panel';

class StateComponent extends React.PureComponent {
    state = {
        isOpen: false
    };

    handleToggleMenu = () => {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    };

    render() {
        const {isOpen} = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div>
                        <Button theme="primary" onClick={this.handleToggleMenu}>
                            Switch
                        </Button>
                    </div>
                </Content>

                <Panel isOpen={isOpen} handleToggleMenu={this.handleToggleMenu}>
                    <Menu />
                </Panel>
            </React.Fragment>
        );
    }
}

storiesOf('Atoms|Panel', module).add('default', () => <StateComponent />);

const Content = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;
