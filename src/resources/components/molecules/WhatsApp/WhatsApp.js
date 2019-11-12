// @flow
/**
 * WhatsApp
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import screen from '@themes/Screen';
import {asset} from '@utils/uri';
import {px2vw} from '@utils/format';

type Props = {
    id: string,
    theme: string
};
type State = {};

class WhatsApp extends React.PureComponent<Props, State> {

    render() {
        const {id ,theme} = this.props;
        const whatsAppUrl = `https://wa.me/${id}`;

        return (

            <Container onClick={()=>window.open(whatsAppUrl)}>
                <Circle theme={theme}/>

                <IconContainer>
                    <WhatsAppIcon/>
                </IconContainer>

                <ContentContainer theme={theme}>
                    <Title theme={theme}>WhatsApp</Title>
                    <Content theme={theme}>{id}</Content>
                </ContentContainer>
            </Container>
        );
    }
}

export default WhatsApp;

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: ${px2vw(20)};
    
    @media ${screen.lg}{
        padding-left: 20px;
    }
    
`;

const Circle = styled.div`
    width: ${px2vw(50)};
    height: 100%;
    position: absolute;
    left: ${px2vw(50)};
    overflow: hidden;
    
    @media ${screen.lg}{
        width: 50px;
        left: 50px;
    }
    
    :before {
        content: '';
        width: ${px2vw(85)};
        height: ${px2vw(85)};
        border-radius: 100%;
        background: rgba(0,0,0,0);
        border: ${px2vw(15)} solid #141618;
        position: absolute;
        top: ${px2vw(-22)};
        left: ${px2vw(-61)};
        
        ${props => props.theme === 'white' && css`
            border: ${px2vw(15)} solid #fff;
            
            @media ${screen.lg}{
                border: 15px solid #fff;
            }
        `}
        
        @media ${screen.lg}{
            width: 85px;
            height: 85px;
            border: 15px solid #141618;
            top: -22px;
            left: -61px;
            
            ${props => props.theme === 'white' && css`
                border: ${px2vw(15)} solid #fff;
            
            @media ${screen.lg}{
                border: 15px solid #fff;
            }
        `}
        }
    }
`;

const ContentContainer = styled.div`
    text-align: center;
    background-color: #141618;
    border-radius: 0 5px 5px 0;
    padding: 0 ${px2vw(35)} 0 ${px2vw(15)};
    margin-left: ${px2vw(40)};
    height: ${px2vw(41)};
    width: ${px2vw(172)};
    
    ${props => props.theme === 'white' && css`
        background-color: #fff;
    `}
    
    @media ${screen.lg}{
        padding: 0 10px 0 15px;
        margin-left: 40px;
        height: 41px;
        width: auto;
    }
    
`;

const Title = styled.div`
    font-family: Roboto;
    font-size: ${px2vw(12)};
    text-align: start;
    color: #fff;
    line-height: ${px2vw(25)};
    text-align: start;
    
    @media ${screen.lg}{
        font-size: 12px;
        line-height: 25px;
    }
    
    ${props => props.theme === 'white' && css`
        color: #4a4a4a;
    `}
`;

const Content = styled.div`
    font-family: Roboto;
    font-size: ${px2vw(16)};
    font-weight: 900;
    letter-spacing: 0.57px;
    color: #fff;
    line-height: 10px;
    text-align: start;
    
    ${props => props.theme === 'white' && css`
        color: #4a4a4a;
    `}
    
    @media ${screen.lg}{
        font-size: 16px;
    }
`;

const IconContainer = styled.div`
    position: absolute;
    left: 5px;
`;


const WhatsAppIcon = styled.div`
    background-image: url(${asset('common/images/whatsapp.svg')});
    height: ${px2vw(50)};
    width: ${px2vw(50)};
    background-size: contain;
    background-repeat: no-repeat;
    
    @media ${screen.lg}{
        height: 50px;
        width: 50px;
    }
`;
