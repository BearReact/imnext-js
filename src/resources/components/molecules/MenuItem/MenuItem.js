// @flow
/**
 * MenuItem
 */
import * as React from 'react';
import styled,{css} from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import {isEmpty} from '@utils/equal';

import Icon from '@components/atoms/Icon';
import A from '@components/atoms/A';


type Props = {
    style?: React.CSSProperties,
    name: string,
    icon: string,
    desc?: string,
    href?: string,
    as?: string,
    isHasNotRead: boolean,
    className?: string,
    isActive?: boolean,
    onClick?: Function,
    isStar?: boolean,
    label?: string
};
type State = {};

class MenuItem extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null,
        desc: null,
        href: '#',
        as: undefined,
        isActive: false,
        onClick: ()=>{},
        isStar: false,
        label: null
    };

    render() {
        const {style, name, desc, icon, href, as, isHasNotRead, className, isActive, onClick, isStar, label} = this.props;
        return (
            <MenuItemRoot style={style} className={className} href={href} as={as} isActive={isActive}
                onClick={onClick} isStar={isStar}
                target={as === 'a' ? '_blank' : undefined}>
                <IconArea>
                    <MenuIcon isInline code={icon} color="#9b9b9b" shapeType="default" shapeColor="#292c31" size={24} isStar={isStar} />
                    {icon === 'notice' && isHasNotRead && <Dot />}
                </IconArea>
                <MenuInfo>
                    <Name>{name}</Name>
                    <Desc>{desc}</Desc>
                </MenuInfo>
                {!isEmpty(label) &&
                    <NewArea>{label}</NewArea>
                }
            </MenuItemRoot>
        );
    }
}

export default MenuItem;

const Desc = styled.div`
    font-size: ${px2vw(10)};
    font-weight: 100;
    
    @media ${screen.lg} {
       font-size: 12px;
    }
`;
const Name = styled.div`
    font-size: ${px2vw(14)};
    font-weight: 900;
    
    @media ${screen.lg} {
       font-size: 14px;
    }
`;

const MenuInfo = styled.div`
    padding-left: ${px2vw(16)};
    flex-direction: row;
    
    @media ${screen.lg} {
        padding-left: 16px;
    }
`;

const MenuIcon = styled(Icon)`
    background-color: ${props => props.isStar ? props.theme.primaryColor : '#292c31'};  
`;

const MenuItemRoot = styled(A)`
    height: 0; // ie11
    border-bottom: 1px solid rgba(41, 44, 49, .7);
    min-height: ${px2vw(60)};
    display: flex;
    align-items: center;
    padding-left: ${px2vw(26)};
    color: #9b9b9b;
    cursor: pointer;
    position: relative;

    :hover {
        color: #9b9b9b;
    }
    
    
    ${props => (props.isActive || props.isStar) && css`
        color: ${props => props.theme.primaryColor};

        .iconfont{
            color: ${props => props.isStar ? '#fff' : props.theme.primaryColor};
        }
    `}
    
    @media ${screen.lg} {
        min-height: 60px;
        padding-left: 0;
        margin-left: 26px;
        margin-right: 20px;
        
        :hover {
            color: ${props => props.theme.primaryColor};
            
            .iconfont{
                color: ${props => props.isStar ? '#fff' : props.theme.primaryColor};
            }
        }
    }
`;

const IconArea = styled.div`
    position: relative; 
`;

const Dot = styled.div`
    width: ${px2vw(10)};
    height: ${px2vw(10)};
    background-color: #d0021b;
    position: absolute;
    border-radius: ${px2vw(99)};
    top: ${px2vw(-3)};
    right: ${px2vw(-3)};
    border: ${props => `solid 1px ${props.theme.headerBackgroundColor}`};
    
    @media ${screen.lg} {
        width: 10px;
        height: 10px;
        top: -3px;
        right: -3px;
    }
`;

const NewArea = styled.div`
    background-color: #ff4b4b;
    border-radius: 3px;
    text-align: center;
    position: absolute;
    top: 50%;
    right: ${px2vw(20)};
    padding: ${px2vw(2.5)} ${px2vw(5)};
    font-size: ${px2vw(10)};
    min-width: ${px2vw(38)};
    transform: translateY(-50%);
    color: #fff;
    
    @media ${screen.lg} {
        padding: 2.5px 5px;
        font-size: 10px;
        right: 0;
        min-width: 38px;
    }
`;
