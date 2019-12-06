// @flow

import * as React from 'react';
import {px2vw} from '@utils/format';
import styled, {css} from 'styled-components';
import screen from '@themes/Screen';

import Rolling from './Rolling';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
    isLoading?: boolean,
    size?: number,
    backgroundColor?: string,
    isFullMaskBody?: boolean,
    rollingAlign?: 'full' | 'area',
    isHasPanel?: boolean,
};

const Loader = (props: Props) => {
    const {
        className, style, children, isLoading, size, backgroundColor, isFullMaskBody, isHasPanel, rollingAlign,
    } = props;
    const isShowMask = (rollingAlign === 'full' || rollingAlign === 'area');
    return (
        <LoaderContainer className={className} style={style} isFullSize={rollingAlign === 'full'}>
            {isShowMask
                && (
                    <Mask isLoading={isLoading} isFullSize={rollingAlign === 'full'} isHasPanel={isHasPanel} backgroundColor={backgroundColor}>
                        <MaskBody isFullMaskBody={isFullMaskBody}>
                            <Rolling size={size}/>
                        </MaskBody>
                    </Mask>
                )}

            {children}
        </LoaderContainer>
    );
};

Loader.defaultProps = {
    style: undefined,
    className: undefined,
    children: null,
    isLoading: false,
    size: 50,
    backgroundColor: 'rgba(0,0,0,.1)',
    isFullMaskBody: false,
    isHasPanel: false,
    rollingAlign: 'full',
};

export default Loader;

const MaskBody = styled.div`
    display: inherit;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: inherit;
    
    ${props => props.isFullMaskBody && css`
        max-width: none;
    `}
`;

const Mask = styled.div`
    background-color: ${props => props.backgroundColor};
    width: 100%;
    height: 100%;
    opacity: 0;
    display: flex;
    pointer-events: none;
    z-index: 40;
    position: ${props => (props.isFullSize ? 'fixed' : 'absolute')};
    top: 0;
    left: 0;
    justify-content: center;
    align-items: ${props => (props.isFullSize ? 'center' : 'flex-start')};
    padding: ${props => (props.isFullSize ? 0 : px2vw(50))};
    transition: opacity .4s;
    
    ${props => props.isLoading && css`
        opacity: 1;
        pointer-events: unset;
    `}
    
     @media ${screen.lg} {
       padding: ${props => (props.isFullSize ? 0 : '50px')};
       justify-content: ${props => (props.isFullSize ? 'flex-start' : 'center')};
       
       ${props => props.isHasPanel && css`
            padding-left: 270px;
       `};
    };
`;

const LoaderContainer = styled.div`
    position: relative;
    
    ${props => props.isFullSize && css`
        z-index: auto !important;
    `};
    
`;
