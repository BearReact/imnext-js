// @flow
/**
 * Input
 */
import * as React from 'react';
import styled from 'styled-components';
import Icon from '@components/atoms/Icon';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    className?: any,
    style?: React.CSSProperties,
    children?: React.Node,
    placeholder?: string,
    placeholderColor?: string,
    shape?: string,
    isShowClean?: boolean,
    onChange?: Function,
    onFocus?: Function,
    symbol?: string,
    icon?: string,
    textAlign?: string,
    color?: '',
    value: string,
    defaultValue: string,
    type?: string,
    ref?: any,
    disabled?: boolean,
    maxLength?: number,
    backgroundColor?: string,
    autoFillColor?: string,
    focusBackgroundColor?: string,
    onClick?: Function,
    onBlur?: Function,
    isAutoHeight?: boolean,
    isBlock?: boolean,
    autocomplete?: string,
    id?: string
};
type State = {};

const shapeConfig = {
    default: {
        shape: px2vw(5)
    },
    raised: {
        shape: 0
    },
    circle: {
        shape: px2vw(22)
    }
};

class Input extends React.PureComponent<Props, State> {
    static defaultProps = {
        className: undefined,
        style: undefined,
        children: undefined,
        placeholder: undefined,
        placeholderColor: undefined,
        shape: null,
        isShowClean: false,
        onChange: () => {},
        symbol: undefined,
        icon: undefined,
        textAlign: 'left',
        color: undefined,
        type: 'text',
        ref: undefined,
        disabled: false,
        maxLength: undefined,
        onClick: undefined,
        onBlur: undefined,
        backgroundColor: undefined,
        autoFillColor: undefined,
        focusBackgroundColor: undefined,
        isAutoHeight: false,
        isBlock: false,
        autocomplete: 'off',
        onFocus: undefined,
        id: undefined
    };

    handleChange = e => {
        const {onChange} = this.props;
        onChange(e.target.value);
    };

    render() {
        const {
            symbol,
            icon,
            shape,
            onChange,
            textAlign,
            placeholderColor,
            isShowClean,
            color,
            style,
            className,
            children,
            value,
            defaultValue,
            type,
            placeholder,
            ref,
            disabled,
            maxLength,
            onClick,
            onBlur,
            backgroundColor,
            autoFillColor,
            isAutoHeight,
            isBlock,
            focusBackgroundColor,
            autocomplete,
            id,
            onFocus
        } = this.props;
        const shapeProps = shape ? shapeConfig[shape] : {};

        return (
            <InputRoot isBlock={isBlock}>
                {symbol && <Symbol>{symbol}</Symbol>}
                <InputText
                    id={id}
                    ref={ref}
                    isShowClean={isShowClean}
                    autocomplete={autocomplete}
                    placeholderColor={placeholderColor}
                    backgroundColor={backgroundColor}
                    autoFillColor={autoFillColor}
                    type={type}
                    textAlign={textAlign}
                    placeholder={placeholder}
                    style={style}
                    className={className}
                    color={color}
                    maxLength={maxLength}
                    defaultValue={defaultValue || undefined}
                    value={defaultValue ? undefined : value}
                    symbol
                    config={{...shapeProps}}
                    disabled={disabled}
                    shape={shape}
                    onChange={e => onChange(e.target.value)}
                    onClick={onClick}
                    isAutoHeight={isAutoHeight}
                    focusBackgroundColor={focusBackgroundColor}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                {icon && <InputIcon code={icon} size={24} color={color} />}

                {children}

                {isShowClean && (
                    <ClearButton onClick={() => onChange('')}>
                        <Icon code="close-circle" color="#9b9b9b" size={18} />
                    </ClearButton>
                )}
            </InputRoot>
        );
    }
}

export default Input;

const ClearButton = styled.div`
    position: absolute;
    right: 0;
`;


const InputIcon = styled(Icon)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${px2vw(15)};
    
    @media ${screen.lg} {
        left: 15px;
    }
`;

const InputText = styled.input`
    color: ${props => props.color || props.theme.primaryColor};
    border: ${props => (props.config.shape ? '#fff 1px solid' : 'none')};
    text-align: ${props => props.textAlign};
    border-radius: ${props => props.config.shape};
    width: 100%;
    background-color: ${props => props.backgroundColor || 'transparent'};
    height: ${props => props.isAutoHeight ? 'auto' : px2vw(44)};
    font-size: ${px2vw(14)};
    font-weight: 900;
    flex: 1 1 auto;
    padding-left: ${props => (props.textAlign==='left' && props.shape === 'circle') ? px2vw(20): undefined};
    padding-right: ${props => (props.textAlign === 'right' && props.shape === 'circle') ? px2vw(20): undefined};
 
    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${props => props.placeholderColor || props.theme.inputPlaceholderColor};
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder, /* Internet Explorer 10-11 */
    ::-ms-input-placeholder /* Microsoft Edge */ 
    {
        color: ${props => props.placeholderColor || props.theme.inputPlaceholderColor};
    }
    
    ::-ms-clear,::-ms-reveal{
        /* 隱藏 IE Input 的所有功能(密碼, Clear按鈕) */
        display:none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:active {
        -webkit-text-fill-color: ${props => props.placeholderColor || props.theme.inputPlaceholderColor};
    }
    &:-webkit-autofill:focus{
        -webkit-box-shadow: 0 0 0px 1000px ${props => props.focusBackgroundColor || 'transparent'} inset;
        -webkit-text-fill-color: ${props=>props.theme.primaryColor};
    }
    
    &:focus{
        transition: none;
        
        &::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            opacity: 0; /* Firefox */
        }
        background-color: ${props => props.focusBackgroundColor || 'transparent'};
        color: ${props=>props.theme.primaryColor};
        
        + ${InputIcon} > i{
            color: ${props=>props.theme.primaryColor};
        }
    }
    
     
    @media ${screen.lg} {
        font-size: 14px;
        padding-left: ${props => (props.textAlign==='left' && props.shape === 'circle') ? '20px': undefined};
        padding-right: ${props => (props.textAlign === 'right' && props.shape === 'circle') || props.isShowClean ? '25px': undefined};
        height: ${props => props.isAutoHeight ? 'auto' : '44px'};
    }
`;


const Symbol = styled.span`
    color: ${props => props.color || props.theme.primaryColor};
    padding-right: px2vw(2);
    flex: 0 0 auto;
    
    @media ${screen.lg} {
        padding-right: 2px;
    }
`;



const InputRoot = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${props=> props.isBlock ? '100%' : 'auto'};
    
    span {
        color: ${props => props.color || props.theme.primaryColor};
        padding-right: ${px2vw(5)};
        
        @media ${screen.lg} {
            padding-right: 5px;
        }
    }
    
`;
