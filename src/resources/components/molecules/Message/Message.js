// @flow
/**
 * Message
 */
import * as React from 'react';
import styled,{css} from 'styled-components';
import cx from 'classnames';
import {asset} from '@utils/uri';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import Icon from '@components/atoms/Icon';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    authorType: string,
    content: string,
    createTime: string,
    attachedImg: string
};
type State = {};

class Message extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined
    };


    /**
     * Render頭像
     * @param authorType
     * @returns {*}
     */
    renderFavicon = (authorType) =>{
        if(authorType === 'user'){
            return <UserPhoto>
                <Icon code="robot" size={30} color="#fff" />
            </UserPhoto>;
        }else{
            return <SystemPhoto src={asset(siteConfig.theme.pwaIcon)}/>;
        }
    };

    render() {
        const {className, style, authorType, content, createTime, attachedImg} = this.props;


        return (
            <MessageRoot className={cx(className, {'flex-row-reverse': authorType ==='user'} )} style={style}>
                {this.renderFavicon(authorType)}
                <SystemMessageView>
                    <SystemMessageContent
                        authorType={authorType}> {content}
                        {attachedImg && <PhotoColumn  className='photo-column'>
                            <PhotoUrl src={attachedImg}/>
                        </PhotoColumn>}
                    </SystemMessageContent>
                    <CreateTime>{createTime}</CreateTime>
                </SystemMessageView>
            </MessageRoot>
        );
    }
}

export default Message;

const CreateTime = styled.div`
    font-size: ${px2vw(8)};
    color: ${props => props.theme.cardTitleColor};
    margin: ${px2vw(5)} 0 ${px2vw(15)} 0;
    
    @media ${screen.lg} {
        font-size: 14px;
        margin: 5px 0 15px 0;
    }
`;


const SystemMessageContent = styled.div`
    position: relative;
    word-break: break-all;
    font-size: ${px2vw(12)};
    line-height: ${px2vw(12)};
    color: ${props => props.theme.cardContentColor};
    border-radius: 1px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.26);
    background-color: ${props => props.theme.cardBackgroundColor};
    padding: ${px2vw(9)} ${px2vw(6)};
    width: 100%;
    &:after {
        position: absolute;
        display: inline-block;
        top: ${px2vw(11)};
        width: 0;
        height: 0;
        content: '';
        border-style: solid;
        border-width: ${px2vw(5)};
        border-color: ${props => `${props.theme.cardBackgroundColor} ${props.theme.cardBackgroundColor} transparent transparent`};
        box-shadow: 2px -2px 2px rgba(0, 0, 0, 0.08);
    }
    
    ${props => props.authorType === 'system' && css`

        &:after{
            transform: rotate(225deg);
            left: ${px2vw(-4.5)};
        }
    `}
    
    ${props => props.authorType === 'user' && css`

        &:after{
            transform: rotate(45deg);
            right: ${px2vw(-4.5)};
        }
    `}
    
     
    @media ${screen.lg} {
        font-size: 14px;
        line-height: unset;
        padding: 18px;
        
        &:after {
            top: 22px;
            border-width: 5px;
        }
        
        ${props => props.authorType === 'system' && css`

            &:after{
                left: -4.5px;
            }
        `}
        
        
        ${props => props.authorType === 'user' && css`

            &:after{
                right: -4.5px;
            }
        `}
    }
`;

const SystemMessageView = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${px2vw(4)} ${px2vw(14)} 0 0;
    position: relative;
    align-items: flex-end;
    width: 100%;
    
    @media ${screen.lg} {
        margin: 2px 14px 0 0;
    }
`;


const SystemPhoto = styled.div`
    width: ${px2vw(36)};
    height: ${px2vw(36)};
    background: transparent center center;
    background-image: url('${props=>props.src}');
    background-size: 80%;
    border-radius: 50%;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    margin: 0 ${px2vw(18)} 0 0;
    
    @media ${screen.lg} {
        width: 60px;
        height: 60px;
        margin: 0 18px 0 0;
    }
`;

const UserPhoto = styled(SystemPhoto)`
    margin: 0 0 0 ${px2vw(5)};
    background-color: ${props=>props.theme.primaryContrastColor};
`;

const MessageRoot = styled.div`
    display: flex;
`;

const PhotoUrl = styled.div`
    width: 100%;
    height: 100%;
    background: no-repeat center center;
    background-image: url('${props => props.src}');
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
`;

const PhotoColumn = styled.div`
    width: 100%;
    margin-top: 10px;
    padding-bottom: 26%;
    overflow: hidden;
    position: relative;
    
    @media ${screen.lg} {
        width: 100%;
    };
`;
