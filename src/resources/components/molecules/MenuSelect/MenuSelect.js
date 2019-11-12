// @flow
/**
 * MenuSelect
 */
import * as React from 'react';
import styled,{css} from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import uniqueId from 'lodash/uniqueId';
import get from 'lodash/get';
import {isMobile} from '@utils/browser';

import Icon from '@components/atoms/Icon';
import Select from '@components/atoms/Select/Select';

type Props = {
    style?: React.CSSProperties,
    name: string,
    icon: string,
    desc?: string,
    isHasNotRead: boolean,
    className?: string,
    disabled?: boolean,
    options: Array<{
        value: string,
        text: React.Node
    }>,
    onChange: Function,
    value: string
};
type State = {};

class MenuSelect extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null,
        desc: null,
        disabled: false
    };

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            selectValue: props.value
        };
    }


    handleToggleMenu = () => {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    };

    handleOk = value => {
        const {onChange} = this.props;

        this.setState({
            selectValue: value
        });
        onChange(value);
    };

    /**
     * 顯示語系名稱
     * @returns {*}
     */
    handleLanguageInfo = () => {
        const {options} = this.props;
        const {selectValue} = this.state;

        const index = siteConfig.blackLang.indexOf(selectValue);
        const nextLocale = siteConfig.blackLang[(index + 1) % siteConfig.blackLang.length];
        const showOtherLocale = get(options.find(row => row.value === nextLocale),'text', '');

        return showOtherLocale;
    };

    render() {
        const {style, name, desc, icon, isHasNotRead, className, disabled, options, value} = this.props;
        const {selectValue, isOpen} = this.state;
        const isCheckMobile = isMobile();

        return (
            <MenuSelectRoot style={style} className={className}>
                <IconArea>
                    <MenuIcon isInline code={icon} color="#9b9b9b" shapeType="default" shapeColor="#292c31" size={24} />
                    {icon === 'notice' && isHasNotRead && <Dot />}
                </IconArea>
                <MenuInfo>
                    <Name>{name}</Name>
                    <Desc>{desc}</Desc>
                </MenuInfo>
                <LanguageInfo>{this.handleLanguageInfo()}</LanguageInfo>

                <SelectArea isMobile={isCheckMobile} onClick={() => (disabled || !isCheckMobile ? {} : this.handleToggleMenu())}>
                    {isCheckMobile ?
                        <Select
                            isOpen={isOpen}
                            options={options}
                            onToggleMenu={this.handleToggleMenu}
                            onOk={this.handleOk}
                            value={selectValue}
                            defaultValue={value}
                        />
                        :
                        <SelectInput
                            onChange={e => this.handleOk(e.target.value)}
                            value={selectValue}
                            disabled={disabled}
                        >
                            {options.map(row => (
                                <option value={row.value} key={uniqueId('select_')}>
                                    {row.text}
                                </option>
                            ))}
                        </SelectInput>
                    }
                </SelectArea>
            </MenuSelectRoot>
        );
    }
}

export default MenuSelect;

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
    padding-right: ${px2vw(16)};
    padding-left: ${px2vw(16)};
    flex-direction: row;
    
    @media ${screen.lg} {
        padding-right: 0;
        padding-left: 16px;
    }
`;

const MenuIcon = styled(Icon)`
`;

const MenuSelectRoot = styled.div`
    height: 0; // ie11
    border-bottom: 1px solid rgba(41, 44, 49, .7);
    min-height: ${px2vw(60)};
    display: flex;
    align-items: center;
    padding-left: ${px2vw(26)};
    padding-right: ${px2vw(26)};
    color: #9b9b9b;
    position: relative;

    :hover {
        color: #9b9b9b;
    }
    
    ${props => props.isActive && css`
        color: ${props => props.theme.primaryColor};
            
        .iconfont{
            color: ${props => props.theme.primaryColor};
        }
    `}
    
    @media ${screen.lg} {
        min-height: 60px;
        padding-left: 0;
        padding-right: 0;
        margin-left: 26px;
        margin-right: 20px;
        
        :hover {
            color: ${props => props.theme.primaryColor};
            
            .iconfont{
                color: ${props => props.theme.primaryColor};
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
    bottom: ${px2vw(1)};
    right: ${px2vw(-3)};
    border: ${props => `solid 1px ${props.theme.headerBackgroundColor}`};
    
    @media ${screen.lg} {
        width: 10px;
        height: 10px;
        bottom: 1px;
        right: -3px;
    }
`;

const SelectArea = styled.div`
    ${props => props.isMobile && 
    css`
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    `}
`;

const SelectInput = styled.select`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    font-size: 16px;
    z-index: 4;
`;

const LanguageInfo = styled.p`
    margin: 0 0 0 auto;
    font-size: ${px2vw(14)};
    font-weight: 900;
    
    @media ${screen.lg} {
       font-size: 14px;
    }
`;
