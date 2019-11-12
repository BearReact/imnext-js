// @flow
/**
 * Tooltips
 * 內容為 text 優先, 若無則是顯示 children
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import {isEmpty} from '@utils/equal';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


type Props = {
    style?: React.CSSProperties,
    children?: React.Node,
    className?: string,
    text?: string,
    position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'topCenter' | 'bottomCenter',
};
type State = {};

class Tooltips extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        position: 'topCenter',
        children: undefined,
        text: ''
    };

    render() {
        const {className, style, text, position, children} = this.props;

        return (

            <TooltipsRoot
                className={className} style={style}
                position={position}
            >
                <TooltipsArrow position={position}/>
                <DropDownMenuList padding={isEmpty(children) ? 10 : 0}>
                    {text ? text : children}
                </DropDownMenuList>
            </TooltipsRoot>
        );
    }
}

export default Tooltips;



const DropDownMenuList = styled.div`
    display: inline-flex;
    flex-direction: column;
    background-color: ${props => props.theme.primaryColor};
    border-radius: 3px;
    overflow: hidden;
    min-height: ${px2vw(30)};
    min-width: ${px2vw(60)};
    justify-content: center;
    padding: 0 ${props=> px2vw(props.padding)};
    
    @media ${screen.lg} {
        min-height: 25px;
        min-width: auto;
        height: 0;
    }
`;


const TooltipsArrow = styled.div`
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${px2vw(12)} ${px2vw(10)} 0;
    border-color: ${props => props.theme.primaryColor} transparent transparent ;
    
    @media ${screen.lg} {
        border-width: 12px 10px 0;
    }
`;

const TooltipsRoot = styled.div`
    position: absolute;
    justify-content: center;
    border-radius: ${px2vw(2)};
    font-size: ${px2vw(11)};
    color: #fff;
    font-weight: bold;
    white-space: nowrap;
    box-shadow: ${px2vw(1)} ${px2vw(1)} ${px2vw(3)} rgba(0, 0, 0, 0.3);
       
    
    ${props => props.position === 'topLeft' && css `
        right: ${px2vw(-5)};
        top: 0;
        transform: translateY(calc(-100% - 12px));
        
        ${TooltipsArrow}{
            right: ${px2vw(8)};
            bottom: ${px2vw(-8)};
            margin: auto;
        }
    `};
    
    ${props => props.position === 'topCenter' && css `
        left: 50%;
        top: 0;
        transform: translate(-50%, calc(-100% - 12px));
        transform-origin: 50% 50%;
        
          
        ${TooltipsArrow}{
            left: 0;
            right: 0;
            margin: auto;
            bottom: -12px;
            padding-bottom: 4px;
        }
    `};
    
    
    ${props => props.position === 'topRight' && css `
        left: ${px2vw(-5)};
        top: 0;
        transform: translateY(calc(-100% - 12px));
        
        ${TooltipsArrow}{
            left: ${px2vw(8)};
            bottom: -12px;
            padding-bottom: 4px;
            margin: auto;
        }
    `};
    
    ${props => props.position === 'bottomRight' && css `
        bottom: 0;
        left: ${px2vw(-5)};
        transform: translateY(calc(100% + 12px)); 
        margin-bottom: 10px;

        ${TooltipsArrow}{
            left: 8px;
            top: -8px;
            
            transform: rotate(180deg);
        }
    `};
    
    ${props => props.position === 'bottomCenter' && css `
        left: 50%;
        bottom: 0;
        transform: translate(-50%, calc(100% + 12px));
        transform-origin: 50% 50%;
        padding-bottom: 10px;

        
        ${TooltipsArrow}{
            left: 0;
            right: 0;
            top: -8px;
            margin: auto;
            transform: rotate(180deg);
        }
    `};
    
    ${props => props.position === 'bottomLeft' && css `
        bottom: 0;
        right: ${px2vw(-5)};
        transform: translateY(calc(100% + 12px)); 
        margin-bottom: 10px;

        ${TooltipsArrow}{
            right: 8px;
            top: -8px;
            transform: rotate(180deg);
        }
    `};
    
    ${props => props.position === 'right' && css `
        bottom: 50%;
        right: 100%;
        transform: translateY(50%);
        margin: 0;

        ${TooltipsArrow}
        {
            right: -12px;
            top: 8px;
            transform: rotate(-90deg);
        }
    `};

    
    
    @media ${screen.lg} {
        font-size: 14px;
        border-radius: 2px;
        font-size: 11px;
        
        
         ${props => props.position === 'topLeft' && css `
            right: -5px;
            transform: translateY(-100%) translateY(-12px);

            ${TooltipsArrow}{
                right: 8px;
                bottom: -8px;
            }
        `};
         
         ${props => props.position === 'topCenter' && css `
            transform: translateX(-50%) translateY(-100%) translateY(-12px);
            transform-origin: 50% 50%;
            
              
            ${TooltipsArrow}{
                left: 0;
                right: 0;
                margin: auto;
                bottom: -12px;
                padding-bottom: 4px;
            }
        `};
        
        
        
        
        ${props => props.position === 'topRight' && css `
            left: -5px;
            transform: translateY(-100%) translateY(-12px);
            
            ${TooltipsArrow}{
                left: 8px;
            }
        `};
        
        ${props => props.position === 'bottomRight' && css `
            left: -5px;
            transform: translateY(100%) translateY(12px); 
        `};
       
       
       
        ${props => props.position === 'bottomCenter' && css `
            transform: translateX(-50%) translateY(100%) translateY(12px);
        `};
        
        ${props => props.position === 'bottomLeft' && css `
            right: -5px;
            transform: translateY(100%) translateY(12px); 
        `};
    }
    
    
`;
