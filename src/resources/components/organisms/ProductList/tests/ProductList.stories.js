/* eslint-disable no-console */

import React from 'react';
import {storiesOf} from '@storybook/react';
import ProductList from '../ProductList';

class StateComponent extends React.PureComponent {
    handlePlay = () => {};

    render() {
        const sourceList = [
            {
                name: 'iTV',
                code: 1560,
                isHidden: false,
                isFree: true,
                isMaintain: false
            },
            {
                name: 'iMOVEW',
                code: 1090,
                isHidden: false,
                isFree: true,
                isMaintain: false
            },
            {
                name: 'IMALL',
                code: 1220,
                isHidden: false,
                isFree: false,
                isMaintain: true
            },
            {
                name: 'BBIN',
                code: 1240,
                isHidden: false,
                isFree: false,
                isMaintain: false
            }
        ];

        return (
            <ProductList
                activeCategoryCode="5"
                source={sourceList}
                onPlay={this.handlePlay}
            />
        );
    }
}

storiesOf('Organisms|ProductList', module).add('default', () => <StateComponent />);
