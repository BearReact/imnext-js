// @flow

import React from 'react';
import {storiesOf} from '@storybook/react';
import LobbyCard from '../LobbyCard';

type Props = {
    isMaintain?: boolean
};
type State = {
    isSelected: boolean
}

class StateComponent extends React.PureComponent<Props, State> {
    static defaultProps = {
        isMaintain: false
    };

    state = {
        isSelected: false
    };

    handleSelected = () => {
        const {isSelected} = this.state;

        this.setState({
            isSelected: !isSelected
        });
    };

    handlePlay = () => {};

    render() {
        const {isMaintain} = this.props;
        const {isSelected} = this.state;
        return (
            <LobbyCard
                code={1040}
                isSelected={isSelected}
                onClick={this.handleSelected}
                onPlay={this.handlePlay}
                categoryList={['casino', 'slot']}
                isLocked
                isMaintain={isMaintain}
            />
        );
    }
}

storiesOf('Molecules|LobbyCard', module)
    .add('default', () => <StateComponent />)
    .add('isMaintain', () => <StateComponent isMaintain/>);
