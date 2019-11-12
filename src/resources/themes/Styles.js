import styled from 'styled-components';
import screen from '@themes/Screen';
import {px2vw} from '@utils/format';
import Loader from '@components/atoms/Loader';


export const Desc = styled.span`
    display: block;
    color: ${props => props.theme.primaryColor};
    font-size: ${px2vw(12)};
    font-weight: 900;
    padding: ${px2vw(5)};
    text-align: center;
    
    @media ${screen.lg} {
      font-size: 12px;
      padding: 10px;
    }
`;


export const Edit = styled.div`
    color: ${props=> props.theme.memoColor};
    font-size: ${px2vw(12)};
    opacity: .5;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

export const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    //height: inherit;
    //min-height: 0;
    width: 100%;
    padding-top: ${px2vw(20)};
    flex: 1 1 auto;
    
    @media ${screen.lg} {
        width: 768px;
        padding: 25px 50px 25px 50px;
        border: 1px rgba(151, 151, 151, .2) dotted;
        margin: 25px;
    }
`;


export const Notice = styled.div`
    color: ${props => props.theme.memoColor};
    font-size: ${px2vw(12)};
    font-weight: 900;
    white-space: normal;
    padding-left: ${px2vw(10)};
    padding-right: ${px2vw(10)};
    
    @media ${screen.lg} {
        font-size: 12px;
        padding: 0;
    }
`;


export const Description = styled.div`
    color: ${props => props.theme.primaryColor};
    font-size: ${px2vw(12)};
    font-weight: 900;
    white-space: normal;
    padding-left: ${px2vw(10)};
    padding-right: ${px2vw(10)};
    
    @media ${screen.lg} {
        font-size: 12px;
        padding: 0;
    }
`;


export const Range = styled.div`
    color: ${props => props.theme.descColor};
    font-size: ${px2vw(12)};
    font-weight: 400;
    white-space: normal;
    padding-left: ${px2vw(10)};
    padding-right: ${px2vw(10)};
    
    @media ${screen.lg} {
        font-size: 12px;
        padding: 0;
    }
`;


export const PayBg = styled.div`
    width: 100%;
    height: ${px2vw(266)};
    background-color: ${props => props.theme.listBackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media ${screen.lg} {
      height: 266px;
    }
`;

export const Footer = styled.div`
    padding: ${px2vw(15)};
    flex: 0 1 auto;
    
    @media ${screen.lg} {
       padding: 15px 0;
    }
`;



export const ContainerLoader = styled(Loader)`
    width: 100%;
    height: inherit;
    //min-height: var(--vh100);
    
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
