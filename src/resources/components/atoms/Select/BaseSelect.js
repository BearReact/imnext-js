// @flow
/**
 * Select
 */
import * as React from 'react';
import styled from 'styled-components';
import Select from '@components/atoms/Select/Select';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: any,
    onChange: Function,
    value: string | number,
    defaultText?: string,
    options: Array<{
        value: string,
        text: React.Node
    }>,
    disabled?: boolean
};
type State = {
    selectValue: string | number
};

class ListSelect extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        defaultText: '',
        disabled: false
    };

    state = {
        isOpen: false,
        selectValue: ''
    };

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

    render() {
        const {options, value, disabled, defaultText, className, style} = this.props;
        const {selectValue, isOpen} = this.state;

        const selectObj = options.find(o => o.value === value) || options[0] || {value: '', text: defaultText};
        const selectText = <SelectText
            style={style}
            className={className}
            onClick={() => (disabled ? {} : this.handleToggleMenu())}
        >{selectObj.text}</SelectText>;

        return (
            <React.Fragment>
                {selectText}

                <Select
                    isOpen={isOpen}
                    value={selectValue}
                    defaultValue={value}
                    options={options}
                    onToggleMenu={this.handleToggleMenu}
                    onOk={this.handleOk}
                />
            </React.Fragment>
        );
    }
}

export default ListSelect;


const SelectText = styled.div`
    font-size: ${px2vw(14)};
    font-weight: 900;
    color: ${props => props.theme.primaryColor};
    
    @media ${screen.lg} {
        font-size: 14px;
    }
`;
