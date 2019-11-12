// @flow
/**
 * LobbyList
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import ProgressBar from '@components/atoms/ProgressBar';
import {asset} from '@utils/uri';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    isReady?: boolean
};
type State = {};

class StartupLoader extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isReady: false
    };

    render() {
        const {
            style,
            className,
            isReady
        } = this.props;


        return <LoaderContainer isHidden={isReady}>
            <RootStartup
                style={style}
                className={className}
            >
                <Mask>
                    <Logo src={asset(siteConfig.theme.loginLogo)}/>
                    <Desc>正在取得系统设定中</Desc>
                    <ProgressBar progress={100}
                        style={{marginBottom: px2vw(15)}}
                        transitionTime={0}
                    />
                    <Desc>请稍后...</Desc>
                </Mask>
            </RootStartup>
        </LoaderContainer>;
    }
}

export default StartupLoader;


const Desc = styled.div`
    color: #fff;
    font-size: ${px2vw(12)};
    font-weight: 900;
    margin-bottom: ${px2vw(23)};
`;

const Logo= styled.img`
    width: ${px2vw(140)};
    margin-bottom: 15px;
`;

const Mask = styled.div`
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    height: inherit;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: ${px2vw(20)};
    padding-right: ${px2vw(20)};

`;

const RootStartup = styled.div`
    height: inherit;
`;

const LoaderContainer = styled.div`
    height: inherit;
   
    
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;


    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: top center no-repeat;
      background-size: cover;
      background-image: url(${props => asset(props.theme.loginBackground)});
      filter: blur(4px);
    }

`;

