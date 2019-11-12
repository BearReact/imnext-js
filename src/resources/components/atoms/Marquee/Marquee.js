// @flow
import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {px2vw} from '@utils/format';
import uniqueId from 'lodash/uniqueId';
import Icon from '@components/atoms/Icon/Icon';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    source?: Array<string>
};

function Marquee(props: Props){
    const {className, style, source} = props;
    return (
        <RootContainer className={className} style={style}>
            <Icon code="voice" style={{marginLeft: 10, marginRight: 10}} color="#fff"/>
            <MarqueeContainer>
                <ul>
                    {source.map(row => <li key={uniqueId('marquee_')}>{row}</li>)}
                </ul>
            </MarqueeContainer>
        </RootContainer>

    );
}

Marquee.defaultProps = {
    style: undefined,
    className: undefined,
    source: []
};

export default Marquee;


const marqueeFrames = keyframes`
  from {
    left: 100%;
    transform: translateX(0%);
  }

  to {
    left: 0;
    transform: translateX(-100%);
  }
`;


const RootContainer = styled.div`
    height: ${px2vw(42)};
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #3c4447;
`;

const MarqueeContainer = styled.div`
    height: ${px2vw(42)};
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    > ul {
        padding-left: 0;
        display: flex;
        list-style-type: none;
        animation: ${marqueeFrames} 25s linear infinite;
        position: absolute;

        > li {
            white-space: nowrap;
            margin-right: 2em;
            color: #fff;
            font-size: ${px2vw(12)};
        }
    }
`;
