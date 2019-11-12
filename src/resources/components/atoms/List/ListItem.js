// @flow
import * as React from 'react';
import styled, {css} from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


type Props = {
    media?: any,
    title?: any,
    after?: any,
    afterIcon?: any,
    style?: React.CSSProperties,
    titleStyle?: React.CSSProperties,
    afterStyle?: React.CSSProperties,
    contentStyle?: React.CSSProperties,
    justContent?: any,
    isHidden?: boolean,
    onClick?: Function,
    children?: React.Node
};
type State = {};

const justContentConfig = {
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    right: 'flex-end'
};

class ListItem extends React.PureComponent<Props, State> {
    static defaultProps = {
        media: undefined,
        title: undefined,
        after: undefined,
        afterIcon: undefined,
        style: undefined,
        titleStyle: undefined,
        afterStyle: undefined,
        contentStyle: undefined,
        justContent: undefined,
        isHidden: false,
        onClick: () => {},
        children: undefined
    };

    renderContent() {
        const {title, after, afterIcon, media, titleStyle, afterStyle} = this.props;

        let renderIcon = null;
        if (afterIcon) {
            renderIcon = <AfterIcon>{afterIcon}</AfterIcon>;
        }
        return (
            <React.Fragment>
                {media && <ItemMedia>{media}</ItemMedia>}

                <ItemInner>
                    <ItemTitle style={titleStyle}>{title}</ItemTitle>
                    <ItemAfter style={afterStyle}>{after}</ItemAfter>
                    {renderIcon}
                </ItemInner>
            </React.Fragment>
        );
    }

    render() {
        const {media, justContent, onClick, isHidden, children, contentStyle, style} = this.props;

        return (
            <Li isMedia={!!media} onClick={onClick} isHidden={isHidden} style={style}>
                <ItemContent style={contentStyle} justContent={justContent}>{this.renderContent()}</ItemContent>
                {children}
            </Li>
        );
    }
}

export default ListItem;

const AfterIcon= styled.div`
    white-space: nowrap;
    padding-left: px2vw(10);
    
    @media ${screen.lg} {
         padding-left: 10px;
    }
   
`;

const ItemInner = styled.div`
    min-height: ${px2vw(45)};
    padding-top: ${px2vw(5)};
    padding-bottom: ${px2vw(5)};
    position: relative;
    width: 100%;
    min-width: 0;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    align-self: stretch;
    
      
    @media ${screen.lg} {
        min-height: 45px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`;

const ItemTitle = styled.div`
    min-width: 0;
    white-space: nowrap;
    position: relative;
    max-width: 100%;
    color: ${props=> props.theme.listTitleColor};
    font-size: ${px2vw(12)};
    font-weight: 900;
    margin-right: ${px2vw(15)};
    flex-shrink: 1;
    height: 100%;
    
    justify-content: flex-start;
    align-items: center;
    display: flex;
    
    @media ${screen.lg} {
        margin-right: 15px;
        font-size: 12px;
    }
    
`;

const ItemAfter = styled.div`
    padding-left: ${px2vw(2)};
    white-space: nowrap;
    display: flex;
    color: #9b9b9b;
    font-weight: 900;
    font-size: ${px2vw(14)};
    flex: 1 0 auto;
    flex-shrink: 0;
    justify-content: flex-start;
    
 
    @media ${screen.lg} {
        font-size: 14px;
        padding-left: 2px;
        justify-content: flex-end;
        
        input{
            text-align: right;
        }
    }
    
`;

const ItemMedia = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    box-sizing: border-box;
    margin-right: ${px2vw(10)};
    
    @media ${screen.lg} {
        margin-right: 10px;
    }
`;

const ItemContent = styled.div`
    min-height: ${px2vw(45)};
    padding-left: ${px2vw(15)};
    padding-right: ${px2vw(10)};
    color: inherit;
    text-decoration: none;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    transition-duration: 0.3s;
    transition-property: background-color;
    position: relative;
    //overflow: hidden;
    z-index: unset;

    ${props => props.justContent && css`
        ${ItemInner} {
            justify-content: ${justContentConfig[props.justContent]};
        }
    `};
    
    @media ${screen.lg} {
        min-height: 45px;
        padding-left: 15px;
        padding-right: 10px;
    }
`;

const Li = styled.li`
    position: relative;
    box-sizing: border-box;

    ${props =>
        !props.isMedia &&
        css`
            &:after {
                width: auto;
                left: ${px2vw(15)};
                right: 0;

                content: '';
                position: absolute;
                background-color: ${props=> props.theme.listBorderColor};
                display: block;
                z-index: unset;
                top: auto;
                bottom: 0;
                height: 1px;
                transform-origin: 50% 100%;
                
                @media ${screen.lg} {
                    left: 15px;
                }
            }
        `};

    ${props =>
        props.isMedia &&
        css`
            ${ItemInner} {
                &:after {
                    width: calc(100% + ${px2vw(10)});
                    left: 0;
                    right: 0;

                    content: '';
                    position: absolute;
                    background-color: ${props => props.theme.listBorderColor};
                    display: block;
                    z-index: unset;
                    top: auto;
                    bottom: 0;
                    height: 1px;
                    transform-origin: 50% 100%;
                    
                    @media ${screen.lg} {
                        width: calc(100% + 10px);
                    }
                }
            }
        `};
    
    @media ${screen.lg} {
        &:last-child:after{
            background-color: transparent;
        }
    }
    
    
    ${props=>props.isHidden && css`
        display: none;
    `};
    
    
  
`;

