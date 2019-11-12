// @flow
/**
 * DatePicker
 * https://juejin.im/post/5a2f0e63f265da43294e01ec
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import dayjs from 'dayjs';
import {FormattedMessage  as I18N, injectIntl} from 'react-intl';

import {isEmpty} from '@utils/equal';
import Icon from '@components/atoms/Icon';
import Button from '@components/atoms/Button';

type Props = {
    intl: { formatMessage: Function },
    localeWeekDay?: Array<string>,
    localeMonth?: Array<string>,
    isSetTodayVisible?: boolean,
    value?: string,
    format?: string,
    onChange: Function,
    onClose: Function
};

type State = {
    panelYearMonth: any,
    localeWeekDay: Array<string>,
    localeMonth: Array<string>,
};

class DatePicker extends React.PureComponent<Props, State> {
    static defaultProps = {
        value: undefined,
        format: 'YYYY-MM-DD',
        localeWeekDay: [],
        localeMonth: [],
        isSetTodayVisible: false
    };

    constructor(props){
        super(props);

        // 取得今天日期
        this.today = dayjs();

        this.text = <I18N id="calendar.pleaseInputYear" defaultMessage="请输入西元年"/>;

        const localeWeekDay = props.localeWeekDay;
        if(isEmpty(localeWeekDay)){
            for(let w=1; w<=7; w+=1){
                localeWeekDay.push(<I18N id={`calendar.weekDay.${w}`} defaultMessage={w}/>);
            }
        }
        const localeMonth = props.localeMonth;
        if(isEmpty(localeMonth)){
            for(let m=1; m<=12; m+=1){
                {/* eslint-disable-next-line react/no-children-prop */}
                localeMonth.push(<I18N id={`calendar.month.${m}`} defaultMessage={m} children={formatedMessage => <option value={m-1} key={`month-${m}`}>{formatedMessage}</option>  }
                />);
            }
        }

        this.state = {
            panelYearMonth: props.value ? dayjs(props.value) : this.today,
            localeWeekDay: localeWeekDay,
            localeMonth: localeMonth
        };

    }


    /**
     * 取得 value的 Dayjs 物件
     * @returns {dayjs.Dayjs}
     */
    getConvertDayjs(){
        const {value} = this.props;
        return dayjs(value);
    }


    /**
     * 處理選擇日期
     * @param year
     * @param month
     */
    handleChangePanel = (year = null, month = null) => {
        const {panelYearMonth} = this.state;

        let newPanelDate = panelYearMonth;
        if(year){
            newPanelDate = newPanelDate.set('year', year);
        }
        if(!isEmpty(month)){
            newPanelDate = newPanelDate.set('month', month);
        }

        this.setState({
            panelYearMonth: newPanelDate
        });
    };


    handleConformYear = () => {
        const {panelYearMonth} = this.state;
        const {intl: {formatMessage: i18n}} = this.props;
        const currentYear = panelYearMonth.get('year');

        const localeText = i18n({id: 'calendar.pleaseInputYear'});
        const newYear = parseInt(prompt(localeText, panelYearMonth.get('year')));
        if(newYear !== currentYear){
            this.handleChangePanel(newYear, null);
        }
    };


    /**
     * 處理選擇日期
     * @param year
     * @param month
     * @param day
     */
    handleSelectedDate = (year: number = null, month: number = null, day: number = null) => {
        const {onChange, format, onClose} = this.props;
        const {panelYearMonth} = this.state;

        let newDate = panelYearMonth;
        if(year){
            newDate = newDate.set('year', year);
        }

        if(!isEmpty(month)){
            newDate = newDate.set('month', month);
        }
        if(day){
            newDate = newDate.set('date', day);
        }

        const value = this.getConvertDayjs();
        if(newDate.isSame(value, 'date')){
            onChange(null);
        }else{
            const formatDate = newDate.format(format);
            onChange(formatDate);
        }
        onClose();

    };


    /**
     * 設定為今天日期
     */
    handleSelectedToday = () => {
        const {format, onChange} = this.props;

        this.setState({
            panelYearMonth: this.today
        }, () => {
            const formatDate = this.today.format(format);
            onChange(formatDate);
        });
    };




    /**
     * 產生年月
     * @returns {*}
     */
    renderYearMonth(){
        const {panelYearMonth, localeMonth} = this.state;

        const panelPreYearMonth = panelYearMonth.subtract(1, 'month');
        const panelNextYearMonth = panelYearMonth.add(1, 'month');


        // 產生年月標題
        return (
            <YearMonthRow>


                <YearMonth>
                    <Year onClick={this.handleConformYear}>
                        {panelYearMonth.get('year')}<I18N id="calendar.unit.year" defaultMessage=" "/>
                    </Year>
                    <MonthGroup>
                        <Month>
                            {localeMonth[panelYearMonth.get('month')]}
                        </Month>

                        <MonthSelect
                            onChange={e => this.handleChangePanel(null, panelYearMonth.set('month', e.target.value).get('month'))}
                            value={panelYearMonth.get('month')}
                        >
                            {localeMonth}
                        </MonthSelect>
                    </MonthGroup>

                </YearMonth>


                <ChangeControl>
                    <MonthButton
                        onClick={() => this.handleChangePanel(
                            panelPreYearMonth.get('year'),
                            panelPreYearMonth.get('month')
                        )}
                    >
                        <Icon code="arrow-left" color="#5b5b5b"/>
                    </MonthButton>

                    <MonthButton
                        onClick={() => this.handleChangePanel(
                            panelNextYearMonth.get('year'),
                            panelNextYearMonth.get('month')
                        )}
                    >
                        <Icon code="arrow-right" color="#5b5b5b"/>
                    </MonthButton>

                </ChangeControl>
            </YearMonthRow>
        );
    }


    /**
     * 產生週標題
     * @returns {*}
     */
    renderWeek(){
        const {localeWeekDay} = this.state;

        // 產生週標題
        return (
            <WeekRow>
                {localeWeekDay.map((week,index) =>{
                    // eslint-disable-next-line react/no-array-index-key
                    return <Week key={`week-${index}`}>{week}</Week>;
                })}
            </WeekRow>
        );
    }


    /**
     * 產生上個月的剩餘日期表
     * @returns {Array}
     */
    renderPreMonthDay(){
        const {panelYearMonth} = this.state;
        const currentDate = this.getConvertDayjs();

        // 取得指定年月的第一天是星期幾 (0, 1-6)
        const currentMonFirstWeek = panelYearMonth.set('date', 1).day();

        // console.log(`
        //     currentMonFirstWeek: ${currentMonFirstWeek}
        //     currentDate: ${currentDate.format('YYYY-MM-DD')}
        // `)

        // 取 Panel年月 剩餘月份的可放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
        const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;

        // 取 Panel年月 上個月的最後一天是幾號
        const preMonth = panelYearMonth.subtract(1, 'month');
        const preMonthLastDay = parseInt(preMonth.endOf('month').get('date'));

        // 取 Panel年月 結束日從幾號開始
        const preMonthFirstDay = preMonthLastDay - preMonthFirstContainer;

        // 產生 Panel年月 上個月的剩餘日期表
        const preMonFirstDayList = new Array(preMonthLastDay);
        for(let d = 0; d < preMonthFirstContainer; d++){
            const day = preMonthFirstDay + d + 1;
            preMonFirstDayList[d] = (
                <PreDay
                    key={`preMonthDay-${d}`}
                    isSelected={currentDate.isSame(preMonth.set('date', day), 'date')}
                    onClick={() => this.handleSelectedDate(preMonth.year(), preMonth.month(), day)}
                >
                    <span>
                        {day}
                    </span>
                </PreDay>
            );
        }

        return preMonFirstDayList;
    }

    /**
     * 產生下個月的剩餘日期表
     * @returns {Array}
     */
    renderNextMonthDay(){
        const {panelYearMonth} = this.state;
        const currentDate = this.getConvertDayjs();

        // 取得指定年月的第一天是星期幾 (0, 1-6)
        const currentMonFirstWeek = panelYearMonth.set('date', 1).day();

        // console.log(`
        //     currentMonFirstWeek: ${currentMonFirstWeek}
        //     currentDate: ${currentDate.format('YYYY-MM-DD')}
        // `)

        // 取 Panel年月 上個月份的已放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
        const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;

        // 取 Panel年月 這個月的最後一天是幾號
        const panelMonthLastDay = panelYearMonth.endOf('month').get('date');

        const nextMonth = panelYearMonth.add(1, 'month');

        // 取得指定年月下個月剩餘月份可放空間
        const nextMonthEndContainer = (7 * 6) % (preMonthFirstContainer + panelMonthLastDay);

        // 產生上個月的剩餘日期表
        const nextMonEndDayList = new Array(nextMonthEndContainer);
        for(let d = 0; d < nextMonthEndContainer; d++){
            const day = d + 1;
            nextMonEndDayList[d] = (
                <PreDay
                    key={`nextMonthDay-${d}`}
                    isSelected={currentDate.isSame(nextMonth.set('date', day))}
                    onClick={() => this.handleSelectedDate(nextMonth.year(), nextMonth.month(), day)}
                >
                    <span>
                        {day}
                    </span>
                </PreDay>
            );
        }

        return nextMonEndDayList;
    }


    /**
     * 產生當月日期表
     * @returns {*}
     */
    renderCurrentMonthDay(){
        const {panelYearMonth} = this.state;

        const currentDate = this.getConvertDayjs();

        // 取 Panel年月 的最後一天
        const currentMonthLastDay = panelYearMonth.endOf('month').get('date');

        // console.log(`
        //     today: ${today}
        //     currentMonthLastDay: ${currentMonthLastDay}
        // `);


        // 產生 Panel年月 當月日期表
        const currentDayList = new Array(currentMonthLastDay);
        for(let d = 0; d < currentMonthLastDay; d++){
            const dayNumber = d + 1;
            const eachDate = panelYearMonth.set('date', dayNumber);
            currentDayList[d] = (
                <Day
                    key={`currentDay-${d}`}
                    isToday={this.today.isSame(eachDate, 'date')}
                    isSelected={currentDate.isSame(eachDate, 'date')}
                    onClick={() => this.handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber)}
                >
                    <span>
                        {dayNumber}
                    </span>
                </Day>
            );
        }

        return (
            <DayRow>
                {this.renderPreMonthDay()}
                {currentDayList}
                {this.renderNextMonthDay()}
            </DayRow>
        );
    }

    renderTodayButton(){
        return (
            <LabelCheckCardCreate>
                <TodayButton size="small" onClick={this.handleSelectedToday}>
                    <span><I18N id="calendar.setToday" defaultMessage="年"/></span>
                </TodayButton>
            </LabelCheckCardCreate>
        );
    }


    render() {
        const {isSetTodayVisible} = this.props;

        return (
            <DatePickerRoot>

                {this.renderYearMonth()}
                {this.renderWeek()}
                {this.renderCurrentMonthDay()}

                {isSetTodayVisible && this.renderTodayButton()}

            </DatePickerRoot>
        );
    }

}

