// @flow
/**
 * CopyButton
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import {px2vw} from '@utils/format';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from '@components/atoms/Button/Button';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    text?: string,
    copyText: string,
    onSuccess?: Function,
    children?: React.Node,
    isLightBox?: boolean
};
type State = {
    isShowMessage: boolean
};

class CopyButton extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        text: '已复制',
        onSuccess: undefined,
        children: null,
        isLightBox: true
    };

    state = {
        isShowMessage: false
    };

    handleSuccess = () =>{
        const {onSuccess} = this.props;
        if(onSuccess){
            onSuccess();
        }

        const $this = this;
        this.setState({
            isShowMessage: true
        },
        () => setTimeout(function(){
            $this.setState({isShowMessage: false});
        }, 2000)
        );
    };

    render() {
        const {className, children, style, text, copyText, isLightBox} = this.props;
        const {isShowMessage} = this.state;

        return (
            <React.Fragment>
                <CopyToClipboard
                    text={copyText}
                    onCopy={this.handleSuccess}
                    className={className}
                    style={style}
                >
                    {children}
                </CopyToClipboard>

                <CopyRoot isShow={isShowMessage} isLightBox={isLightBox}>
                    <Copied
                        theme="primary"
                        shape="circle"
                        size="normal"
                        disable
                    >{text}</Copied>
                </CopyRoot>
            </React.Fragment>
        );
    }
}

export default CopyButton;

const CopyRoot = styled.div`
    position: fixed;
    text-align: center;
    margin: 0 auto;
    bottom: ${px2vw(0)};
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    opacity: 0;
    z-index: -1;
    transition: all .4s ease-in-out;
    
    @media ${screen.lg} {
        bottom: 100px;
        height: 44px;
    } 
    
    ${props => props.isShow && css`
        opacity: 1;
        z-index: 10;
        bottom: ${px2vw(80)};
        
        @media ${screen.lg} {
            bottom: 220px;
        } 
            
    `};
    
    ${props => !props.isLightBox && css`
        width: 100%;
        height: auto;
        left: auto;
        right: 0;
        bottom: ${px2vw(10)};
        
        @media ${screen.lg} {
            width: calc(100% - 270px);
            height: 44px;
            bottom: 170px;
        }       
    `};
    
    ${props => !props.isLightBox && props.isShow && css`
        opacity: 1;
        bottom: ${px2vw(25)};
        height: auto;
        
        @media ${screen.lg} {
            bottom: 200px;
        }        
    `};
    
    button {

        @media ${screen.lg} {
            width: 300px;
            padding: 0;
        }         
    }
          
`;

const Copied = styled(Button)`
    padding-left: ${px2vw(30)};
    padding-right: ${px2vw(30)};
`;
