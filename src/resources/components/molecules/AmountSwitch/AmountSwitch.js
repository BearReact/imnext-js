// @flow
/**
 * LobbyTabs
 */
import * as React from 'react';
import styled from 'styled-components';
import Button from '@components/atoms/Button';
import {px2vw} from '@utils/format';
import {toDecimal2} from '@utils/number';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    source?: Array<Number>,
    activeAmount: number,
    onChange?: Function
};
type State = {};

class AmountSwitch extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        source: [],
        onChange: undefined
    };


    handleOnChange = (amount) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(amount);
        }
    };

    render() {
        const {className, style, source, activeAmount} = this.props;

        return (
            <LobbyTabsRoot className={className} style={style}>
                {source.map((amount) => {

                    const formatAmount = toDecimal2(amount).split('.');
                    return (
                        <Tab key={`amount_${amount}`}>
                            <Button
                                block
                                shape="default"
                                theme="primary"
                                outline={false}
                                onClick={() => this.handleOnChange(amount)}
                            >
                                <AmountBox>
                                    <NumberAmount>$ {formatAmount[0]}</NumberAmount><DotAmount>.{formatAmount[1]}</DotAmount>
                                </AmountBox>
                            </Button>
                        </Tab>
                    );
                })}
            </LobbyTabsRoot>
        );
    }
}

export default AmountSwitch;

const NumberAmount = styled.span`
    font-size: ${px2vw(15)};
    
    @media ${screen.lg} {
        font-size: 16px;
   }
`;

const AmountBox = styled.div`
  display: inline-flex;
  align-items: flex-end;
`;

const DotAmount = styled.span`
    font-size: ${px2vw(10)};
    margin-bottom: ${px2vw(1)};
    
    @media ${screen.lg} {
        font-size: 12px;
        margin-bottom: 1px;
    }
`;

const Tab = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    max-width: calc(100% / 3);
    width: calc(100% / 3);
    flex: 1 1 calc(100% / 3);
    padding-left: ${px2vw(5)};
    padding-right: ${px2vw(5)};
    padding-bottom: ${px2vw(5)};

    position: relative;
    
    @media ${screen.lg} {
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 5px;
    }
`;

const LobbyTabsRoot = styled.div`
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    
    
    @media ${screen.lg} {
        margin-left: -5px;
        margin-right: -5px;
    }
`;
