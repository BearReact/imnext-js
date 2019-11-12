// @flow
/**
 * Select
 */
import * as React from 'react';
import get from 'lodash/get';
import Select from '@components/atoms/Select/FormSelect';


type Props = {
    style?: React.CSSProperties,
    className?: any,
    onChange: Function,
    onOk: Function,
    value: string | number,
    defaultText?: string,
    icon?: string,
    title?: string,
    disabled?: boolean,
    isHidden?: boolean,
    whileCountryCodeList?: Array<string>
};
type State = {
    selectValue: string | number
};


class CountrySelect extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        defaultText: '',
        title: '',
        icon: '',
        disabled: false,
        isHidden: false,
        whileCountryCodeList: []
    };


    render() {
        const {value, whileCountryCodeList, className} = this.props;

        const activeIcon =  get(whileCountryCodeList.find(row => String(row.value) === String(value)), 'icon', '');

        return <Select {...this.props}
            icon={activeIcon}
            options={whileCountryCodeList}
            className={className}
        />;
    }
}

export default CountrySelect;
