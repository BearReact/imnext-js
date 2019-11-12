// @flow
/**
 * Input
 */
import * as React from 'react';
import styled from 'styled-components';
import {isMobile} from '@utils/browser';

import DatePicker from '@components/atoms/DatePicker';
import BaseInput from './Input';


type Props = {
    className?: any,
    style?: React.CSSProperties,
    placeholder?: string,
    placeholderColor?: string,
    shape?: string,
    isShowClean?: boolean,
    onChange?: Function,
    symbol?: string,
    icon?: string,
    textAlign?: string,
    color?: '',
    value: string,
    defaultValue?: string,
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

const isCheckMobile = isMobile();


class DateInput extends React.PureComponent<Props, State> {
    static defaultProps = {
        className: undefined,
        style: undefined,
        placeholder: undefined,
        placeholderColor: undefined,
        shape: null,
        isShowClean: false,
        onChange: () => {},
        symbol: undefined,
        icon: undefined,
        textAlign: 'left',
        color: undefined,
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
        id: undefined,
        defaultValue: undefined
    };

    state = {
        isVisiblePicker: false
    };


    /**
     * 處理日期選擇器開關
     * @param isVisible
     */
    handleTogglePicker = (isVisible = false) => {
        this.setState({isVisiblePicker: isVisible});
    };

    render() {
        const {value, defaultValue, onChange, disabled, placeholder, ...otherProps} = this.props;
        const {isVisiblePicker} = this.state;

        return (
            <InputRoot>
                <BaseInput
                    {...otherProps}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    onFocus={isCheckMobile ? undefined : () => this.handleTogglePicker(true)}
                    type={(isCheckMobile && !disabled) ? 'date':'text'}/>


                { (!isCheckMobile && isVisiblePicker) && (
                    <React.Fragment>
                        <DatePickerModal>
                            <DatePicker
                                onClose={this.handleTogglePicker}
                                defaultValue={defaultValue}
                                value={value}
                                onChange={onChange}
                            />
                        </DatePickerModal>
                        <CloseArea onClick={()=>this.handleTogglePicker(false)}/>
                    </React.Fragment>
                )}

            </InputRoot>
        );
    }
}

export default DateInput;

const CloseArea = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
`;

const DatePickerModal = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 1;
    background-color: rgb(41,44,49);
    border: 1px solid #4c4c4c;
    padding: 5px;
    border-radius: 2px;
`;


const InputRoot = styled.div`
    width: 100%;
    position: relative;
`;
