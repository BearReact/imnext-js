// @flow
/**
 * Checkbox
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


type Props = {
    style?: React.CSSProperties,
    className?: string,
    label?: string,
    color?: string,
    isChecked: boolean,
    onChange?: Function
};
type State = {};

class Checkbox extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        label: null,
        color: '#fff',
        onChange: () => {}
    };

    render() {
        const {className, style, label, color, isChecked, onChange} = this.props;
        return (
            <CheckboxRoot className={className} color={color} style={style}>
                <InputCheckbox type="checkbox" color={color} checked={isChecked} onChange={onChange} />
                <LabelText>{label}</LabelText>
            </CheckboxRoot>
        );
    }
}

export default Checkbox;

const LabelText = styled.span`
    margin-bottom: 0;
    margin-left: 0;

    &:before {
        font-family: 'iconfont' !important;
        content: '\\e67e';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        font-size: ${px2vw(15)};
    }
    
    @media ${screen.lg} {
        &:before {
            font-size: 15px;
       }
    }
`;

const InputCheckbox = styled.input`
    visibility: hidden;
    margin-right: ${px2vw(6)};

    &:checked + ${LabelText} {
        &:before {
            content: '\\e67d';
            color: ${props => props.color || props.theme.listDoubleBackgroundColor};
        }
    }
    
    @media ${screen.lg} {
        margin-right: 6px;
    }
`;

const CheckboxRoot = styled.label`
    position: relative;
    margin: 0;
    color: ${props => props.color || props.theme.listDoubleBackgroundColor};
    flex-direction: row;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
`;
