/* eslint-disable no-nested-ternary */

// @flow
import React from 'react';
import styled from 'styled-components';
import {FormattedMessage as I18N} from 'react-intl';
import {px2vw} from '@utils/format';
import Icon from '@components/atoms/Icon';
import {formatCurrency} from '@utils/number';
import screen from '@themes/Screen';

type Props = {
    title?: any,
    time?: any,
    money?: number,
    requestIDText?: string,
    requestID?: string,
    depositTypeText?: string,
    depositType?: string,
    gamePlatformText?: string,
    gamePlatform?: string,
    statusText?: string,
    status?: boolean,
    intl: { formatMessage: Function}
};
type State = {
    isExpanded?: boolean
};

class AccordionItem extends React.PureComponent<Props, State> {
    static defaultProps = {
        title: null,
        time: null,
        money: 0,
        requestIDText: '交易编号',
        requestID: '',
        depositTypeText: '存款方式',
        depositType: '',
        gamePlatformText: '馆别',
        gamePlatform: '',
        statusText: '状态',
        status: false
    };

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    renderContent() {
        const {title, money, time, status} = this.props;
        const {isExpanded} = this.state;

        let renderIcon = <Icon code="chevron-right" color="#9ea2b0" style={{paddingLeft: 10}} size="16" />;
        if (isExpanded) {
            renderIcon = <Icon code="expand-more" color="#9ea2b0" style={{paddingLeft: 10}} size="16" />;
        }

        return (
            <ItemInner>
                <Left>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemTime>{time}</ItemTime>
                </Left>
                <ItemAfter status={status}>
                    {formatCurrency(money)}
                </ItemAfter>
                {renderIcon && renderIcon}
            </ItemInner>
        );
    }

    render() {
        const {
            requestIDText,
            requestID,
            depositTypeText,
            depositType,
            gamePlatformText,
            gamePlatform,
            statusText,
            status
        } = this.props;
        const {isExpanded} = this.state;

        return (
            <Li>
                <ItemContent
                    onClick={() => {
                        this.setState({isExpanded: !isExpanded});
                    }}
                >
                    {this.renderContent()}
                </ItemContent>
                <Content isExpanded={isExpanded}>
                    <ItemInner>
                        <ContentLabel>{requestIDText}</ContentLabel>
                        <ContentValue>{requestID}</ContentValue>
                    </ItemInner>
                    <ItemInner>
                        <ContentLabel>{depositTypeText}</ContentLabel>
                        <ContentValue>{depositType}</ContentValue>
                    </ItemInner>
                    <ItemInner>
                        <ContentLabel>{gamePlatformText}</ContentLabel>
                        <ContentValue>{gamePlatform}</ContentValue>
                    </ItemInner>
                    <ItemInner>
                        <ContentLabel>{statusText}</ContentLabel>
                        <ContentStatus status={status}>
                            {(status === 'failed' && <I18N id='action.failed' />) ||
                                (status === 'success' && <I18N id='action.success' />) ||
                                (status === 'processing' && <I18N id='action.processing' />)}
                        </ContentStatus>
                    </ItemInner>
                </Content>
            </Li>
        );
    }
}

export default AccordionItem;

const ItemInner = styled.div`
    min-height: ${px2vw(20)};
    padding-top: 5px;
    padding-bottom: 5px;

    position: relative;
    width: 100%;

    min-width: 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    align-self: stretch;
    
    
    @media ${screen.lg} {
        min-height: 20px;
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    @media ${screen.lg} {
        flex-direction: row-reverse;
        align-items: center;
    }
`;

const ItemTitle = styled.div`
    min-width: 0;
    flex-shrink: 1;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: ${props => props.theme.listTextColor};
    font-size: ${px2vw(12)};
    font-weight: 900;
    
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const ItemTime = styled.div`
    min-width: 0;
    flex-shrink: 1;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: ${props => props.theme.listTextColor};
    font-size: ${px2vw(8)};
    
    
    @media ${screen.lg} {
        font-size: 12px;
        margin-right: 100px;
    }
`;

const ItemAfter = styled.div`
    padding-left: ${px2vw(5)};

    white-space: nowrap;
    flex-shrink: 0;
    display: flex;
    margin-left: auto;

    color: ${props => (props.status === 'success' ? '#4ecd00' : props.status === 'failed' ? '#ff4b4b' : '#bdbdbd')};
    font-weight: 900;
    font-size: ${px2vw(12)};
    max-width: 50%;
    
    
    @media ${screen.lg} {
        padding-left: 5px;
        font-size: 12px;
    }
`;

const ItemContent = styled.button`
    background-color: transparent;
    min-height: ${px2vw(40)};
    padding-left: 10px;
    padding-right: 10px;

    width: 100%;

    border: none;
    &:focus {
        outline: 0;
    }

    color: inherit;
    text-decoration: none;

    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;

    transition-duration: 0.3s;
    transition-property: background-color;
    position: relative;
    overflow: hidden;
    z-index: 0;
    
    
    @media ${screen.lg} {
        min-height: 40px;
    }
`;

const Li = styled.li`
    position: relative;
    box-sizing: border-box;
    
    :nth-child(odd) {
        background-color: ${props => props.theme.listOddBackgroundColor};
    }
    :nth-child(even) {
        background-color: ${props => props.theme.listDoubleBackgroundColor};
    }
`;

const Content = styled.div`
    background-color: ${props => props.theme.listDropDownBackgroundColor};
    display: ${props => (props.isExpanded ? 'flex' : 'none')};

    padding: 10px;

    position: relative;
    width: 100%;
    flex-direction: column;

    min-width: 0;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    align-self: stretch;
`;

const ContentLabel = styled.div`
    color: #fff;
    font-size: ${px2vw(10)};
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const ContentValue = styled.div`
    color: #fff;
    font-size: ${px2vw(10)};
    font-weight: 900;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const ContentStatus = styled.div`
    color: ${props => (props.status === 'success' ? '#4ecd00' : props.status === 'failed' ? '#ff4b4b' : '#bdbdbd')};
    font-size: ${px2vw(10)};
    font-weight: 900;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;
