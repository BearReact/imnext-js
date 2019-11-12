// @flow
/**
 * MenuSelect
 */
import * as React from 'react';
import styled,{css} from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import uniqueId from 'lodash/uniqueId';
import {isMobile} from '@utils/browser';

import Icon from '@components/atoms/Icon';
import Select from '@components/atoms/Select/Select';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    disabled?: boolean,
    options: Array<{
        value: string,
        text: React.Node
    }>,
    onChange: Function,
    value: string,
    shapeType?: string,
    color?: string
};
type State = {};

class TabsSelect extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null,
        disabled: false,
        shapeType: 'default',
        color: '#fff'
    };

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            selectValue: props.value
        };
    }


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
        const {style, className, disabled, options, value, shapeType, color} = this.props;
        const {selectValue, isOpen} = this.state;
        const isCheckMobile = isMobile();
        return (
            <TabsSelectRoot
                style={style}
                className={className}
                shapeType={shapeType}
            >
                <FirstIcon
                    code="language"
                    color={color}
                    size={16}
                />

                <SecondIcon
                    code="caret-down"
                    color={color}
                    size={12}
                />

                <SelectArea isMobile={isCheckMobile} onClick={() => (disabled || !isCheckMobile ? {} : this.handleToggleMenu())}>
                    {isCheckMobile ?
                        <Select
                            isOpen={isOpen}
                            options={options}
                            onToggleMenu={this.handleToggleMenu}
                            onOk={this.handleOk}
                            value={selectValue}
                            defaultValue={value}
                        />
                        :
                        <SelectInput
                            onChange={e => this.handleOk(e.target.value)}
                            value={selectValue}
                            disabled={disabled}
                        >
                            {options.map(row => (
                                <option value={row.value} key={uniqueId('select_')}>
                                    {row.text}
                                </option>
                            ))}
                        </SelectInput>
                    }
                </SelectArea>
            </TabsSelectRoot>
        );
    }
}

export default TabsSelect;

const SecondIcon = styled(Icon)``;

const FirstIcon = styled(Icon)`
    margin-right: ${px2vw(5)};
    
    @media ${screen.lg} {
        margin-right: 10px;
        
        i {
            font-size: 28px !important;
        }
    }
`;

const TabsSelectRoot = styled.div`
    height: 0; // ie11
    background-color: rgba(0, 0, 0, 0.2);
    width: ${px2vw(66)};
    height: ${px2vw(30)};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9b9b9b;
    position: relative;
    
    @media ${screen.lg} {
        width: 66px;
        height: 30px;
    }
`;

const SelectArea = styled.div`
    ${props => props.isMobile && 
    css`
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    `}
`;

const SelectInput = styled.select`
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    font-size: 16px;
    z-index: 4;
`;
