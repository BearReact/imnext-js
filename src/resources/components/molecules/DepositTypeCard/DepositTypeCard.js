// @flow
/**
 * DepositTypeCard
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import Icon from '@components/atoms/Icon/Icon';
import A from '@components/atoms/A';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';



type Props = {
    style?: React.CSSProperties,
    className?: string,
    href?: string,
    isMaintain: boolean,
    name: string
};

type State = {};

class DepositTypeCard extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        href: ''
    };

    render() {
        const {className, style, href, isMaintain, name} = this.props;
        return (
            <DepositTypeCardLink
                href={isMaintain ? '#' : href}
                className={className}
                style={style}
                isMaintain={isMaintain}
            >
                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-start">
                        <DepositTypeName>{name}</DepositTypeName>
                        <MaintainingText>维护中</MaintainingText>
                    </div>
                </div>
                <Icon code="chevron-right" color={isMaintain ? '#9b9b9b' : siteConfig.theme.primaryColor} size={16} />
            </DepositTypeCardLink>
        );
    }
}

export default DepositTypeCard;


const MaintainingText = styled.div`
    display: none;
    font-size: ${px2vw(12)};
    font-weight: 900;
    color: #ff4b4b;
    margin-left: ${px2vw(10)};
    
    @media ${screen.lg} {
        margin-left: 10px;
        font-size: 12px;
    }
`;

const DepositTypeName = styled.div`
    font-size: ${px2vw(16)};
    font-weight: 900;
    color: ${props => props.theme.primaryColor};
    margin-bottom: ${px2vw(4)};
    
    @media ${screen.lg} {
        font-size: 16px;
        margin-bottom: 4px;
    }
`;

const DepositTypeCardLink = styled(A)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${px2vw(60)};
    border-radius: ${px2vw(3)};
    background-color: #edeff2;
    padding: ${px2vw(14)} ${px2vw(14)} ${px2vw(14)} ${px2vw(10)};
    cursor: ${props => (props.isMaintain ? 'default' : 'pointer')};

    ${props =>
        props.isMaintain &&
        css`
            ${DepositTypeName} {
                color: #9b9b9b;
            }
            ${MaintainingText} {
                display: block;
            }
        `};
    
    @media ${screen.lg} {
        height: 60px;
        border-radius: 3px;
        padding: 14px 14px 14px 10px;
    }
`;
