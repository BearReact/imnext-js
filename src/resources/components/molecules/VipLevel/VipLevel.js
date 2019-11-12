// @flow
/**
 * VipLevel
 */
import * as React from 'react';
import styled from 'styled-components';
import {asset} from '@utils/uri';
import get from 'lodash/get';

const vipLevelImage = [];
for (let i=0; i<=40; i+=1) {
    vipLevelImage.push({
        level: i,
        image: asset(`common/images/vip-level-icon/${i}.png`)
    });
}


type Props = {
    style?: React.CSSProperties,
    className?: string,
    level: number
};

type State = {};

class VipLevel extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null
    };

    render() {
        const {level, ...otherProps} = this.props;

        const levelIcon = vipLevelImage.find(item => item.level === level);

        return (
            <VipLevelView {...otherProps}>
                <VipLevelImage src={get(levelIcon, 'image')} alt="" />
            </VipLevelView>
        );
    }
}

export default VipLevel;

const VipLevelImage = styled.img`
    width: 100%;
    height: 100%;
    align-self: center;
    padding: 1px 3px;
`;

const VipLevelView = styled.div`
    width: 26px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 50%;
    display: inline-flex;
    align-content: center;
    justify-content: center;
`;
