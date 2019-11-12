// @flow
/**
 * Select
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import {isEmpty} from '@utils/equal';
import {px2vw} from '@utils/format';
import {isMobile} from '@utils/browser';
import screen from '@themes/Screen';

import Icon from '@components/atoms/Icon';
import Select from './Select';

type Props = {
    style?: React.CSSProperties,
    className?: any,
    onChange: Function,
    onOk: Function,
    value: string | number,
    defaultText?: string,
    options: Array<{
        value: string,
        text: React.Node
    }>,
    icon?: string,
    title?: string,
    disabled?: boolean,
    isHidden?: boolean,
    backgroundColor?: string
};
type State = {
    selectValue: string | number
};

class FormSelect extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        defaultText: '',
        title: '',
        icon: '',
        disabled: false,
        isHidden: false,
        backgroundColor: ''
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
        const {onChange, onOk} = this.props;
        this.setState({
            selectValue: value
        });
        onChange(value);

        if (onOk) {
            onOk();
        }
    };

    render() {
        const {isHidden, options, value, title, disabled, defaultText, icon, className, style, backgroundColor} = this.props;
        const {selectValue, isOpen} = this.state;
        const isCheckMobile = isMobile();

        const selectObj = options.find(o => String(o.value) === String(value)) || options[0] || {value: '', text: defaultText};
        const isSelected = !isEmpty(selectObj.value);
        const selectText = <SelectText isSelected={isSelected}>{selectObj.text}</SelectText>;

        return (
            <FormItem disabled={disabled}
                onClick={() => (disabled || !isCheckMobile ? {} : this.handleToggleMenu())}
            >
                {!isEmpty(title) &&
                    <Title>{title}</Title>
                }
                <SelectContainer className={className} backgroundColor={backgroundColor}>
                    <Icon code={icon} type="svg" size={30}/>

                    {selectText}
                    <DownIconPosition>
                        <Icon code="sort-down" size={16} color="#737b8c"/>
                    </DownIconPosition>


                    {isCheckMobile ?
                        <Select
                            isOpen={isOpen}
                            value={selectValue}
                            defaultValue={value}
                            options={options}
                            onToggleMenu={this.handleToggleMenu}
                            onOk={this.handleOk}
                        />
                        :
                        <SelectInput onChange={e => this.handleOk(e.target.value)}
                            value={selectValue}
                            defaultValue={value}
                            disabled={disabled}
                        >
                            {options.map(row => (
                                <option value={row.value} key={uniqueId('select_')}>
                                    {row.text}
                                </option>
                            ))}
                        </SelectInput>
                    }
                </SelectContainer>
            </FormItem>

        );
    }
}

export default FormSelect;


const RequireStar = styled.span`
    color: #ff4b4b;
    margin-left: 5px;
    font-size: ${px2vw(14)};
    
    @media ${screen.lg} {
        font-size: 14px;
    }
`;


const Title = styled.div`
    font-size: ${px2vw(12)};
    color: #fff;
    padding: ${px2vw(10)} 0;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: -${px2vw(15)};
        width: ${px2vw(6)};
        height: ${px2vw(6)};
        transform: translateY(-50%) rotate(45deg);
        border: solid 2px ${siteConfig.theme.cardContentColor};
        border-left: none;
        border-bottom: none; 
    }
    
    @media ${screen.lg} {
        font-size: 12px;
        padding: 10px 0;
        
        &:after {
            width: 6px;
            height: 6px;
            right: -15px;
        }
    }
`;

const DownIconPosition = styled.div`
    position: absolute;
    right: ${px2vw(20)};
    
    @media ${screen.lg} {
        right: 20px;
    }
`;

const SelectContainer = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: ${props => props.backgroundColor};
      padding: ${px2vw(5)} ${px2vw(10)};
      border-radius: 5px;
      
      @media ${screen.lg} {
        padding: 5px 10px;
    }
`;


const SelectInput = styled.select`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    font-size: ${px2vw(16)};
    z-index: 4;
    
    @media ${screen.lg} {
        font-size: 16px;
    }
`;


const SelectText = styled.div`
    font-size: ${px2vw(14)};
    font-weight: 900;
    color: #737b8c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 ${px2vw(10)};
    border-radius: 2px;
    display: none;
    
    ${props => props.isSelected && css`
        color: #fff;
    `};
    
    
    @media ${screen.lg} {
        font-size: 14px;
        padding: 0 10px;
    }
`;


const FormItem = styled.div`

     ${props=>props.disabled && css`
        ${SelectText}{
            color: #737b8c;
        }
    `};
     

`;
