// @flow
/**
 * Select
 */
import * as React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import {FormattedMessage as I18N} from 'react-intl';
import SlidingPane from '@library/sliding-pane';
import screen from '@themes/Screen';
import {px2vw} from '@utils/format';

import Picker from '@components/atoms/Picker/Picker';
import Button from '@components/atoms/Button/Button';

type Props = {
    style?: React.CSSProperties,
    className?: any,
    isOpen?: boolean,
    value: string | number,
    onToggleMenu?: Function,
    onChange?: Function,
    onOk?: Function,
    onCancel?: Function,
    options: Array<{
        value: string,
        text: React.Node
    }>,
    defaultValue: string | number
};
type State = {
    selectValue: string | number
};

class Select extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isOpen: false,
        onToggleMenu: () => {},
        onCancel: () => {},
        onOk: () => {},
        onChange: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            selectValue: props.defaultValue
        };
    }

    /**
     * 選擇窗內的項目滾動處理
     * @param value
     */
    handleValueChange = value => {
        this.setState({
            selectValue: value
        });
    };

    /**
     * 選取選擇窗處理
     */
    handleOk = () => {
        const {onToggleMenu, onOk, onChange} = this.props;
        const {selectValue} = this.state;
        onOk(selectValue);
        onChange(selectValue);
        onToggleMenu();
    };

    /**
     * 取消選擇窗處理
     */
    handleCancel = () => {
        const {onToggleMenu, onCancel, value} = this.props;

        // Reset State = Props.selectedValue
        this.setState({
            selectValue: value
        });
        onCancel();
        onToggleMenu();
    };

    render() {
        const {isOpen, options, className, style, defaultValue} = this.props;
        const {selectValue} = this.state;

        return (
            <SelectRoot className={className} style={style}>
                <SlidingPane isOpen={isOpen} from="bottom" width="100%" onRequestClose={this.handleCancel}>
                    <ConfirmBar>
                        <ConfirmButton onClick={this.handleCancel}>
                            <I18N id="action.cancel" defaultMessage="取消"/>
                        </ConfirmButton>
                        <ConfirmButton onClick={this.handleOk}>
                            <I18N id="action.done" defaultMessage="完成"/>
                        </ConfirmButton>
                    </ConfirmBar>
                    <Picker
                        value={selectValue}
                        defaultSelectedValue={defaultValue}
                        onValueChange={this.handleValueChange}
                    >
                        {options.map(row => (
                            <Picker.Option value={row.value} key={uniqueId('picker_')}>
                                {row.text}
                            </Picker.Option>
                        ))}
                    </Picker>
                </SlidingPane>
            </SelectRoot>
        );
    }
}

export default Select;

const ConfirmButton = styled(Button)`
    color: #fff;
`;

const ConfirmBar = styled.div`
    background-color: ${props => props.theme.primaryColor};
    height: ${px2vw(50)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${px2vw(15)};
    font-size: ${px2vw(16)};
    font-weight: 900;
    
    @media ${screen.lg} {
        height: 50px;
        padding: 0 15px;
        font-size: 16px;
    }
`;

const SelectRoot = styled.div``;
