// @flow
/**
 * Favorite
 */
import * as React from 'react';
import {asset} from '@utils/uri';
import styled, {screen} from '@library/styled-components';
import {px2vw} from '@utils/format/index';

type Props = {
    children?: React.Node,
    bgColor: string
};
type State = {};

class VipBackground extends React.PureComponent<Props, State> {
    static defaultProps = {
        children: ''
    };

    render() {
        const {children, bgColor} = this.props;
        return (
            <Background bgColor={bgColor}>
                {children}

                <BgBubbles>
                    <li><img src={asset('common/images/vip-level-icon/0.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/1.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/12.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/13.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/24.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/25.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/38.png')} alt="" /></li>
                    <li><img src={asset('common/images/vip-level-icon/39.png')} alt="" /></li>
                </BgBubbles>
            </Background>
        );
    }
}

export default VipBackground;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.bgColor ? props.bgColor : '#F2F4F9'};
    position: relative;
    overflow: hidden;
`;

const BgBubbles = styled.ul`
    margin: 0;
    
    li {
        position: absolute;
        list-style: none;
        display: block;
        background-color: fade(white, 15%);
        bottom: -160px;
        
        -webkit-animation: square 40s infinite;
        animation: square 40s infinite;
        
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;
        
        @media ${screen.lg} {
            -webkit-animation: squareLarge 40s infinite;
            animation: squareLarge 40s infinite;
        }
        
        img {
            opacity: 0.2;
            width: 100%;
            height: 100%;
        }
        
        
        &:nth-child(1){
            left: 10%;
            display: none;
            
            @media ${screen.lg} {
                display: block;
                width: 70px;
                height: 70px;
            }
        }
        
        &:nth-child(2){
            left: 20%;
            animation-delay: 2s;
            animation-duration: 30s;
            
            img {
                width: ${px2vw(50)};
                height: ${px2vw(50)};
                
                @media ${screen.lg} {
                    animation-duration: 17s;
                    width: 80px;
                    height: 80px;
                }
            }
        }
        
        &:nth-child(3){
            left: 25%;
            animation-delay: 4s;
            display: none;
            
            @media ${screen.lg} {
                display: block;
                width: 110px;
                height: 110px;
            }
        }
        
        &:nth-child(4){
            left: 40%;
            background-color: fade(white, 25%);
            
            img {
                width: ${px2vw(80)};
                height: ${px2vw(80)};
                
                @media ${screen.lg} {
                    animation-duration: 22s;
                    width: 60px;
                    height: 60px;
                }
            }
        }
        
        &:nth-child(5){
            left: 70%;
            display: none;
            
            @media ${screen.lg} {
                display: block;
                width: 90px;
                height: 90px;
            }
        }
        
        &:nth-child(6){
            left: 80%;
            animation-delay: 3s;
            background-color: fade(white, 20%);

            img {
                width: ${px2vw(60)};
                height: ${px2vw(60)};
                
                @media ${screen.lg} {
                    width: 80px;
                    height: 80px;
                }
            }            
        }
        
        &:nth-child(7){
            left: 55%;
            animation-delay: 7s;
            display: none;
            
            @media ${screen.lg} {
                display: block;
                width: 120px;
                height: 120px;
            }
        }
        
        &:nth-child(8){
            left: 55%;
            animation-delay: 15s;
            animation-duration: 40s;

            img {
                width: ${px2vw(30)};
                height: ${px2vw(30)};
                
                @media ${screen.lg} {
                    width: 70px;
                    height: 70px;
                }
            } 
        }
    }
    
    @-webkit-keyframes square {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-1250px) rotate(600deg); }
    }
    @keyframes square {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-1250px) rotate(600deg); }
    }
    
    @-webkit-keyframes squareLarge {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-2000px) rotate(600deg); }
    }
    @keyframes squareLarge {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-2000px) rotate(600deg); }
    }
`;
