// @flow
/**
 * StartGameBeforeModal
 */
import * as React from 'react';
import styled from 'styled-components';
import {uploadUrl} from '@utils/uri';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import {ContainerLoader} from '@themes/Styles';

import Icon from '@components/atoms/Icon';
import Button from '@components/atoms/Button';

type Props = {
    history: {},
    style?: React.CSSProperties,
    className?: string,
    source?: Array<{
        id: number,
        title: string,
        imgUrl: string,
        detailUrl: string
    }>,
    closeAdvertModal: Function,
    fetchStartBlockAdvertisement: Function,
    isFetching: boolean
};
type State = {};

class AdvertModal extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        source: []
    };

    handleGetDetailUrl = (id) => {
        const {fetchStartBlockAdvertisement} = this.props;
        fetchStartBlockAdvertisement(id);
    };

    render() {
        const {
            isFetching,
            className,
            style,
            source,
            closeAdvertModal
        } = this.props;

        return (
            <Overlay>
                <AdvertModalRoot isLoading={isFetching} className={className} style={style}>

                    <AdvertModalContainer className='row'>
                        {source.map(row => {
                            return (
                                <AdvertItem
                                    onClick={()=>{row.needGetDetailUrl ? this.handleGetDetailUrl(row.id) : window.open(row.detailUrl);}}
                                    key={row.id}
                                    className="col-lg-8 col-xxl-6"
                                >
                                    <AdvertBg src={uploadUrl(row.imgUrl)}/>
                                    <AdvertTitle>
                                        {row.title}
                                    </AdvertTitle>
                                </AdvertItem>
                            );
                        })}
                        <CloseButton onClick={closeAdvertModal}>
                            <Icon code="close-little" color="#fff" size={24} />
                        </CloseButton>
                    </AdvertModalContainer>


                </AdvertModalRoot>
            </Overlay>
        );
    }
}

export default AdvertModal;


const AdvertModalRoot = styled(ContainerLoader)`
    padding: ${px2vw(30)};
    width: 100%;
    height: 100%;
    display: block;
    overflow: auto;
    position: static;
    
    @media ${screen.lg} {
        padding: 30px;
        main-width: 100%;
        display: flex;
        align-item: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
    }
`;

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

const AdvertItem = styled.div`
    color: #fff;
    padding: ${px2vw(15)};
    width: 100%;
    
    @media ${screen.lg} {
        padding: 15px;
    }

`;

const AdvertTitle = styled.div`
    text-align: center;
    font-size: ${px2vw(16)}; 
    padding: ${px2vw(8)}; 
    background-color: ${siteConfig.theme.primaryColor};  
    font-weight: 700;
    border: solid 1px ${siteConfig.theme.primaryColor};

    @media ${screen.sm}{
        font-size: 16px;
    }
    
    @media ${screen.lg}{
        padding: 8px;
    }
    
`;

const AdvertBg = styled.div`
    background-image: url('${props => props.src}');
    background-size: cover;
    background-position: center center;
    padding-bottom: 48%;
    border: solid 1px ${siteConfig.theme.primaryColor};

    
`;


const CloseButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${px2vw(42)};
    height: ${px2vw(42)};
    right: ${px2vw(10)};
    bottom: ${px2vw(60)};
    border-radius: 50%;
    border: none;
    padding: 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background-color: #8d8d8d;
    position: absolute;
    
    @media ${screen.lg} {
        width: 42px;
        height: 42px;
        margin-top: 0;
        bottom: auto;
        top: -50px;
        right: 0;
        background-color: #3c4447;
        box-shadow: -1px 1px 5px 0px;
    }
`;

const AdvertModalContainer = styled.div`
    width: 100%;
    height: auto;
    position: static;
    justify-content: center;
    margin: 0;
    
    @media ${screen.lg} {
        position: relative;
        padding-left: 50px;
        padding-right: 50px;
    }
    
`;
