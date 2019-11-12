// @flow
/**
 * Select
 */
import * as React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import {isEmpty} from '@utils/equal';
import {px2vw} from '@utils/format';
import {isMobile} from '@utils/browser';
import screen from '@themes/Screen';

import Icon from '@components/atoms/Icon';
import {ListItem} from '@components/atoms/List';
import Select from './Select';

type Props = {
    style?: React.CSSProperties,
    title?: string,
    titleStyle?: React.CSSProperties,
    className?: any,
    onChange: Function,
    onOk: Function,
    value: string | number,
    defaultText?: string,
    options: Array<{
        value: string,
        text: React.Node
    }>,
    disabled?: boolean,
    isHidden?: boolean
};
type State = {
    selectValue: string | number
};

class ListSelect extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        defaultText: '',
        title: '',
        titleStyle: undefined,
        disabled: false,
        isHidden: false
    };

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            selectValue: props.value || ''
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
        const {isHidden, options, value, title, disabled, defaultText, className, titleStyle, style} = this.props;
        const {selectValue, isOpen} = this.state;
        const isCheckMobile = isMobile();

        const selectObj = options.find(o => String(o.value) === String(value)) || options[0] || {value: '', text: defaultText};
        const selectText = <SelectText isSelected={!isEmpty(selectObj.value)}>{selectObj.text}</SelectText>;

        return (
            <React.Fragment>
                <ListItem
                    style={style}
                    className={className}
                    title={title || selectText}
                    titleStyle={titleStyle}
                    after={title ? selectText : undefined}
                    afterStyle={{
                        flex: '1 1 auto',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                    afterIcon={!disabled ? (<SelectButton code="caret-own"
                        size={14}
                        color={siteConfig.theme.primaryColor}
                        style={{
                            backgroundColor: siteConfig.theme.listOddBackgroundColor
                        }}/>) :
                        (<Icon code="lock" size={20} />)
                    }
                    onClick={() => (disabled || !isCheckMobile ? {} : this.handleToggleMenu())}
                    isHidden={isHidden}
                >
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
                </ListItem>




            </React.Fragment>
        );
    }
}

export default ListSelect;

const SelectButton = styled(Icon)`
    padding: ${px2vw(2)};
    
    @media ${screen.lg} {
        padding: 5px;
    }
`;


const SelectInput = styled.select`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    font-size: 16px;
    z-index: 4;
`;


const SelectText = styled.div`
    font-size: ${px2vw(14)};
    font-weight: 900;
    color: ${props => props.isSelected ? props.theme.primaryColor : undefined};
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media ${screen.lg} {
        font-size: 14px;
    }
`;
