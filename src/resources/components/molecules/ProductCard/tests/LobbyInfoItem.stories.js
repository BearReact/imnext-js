// @flow

import React from 'react';
import {storiesOf} from '@storybook/react';
import ProductCard from '../ProductCard';

type Props = {
    isMaintain?: boolean
};

class StateComponent extends React.PureComponent<Props, State> {
    static defaultProps = {
        isMaintain: false
    };

    handlePlay = () => {};

    render() {
        const {isMaintain} = this.props;
        return (
            <ProductCard
                code={1040}
                name='iTV'
                isFree
                onPlay={this.handlePlay}
                isMaintain={isMaintain}
            />
        );
    }
}

storiesOf('Molecules|ProductCard', module)
    .add('default', () => <StateComponent />)
    .add('isMaintain', () => <StateComponent isMaintain/>);
