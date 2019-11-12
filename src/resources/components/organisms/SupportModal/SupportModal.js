// @flow
/**
 * SupportModal
 */
import * as React from 'react';
import styled from 'styled-components';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';

import WhatsApp from '@components/molecules/WhatsApp';
import {asset} from '@utils/uri';
import {px2vw} from '@utils/format';
import Icon from '@components/atoms/Icon';
import {FormattedMessage as I18N} from 'react-intl';

type Props = {
    whatsAppID: string,
    liveChatUrl: string,
    onClose: Function,
    account?: string
};

type State = {};

const bodySelectorId = 'reactScroll_support';

class SupportModal extends React.PureComponent<Props, State> {

    static defaultProps = {
        account: 'guest'
    };

    targetElement = null;

    componentDidMount(){
        this.targetElement = document.querySelector(`#${bodySelectorId}`);
        disableBodyScroll(this.targetElement);
    }
    componentWillUnmount(){
        this.targetElement = document.querySelector(`#${bodySelectorId}`);
        enableBodyScroll(this.targetElement);
    }


    render() {

        const {whatsAppID, liveChatUrl, onClose, account} = this.props;

        return (
            <Overlay id={`${bodySelectorId}`}>
                <SupportContainer>
                    <CustomerServiceContainer onClick={()=>window.open(`${liveChatUrl}&name=${account}`)}>
                        <Circle />

                        <IconContainer>
                            <Img/>
                        </IconContainer>

                        <ContentContainer >
                            <Content><I18N id="column.customerService" defaultMessage="24小时在线客服"/></Content>
                        </ContentContainer>
                    </CustomerServiceContainer>

                    {
                        whatsAppID &&
                        <WhatsApp id={whatsAppID} theme='white'/>
                    }

                </SupportContainer>

                <CloseContainer onClick={onClose}>
                    <CloseIcon code="close" size={20} />
                </CloseContainer>


            </Overlay>

        );
    }
}

export default SupportModal;

const Overlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
`;

const SupportContainer = styled.div`
    margin: 0 auto;
    position: relative;
    bottom: 150px;
`;

const CustomerServiceContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: ${px2vw(20)};
    margin-bottom: ${px2vw(30)};
`;

const Circle = styled.div`
    width: ${px2vw(50)};
    height: ${px2vw(41)};
    position: absolute;
    left: ${px2vw(50)};
    overflow: hidden;
    :before {
        content: '';
        width: ${px2vw(85)};
        height: ${px2vw(85)};
        border-radius: 100%;
        background: rgba(0,0,0,0);
        border: ${px2vw(15)} solid #fff;
        position: absolute;
        top: ${px2vw(-22)};
        left: ${px2vw(-61)};
    }
`;

const ContentContainer = styled.div`
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    padding: ${px2vw(0)} ${px2vw(35)} ${px2vw(0)} ${px2vw(15)};
    margin-left: ${px2vw(40)};
    height: ${px2vw(41)};
    display: flex;
    align-items: center;
    width: ${px2vw(172)};
`;

const Content = styled.div`
    font-family: Roboto;
    font-size: ${px2vw(16)};
    font-weight: 900;
    letter-spacing: 0.57px;
    color: #4a4a4a;
    line-height: ${px2vw(10)};
`;

const IconContainer = styled.div`
    width: ${px2vw(50)};
    height: ${px2vw(50)};
    border-radius: 100%;
    background: linear-gradient(to bottom, #e2a240, #d8416e);
    position: absolute;
    left: 5px;
`;

const Img = styled.div`
    background-image: url(${asset('common/images/customer-service.png')});
    width: ${px2vw(49)};
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 100%;

`;

const CloseContainer = styled.div`
    width: ${px2vw(40)};
    height: ${px2vw(40)};
    background-color: #fff;
    border-radius: 100%;
    position: absolute;
    bottom: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    
    
`;

const CloseIcon = styled(Icon)`
    .iconfont{
        color: ${siteConfig.theme.primaryColor};
    }
`;
