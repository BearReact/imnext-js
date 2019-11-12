// @flow
/**
 * MemberInfo
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

import Icon from '@components/atoms/Icon';
import VipLevel from '../VipLevel/VipLevel';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    level: string,
    account: string,
    memberLevelName: string,
};
type State = {};

class MemberInfo extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null
    };

    render() {
        const {level, account, memberLevelName, style, className} = this.props;
        return (
            <MemberInfoRoot style={style} className={className}>
                <PhotoView>
                    <VipLevelPosition level={level} />
                    <PhotoShape>
                        <Icon code="robot" size={50} color={siteConfig.theme.primaryColor} />
                    </PhotoShape>
                </PhotoView>

                <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start">
                    <Account>{account}</Account>
                    <MemberLevelName>{memberLevelName}</MemberLevelName>
                </div>
            </MemberInfoRoot>
        );
    }
}

export default MemberInfo;

const MemberLevelName = styled.span`
    font-size: ${px2vw(10)};
    color: #9b9b9b;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
    
`;

const Account = styled.span`
    font-size: ${px2vw(14)};
    font-weight: 900;
    text-align: center;
    color: #ffffff;
    margin: 15px 0 4px 0;
    
    @media ${screen.lg} {
        font-size: 14px;
        margin-top: 5px;
    }
`;

const PhotoShape = styled.div`
    width: ${px2vw(70)};
    height: ${px2vw(70)};
    background-color: #ffffff;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    @media ${screen.lg} {
        width: 50px;
        height: 50px;
        
        .iconfont{
            font-size: 40px;
        }
    }
    
    
`;

const VipLevelPosition = styled(VipLevel)`
    position: absolute;
    right: 20px;
    top: 0;
    border: 2px solid #292c31;
    
    @media ${screen.lg} {
        right: 7px;
        top: -11px;
    }
`;

const PhotoView = styled.div`
    position: relative;
    padding-right: ${px2vw(15)};
    
    @media ${screen.lg} {
        padding-right: 15px;    
    }
`;

const MemberInfoRoot = styled.div`
    color: #fff;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: 1 1 auto;
    padding-left: ${px2vw(15)};
    
    @media ${screen.lg} {
        flex-direction: row;
        padding-left: 15px
    }
`;