export default injectIntl(DatePicker);




const TodayButton = styled(Button)`
    flex: 1 1 auto;
    padding: 5px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    
     justify-content: center;
     background-color: #202225;
     color: #4AA399;
     font-size: 16px;
    
`;

const LabelCheckCardCreate = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    margin-bottom: 8px;
`;


const Week = styled.div`
    flex: 0 0 30px;
    color: #fff;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 13px;

`;

const WeekRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;


const Day = styled(Week)`
    position: relative;
    span{
        z-index: 1;
    }
    
    :before{
        content: '';
        border-radius: 99px;
        position: absolute;
        width: 80%;
        height: 80%;
        z-index: 0;
    }
    
    :hover{
        color: #ababab;
        cursor: pointer;
    }
    
    ${props => props.isToday && css`
        color: ${props=>props.theme.primaryColor};
    `};
            
    
    ${props => props.isSelected && css`
        color: #fff;

        :before{
            background-color: ${props=>props.theme.primaryColor};
        }
        
        :hover{
            color: #fff;
        }
    `};
    
    
`;

const PreDay = styled(Day)`
    color: #434343;
    span{
        z-index: 1;
    }
    
    ${props => props.isSelected && css`
        color: #fff;

        :before{
            background-color: ${props=>props.theme.primaryColor};
        }
        
        :hover{
            color: #fff;
        }
    `};
`;

const DayRow = styled(WeekRow)`
   
`;

const MonthButton = styled(Button)`
    padding: 0;
    
    :hover{
        .iconfont{
            color: #fff;    
        }    
    }
    
`;

const ChangeControl = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
`;

const MonthSelect = styled.select`
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const Month = styled.span`
    color: #fff;
    font-size: 24px;
    flex: 0 0 auto;
`;

const MonthGroup = styled.div`
    position: relative;
`;

const Year = styled.span`
    color: #fff;
    font-size: 24px;
    flex: 0 0 auto;
    cursor: pointer;
    margin-right: 5px;
`;

const YearMonth = styled.div`
    display: flex;
`;

const YearMonthRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;


const DatePickerRoot = styled.div`
    width: calc(30px * 7);
    margin: 5px;
`;
