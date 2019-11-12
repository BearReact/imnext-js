// @flow
/**
 * Picker
 */
import * as React from 'react';
import styled from 'styled-components';
import RmcPicker from 'rmc-picker';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


type Props = {
    style?: React.CSSProperties,
    className?: string,
    onScrollChange?: Function,
    onValueChange?: any,
    defaultSelectedValue?: string,
    value?: string,
    children?: React.Node
};
type State = {};

class Picker extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        onScrollChange: () => {},
        onValueChange: () => {},
        defaultSelectedValue: undefined,
        value: undefined,
        children: null
    };

    render() {
        const {onScrollChange, onValueChange, defaultSelectedValue, value, children, ...otherProps} = this.props;
        return (
            <PickerRoot {...otherProps}>
                <RmcPicker
                    defaultSelectedValue={defaultSelectedValue}
                    selectedValue={value}
                    onValueChange={onValueChange}
                    onScrollChange={onScrollChange}
                >
                    {children}
                </RmcPicker>
            </PickerRoot>
        );
    }
}

Picker.Option = RmcPicker.Item;
export default Picker;

const itemHeight = 34;
const itemTotal = 5;
const PickerRoot = styled.div`
 
    .rmc-picker,
    .rmc-multi-picker {
        height: ${px2vw(itemHeight * itemTotal)};
        background-color: rgb(237, 237, 237);
    }
    
    .rmc-picker {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        flex: 1;
        text-align: center;
    }
    
    .rmc-multi-picker {
        display: flex;
        align-items: center;
    }
    
    .rmc-picker-item {
        font-size: ${px2vw(16)};
        height: ${px2vw(34)};
        line-height: ${px2vw(34)};
        padding: 0 ${px2vw(10)};
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #474b53;
    
        width: 100%;
        box-sizing: border-box;
    }
    
    .rmc-picker-mask {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        margin: 0 auto;
        width: 100%;
        z-index: 99;
        background-image: linear-gradient(to bottom, rgba(241, 241, 241, 0.95), rgba(241, 241, 241, 0.6)),
        linear-gradient(to top, rgba(241, 241, 241, 0.95), rgba(241, 241, 241, 0.6));
        background-position: top, bottom;
        background-repeat: no-repeat;
    }
    
    .rmc-picker-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
    }
    
    .rmc-picker-indicator {
        box-sizing: border-box;
        width: 100%;
        height: ${px2vw(34)};
        position: absolute;
        left: 0;
        top: ${px2vw(102)};
        z-index: 3;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
    
    
    @media ${screen.lg} {
        .rmc-picker,
        .rmc-multi-picker {
            height: ${(itemHeight * itemTotal)}px;
        }
        
        
        .rmc-picker-item {
            font-size: 16px;
            height: 34px;
            line-height: 34px;
            padding: 0 10px;
        }
        
        
        .rmc-picker-indicator {
            height: 34px;
            top: 102px;
        }
    }
`;
