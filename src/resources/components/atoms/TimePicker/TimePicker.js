// @flow
/**
 * DatePicker
 * https://juejin.im/post/5a2f0e63f265da43294e01ec
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import dayjs from 'dayjs';
import get from 'lodash/get';

import {isEmpty} from '@utils/equal';
import {paddingLeft} from '@utils/format';

type Props = {
    value?: string,
    format?: string,
    onChange: Function,
};

type State = {
    panelYearMonth: any
};

class TimePicker extends React.PureComponent<Props, State> {
    static defaultProps = {
        value: undefined,
        format: 'HH:mm'
    };

    constructor(props){
        super(props);

        // 取得今天日期
        const today = dayjs();

        const time = !isEmpty(props.value) ? props.value.split(':') : today.format(props.format);

        this.state = {
            hour: get(time, '0', today.format('HH')),
            minute: get(time, '1', today.format('mm'))
        };
    }


    /**
     * 更改 Props 時分
     * @param changeHour
     * @param changeMinute
     */
    handleOnChange = (changeHour = null, changeMinute = null) => {
        const {onChange} = this.props;
        const {hour, minute} = this.state;
        const newHour = changeHour || hour;
        const newMinute = changeMinute || minute;

        onChange(`${newHour}:${newMinute}`);
    };


    /**
     * 更改 時
     * @param e
     */
    handleChangeHour = e => {
        this.setState({
            hour: e.target.value
        }, this.handleOnChange(e.target.value, null));
    };


    /**
     * 更改 分
     * @param e
     */
    handleChangeMinute = e => {
        this.setState({
            minute: e.target.value
        }, this.handleOnChange(null, e.target.value));
    };


    /**
     * 產生 時 的下拉選單
     */
    renderHourOption(){
        const hour = [];
        for(let i = 0; i < 24; i+=1){
            const number = paddingLeft(i, 2);
            hour.push(<option value={number}>{number}</option>);
        }
        return hour;
    }


    /**
     * 產生 分 的下拉選單
     */
    renderMinuteOption(){
        const hour = [];
        for(let i = 0; i < 60; i+=5){
            const number = paddingLeft(i, 2);
            hour.push(<option value={number}>{number}</option>);
        }
        return hour;
    }


    render() {
        const {hour, minute} = this.state;

        return (
            <DatePickerRoot>

                {/* 時 */}
                <select onChange={this.handleChangeHour} value={hour}>
                    {this.renderHourOption()}
                </select>

                <span> : </span>

                {/* 分 */}
                <select onChange={this.handleChangeMinute} value={minute}>
                    {this.renderMinuteOption()}
                </select>

            </DatePickerRoot>
        );
    }

}

export default TimePicker;


const DatePickerRoot = styled.div`
    margin: 5px;
`;
