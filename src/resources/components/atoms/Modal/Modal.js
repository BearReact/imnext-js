// @flow
/**
 * Dialog
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import Rodal from 'rodal';
import {px2vw} from '@utils/format';
import {isEmpty} from '@utils/equal';
import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import get from 'lodash/get';
import screen from '@themes/Screen';

type Props = {
    buttons?: Array<{
        text: string,
        type: string,
        onClick?: Function,
        effectType?: 'MODAL_CLICK_OK' | 'MODAL_CLICK_CANCEL',
        needClose: boolean
    }>,
    style?: React.CSSProperties,
    contentStyle?: React.CSSProperties,
    isShowClose?: boolean,
    closeButtonPosition?: 'bottom' | 'right',
    isVisible?: boolean,
    type?: string,
    title?: string,
    statusCode?: string,
    children?: React.Node,
    onClose?: Function,
    onCloseCallback?: Function,
    modalClickOk?: Function,
    modalClickCancel?: Function,
};
type State = {};

class Modal extends React.PureComponent<Props, State> {
    static defaultProps = {
        type: null,
        style: undefined,
        contentStyle: undefined,
        title: '',
        statusCode: '',
        children: '',
        buttons: [],
        isShowClose: false,
        closeButtonPosition: 'bottom',
        onClose: undefined,
        onCloseCallback: undefined,
        isVisible: false,
        modalClickOk: ()=>{},
        modalClickCancel: ()=>{}
    };


    /**
     * 處理點選按鈕的事件
     * @param onClick
     * @param effectType
     * @param needClose
     */
    handleClickDialog = (onClick = undefined, effectType = undefined, needClose = true) => {
        const {onClose, modalClickOk, modalClickCancel} = this.props;

        // 外部傳入的事件，
        if (typeof onClick === 'function') {
            onClick();
        }

        // 視情況將固定的 redux action 改為指定的 type, 並 dispatch type
        switch (effectType) {
            case 'MODAL_CLICK_OK':
                modalClickOk();
                break;
            case 'MODAL_CLICK_CANCEL':
                modalClickCancel();
                break;
        }

        // 判斷是否需關閉光箱
        if (needClose) {
            onClose();
        }
    };

    /**
     * 處理點選關閉按鈕的事件
     * @param needClose
     */
    handleCloseButtonClickDialog = (needClose = true) => {
        const {onClose, onCloseCallback} = this.props;

        // 判斷是否需關閉光箱
        if (needClose) {
            onClose();

            if (onCloseCallback) {
                onCloseCallback();
            }
        }
    };

    render() {
        const {style, contentStyle, buttons, type, title, isShowClose, closeButtonPosition, isVisible, children, statusCode} = this.props;

        return (
            <Rodal visible={isVisible}
                measure=""
                showCloseButton={false}
                duration={200}
                onClose={()=>{}}
                customStyles={{
                    padding:  `${px2vw(5)} ${px2vw(8)}`,
                    width: `calc(100% - ${px2vw(70)})`,
                    backgroundColor: '#fff',
                    top: 'auto',
                    bottom: 'auto',
                    position: 'absolute',
                    maxHeight: '75vh',
                    overflow: 'auto',
                    ...style
                }}
            >
                <div className="d-flex flex-column">
                    <TitleText type={type}>{title}</TitleText>
                    <MessageContent style={{...contentStyle}} statusCode={isEmpty(statusCode)}>{children}</MessageContent>
                    {
                        statusCode &&
                        <StatusCode>Error Code : {statusCode}</StatusCode>
                    }
                    <ButtonGroup className="row">
                        {buttons.map(btn => (
                            <ButtonCol className="col d-flex align-items-stretch" key={btn.text}>
                                <Button
                                    theme={btn.type}
                                    onClick={() => this.handleClickDialog(btn.onClick, btn.effectType, get(btn, 'needClose', true))}
                                    block
                                >
                                    {btn.text}
                                </Button>
                            </ButtonCol>
                        ))}
                    </ButtonGroup>

                    {isShowClose && (
                        <CloseButton closeButtonPosition={closeButtonPosition} shape="circle" size="small" onClick={this.handleCloseButtonClickDialog}>
                            <Icon code="close" color="#fff" size={16} />
                        </CloseButton>
                    )}
                </div>
            </Rodal>
        );
    }
}

export default Modal;


const CloseButton = styled(Button)`
    width: ${px2vw(40)};
    height: ${px2vw(40)};
    bottom: -20px;
    left: 0;
    right: 0;
    margin: auto;
    background-color: ${siteConfig.theme.primaryColor};
    
    @media ${screen.lg} {
        width: 40px;
        height: 40px;
    }
    
    ${props => props.closeButtonPosition === 'right' && css`
        width: ${px2vw(30)};
        height: ${px2vw(30)};
        position: absolute;
        top: 10px;
        right: 10px;
        left: auto;
        bottom: auto;
    `}
`;

const StatusCode = styled.span`
    font-size: ${px2vw(12)};
    padding-bottom: ${px2vw(6)};
    color: #858585;
    text-align: center;
    line-height: 2;
    
    @media ${screen.lg} {
        font-size: 12px;
        padding-bottom: 6px;
    }
`;

const TitleText = styled.div`
    color: ${props => (props.type === 'success' ? '#7ed321' : '#ff4b4b')};
    display: ${props => (props.type ? 'block' : 'none')};
    font-size: ${px2vw(18)};
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
    margin-top: ${px2vw(15)};
    
    ${props => props.type === 'confirm' && css`
        color: ${props.theme.primaryColor};
    `}
    
    @media ${screen.lg} {
        font-size: 20px;
        margin-top: 0px;
    }

`;

const MessageContent = styled.div`
    color: #4a4a4a;
    font-size: ${px2vw(16)};
    font-weight: 900;
    line-height: 1.56;
    padding-bottom: ${props => props.statusCode ? px2vw(35) : px2vw(8)};
    padding-top: ${px2vw(10)};
    text-align: center;
    overflow: auto;
    //max-height: 70vh;
    
    @media ${screen.lg} {
        font-size: 16px;
        padding-bottom: ${props => props.statusCode ? '20px' : '8px'};
        padding-top: 10px;
    }
`;

const ButtonCol = styled.div`
    padding: 0 ${px2vw(5)};
    
    @media ${screen.lg} {
        padding: 0 5px;
    }
`;

const ButtonGroup = styled.div`
    margin-left: ${px2vw(-5)};
    margin-right: ${px2vw(-5)};
    
    @media ${screen.lg} {
        margin-left: -5px;
        margin-right: -5px;
    }
`;
