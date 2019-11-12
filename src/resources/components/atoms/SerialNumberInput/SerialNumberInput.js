// @flow
/**
 * SerialNumberInput
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

import Input from '@components/atoms/Input/Input';

type Props = {
    style?: React.CSSProperties,
    placeholder?: string
};
type State = {};

class SerialNumberInput extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        placeholder: null
    };

    render() {
        return <SerialNumberInputRoot {...this.props} />;
    }
}

export default SerialNumberInput;

const SerialNumberInputRoot = styled(Input)`
    color: ${props => props.theme.listTitleColor};
    background-color: ${props => props.theme.listBackgroundColor};

    letter-spacing: ${px2vw(9)};
    border: 1px solid ${props => props.theme.listBorderColor};
    min-height: ${px2vw(44)};
    padding-left: ${px2vw(10)};
    width: 100%;

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        letter-spacing: normal;
    }
    
    &:focus {
        box-shadow: 0 0 4px 0 ${props => props.theme.primaryColor};
        transition: border linear 0.2s, box-shadow linear 0.5s;
        outline: none;
        border-color: rgba(${props => props.theme.primaryColor}, 0.75);
        background-color: #fff;
    }
    
    @media ${screen.lg} {
        letter-spacing: 9px;
        min-height: 44px;
        padding-left: 10px;
    }
    
`;
