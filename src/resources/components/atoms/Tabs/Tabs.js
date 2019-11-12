// @flow
/**
 * Tabs
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import Button from '@components/atoms/Button';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    tabStyle?: React.CSSProperties,
    className?: string,
    item?: Array<{
        value: string,
        text: string
    }>,
    activeValue?: string,
    onChange?: Function
};
type State = {};

class Tabs extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        tabStyle: undefined,
        className: undefined,
        item: [],
        activeValue: undefined,
        onChange: () => {}
    };

    render() {
        const {className, style, tabStyle, item, activeValue, onChange} = this.props;
        return (
            <TabsRoot className={className} style={style}>
                <TabButtonPanel style={tabStyle}>
                    {item.map((row) => (
                        <TabButton
                            key={row.value}
                            block
                            onClick={() => onChange(row.value)}
                            isActive={activeValue === row.value}
                        >
                            {row.text}
                        </TabButton>
                    ))}
                </TabButtonPanel>
            </TabsRoot>
        );
    }
}

export default Tabs;

const TabButton = styled(Button)`
    color: ${props => props.theme.tagsButtonFontColor};
    font-size: ${px2vw(12)};
    height: ${px2vw(40)};
    position: relative;
    font-weight: 400;

    ${props =>
        props.isActive &&
        css`
            color: ${props.theme.primaryColor};
            font-weight: 900;
            &:after {
                position: absolute;
                background-color: ${props.theme.primaryColor};
                bottom: 0;
                left: -1px;
                right: -1px;
                height: ${px2vw(4)};
                content: '';
                pointer-events: none;
                z-index: 1;
                
                 
                @media ${screen.lg} {
                    height: 4px;
                }
            }
        `};
    

    @media ${screen.lg} {
        font-size: 12px;
        height: 40px;
    }
`;

const TabButtonPanel = styled.div`
    display: flex;
    background-color: transparent;
    box-shadow: 0 ${px2vw(2)} ${px2vw(2)} 0 rgba(0, 0, 0, 0.3);
    
    
    @media ${screen.lg} {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
    }
`;

const TabsRoot = styled.div`
    position: relative;
    
    &:after{
        content: '';
        position: absolute;
        height: 2px;
        background-color: ${props => props.theme.tagsBorderBottomColor};
        bottom: 2px;
        left: 0;
        right: 0;
    }
`;
