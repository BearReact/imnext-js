// @flow
/**
 * RuleModal
 */
import * as React from 'react';
import styled, {screen, css} from '@library/styled-components';
import {asset} from '@utils/uri';
import {px2vw} from '@utils/format';

import Icon from '@components/atoms/Icon';

type Props = {
    isShow?: boolean,
    onClose?: Function,
    title?: string,
    titleStyle?: Array<{
        color: string
    }>,
    html?: string,
    className?: string
};
type State = {};

class RuleModal extends React.PureComponent<Props, State> {
    static defaultProps = {
        isShow: false,
        title: '',
        onClose: () => {},
        titleStyle: {
            color: '#fff'
        },
        html: '',
        className: ''
    };

    render() {
        const {
            isShow,
            onClose,
            title,
            titleStyle,
            html,
            className
        } = this.props;

        return (
            <Overlay className={className} isShow={isShow}>
                <RuleModalRoot>

                    <RuleTitleContent>
                        <Title
                            theme={titleStyle}
                        >{title}</Title>

                        <CloseButton
                            onClick={onClose()}
                        >
                            <Icon
                                code="close1"
                                color="#fff"
                                size={12}
                            />
                        </CloseButton>
                    </RuleTitleContent>

                    <RuleHtmlContent>
                        <div>{html}</div>
                    </RuleHtmlContent>

                    <FooterBg bgImage={asset(siteConfig.theme.vipFooterWaveMobileImage)}/>

                </RuleModalRoot>
            </Overlay>
        );
    }
}

export default RuleModal;

const CloseButton = styled.button`
    background-color: rgba(0, 0, 0, 0.7);
    width: ${px2vw(25)};
    height: ${px2vw(25)};
    position: absolute;
    right: ${px2vw(10)};
    top: 50%;
    transform: translateY(-50%);
    border: none;
    border-radius: 5px;
    
    @media ${screen.lg} {
        width: 25px;
        height: 25px;
        right: 10px;
    }
`;

const FooterBg = styled.div`
    height: ${px2vw(36)};
    width: 100%;
    background-image: url("${props => props.bgImage}");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    bottom: 0;
    
    @media ${screen.lg} {
        height: 36px;
    }
`;

const RuleHtmlContent = styled.div`
    background-color: ${siteConfig.theme.bodyBackgroundColor};
    color: ${siteConfig.theme.vipLightBoxTextColor};
    padding: ${px2vw(15)} ${px2vw(10)} 0;
    max-height: calc(100% - ${px2vw(47)});
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    
    i{
        color: ${siteConfig.theme.primaryColor};
        font-style: normal;
    }
    
    p span{
        color: red;
    }
    
    table{
        width: 100%;
        text-align: center;
        
        >tr >th{
            background-color: #28a9e0;
        }
        
        >tr >td{
            width: 33.3%;
        }
    }
    
    @media ${screen.lg} {
        padding: 15px 10px 0;
        max-height: calc(100% - 47px);
    }
`;

const Title = styled.p`
    color: ${props => props.theme.color};
    font-size: ${px2vw(12)};
    margin: 0;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const RuleTitleContent = styled.div`
    background-color: ${siteConfig.theme.primaryColor};
    padding: ${px2vw(13)} ${px2vw(20)};
    position: relative;
    
    @media ${screen.lg} {
        padding: 13px 20px;
        height: 40px;
    }
`;

const RuleModalRoot = styled.div`
    background-color: ${siteConfig.theme.bodyBackgroundColor};
    height: 100%;
    max-height: calc(100% - 75px);
    position: relative;
    
    @media ${screen.lg} {
        max-width: 280px;
        max-height: 488px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const Overlay = styled.div`
    padding: ${px2vw(40)} ${px2vw(20)};
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    visibility: hidden;
    
    ${props => props.isShow && css`
        visibility: visible;
    `}
    
    @media ${screen.lg} {
        padding: 40px 20px;
    }
`;
