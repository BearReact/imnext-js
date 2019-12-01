// @flow

import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

import {withTranslation} from '@library/i18next/configureI18Next';

type Props = {
    style?: $Shape<CSSStyleDeclaration>,
    className?: string,
    children?: React.Node,
    t: Function,
};
type State = {};

class BlockTitle extends React.PureComponent<Props, State> {
    render() {
        const {children, style, className} = this.props;
        const {t} = this.props;

        return (
            <BlockTitleRoot style={style} className={className}>
                {children}
            </BlockTitleRoot>
        );
    }
}

BlockTitle.defaultProps = {
    style: undefined,
    className: undefined,
    children: null,
};

export default withTranslation(['common'])(BlockTitle);

const BlockTitleRoot = styled.div`
    color: ${(props) => props.theme.listTitleColor};
    padding: ${px2vw(20)} ${px2vw(10)} ${px2vw(10)};
    line-height: ${px2vw(17)};

    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${px2vw(12)};
    font-weight: 900;

    @media ${screen.lg} {
        padding: 20px 10px 10px 0;
        line-height: 17px;
        font-size: 12px;
    }
`;
