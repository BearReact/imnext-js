// @flow
/**
 * ScrollView
 * 上下Loading 由 ScrollView決定
 * 全屏遮罩+Loader由 ContentLoader決定
 */
import * as React from 'react';
import styled, {css} from '@library/styled-components';
import Icon from '@components/atoms/Icon/Icon';
import Rolling from '@components/atoms/Loader/Rolling';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
    scrollTopText?: string,
    scrollTopReadyText?: string,
    scrollTopRefreshText?: string,
    isScrollRefreshLocked?: boolean,
    isScrollTopLoading?: boolean,
    isScrollBottomLoading?: boolean,
    onScrollToTop?: Function,
    onScrollToBottom?: Function
};
type State = {
    isReadyHandleScrollTop: boolean,
    scrollTopText: string
};

class ScrollView extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null,
        children: null,
        scrollTopText: undefined,
        scrollTopReadyText: undefined,
        scrollTopRefreshText: undefined,
        isScrollRefreshLocked: false,
        isScrollTopLoading: false,
        isScrollBottomLoading: false,
        onScrollToTop: undefined,
        onScrollToBottom: undefined
    };

    startOfficeY = 0;
    startTouchY = 0;
    maxHeight = 100;
    isNeedScrollToTop = false;
    isNeedScrollToBottom = false;

    constructor(props) {
        super(props);
        this.isNeedScrollToTop = typeof props.onScrollToTop !== 'undefined';
        this.isNeedScrollToBottom = typeof props.onScrollToBottom !== 'undefined';
        this.state = {
            isReadyHandleScrollTop: false,
            scrollTopText: props.scrollTopText
        };
    }

    componentDidMount() {
        // window.addEventListener('scroll', debounce(this.viewDidScroll, 40));
        this.scrollView.addEventListener('touchstart', this.handleTouchStart);

        if(this.isNeedScrollToTop){
            this.scrollView.addEventListener('touchend', this.handleTouchEnd);
        }
        this.scrollView.addEventListener('touchmove', this.handleTouchMove, {passive: false, capture: false});
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
    }


    /**
     * 取得視窗參數
     */
    getBodyParam(){
        const body = document.getElementsByTagName('body')[0];

        return {
            viewHeight: window.innerHeight,
            offsetY: window.pageYOffset,
            contentHeight: body.scrollHeight
        };
    }


    /**
     * 處理放開觸摸復原高度
     */
    handleHeightClose = () => {
        let clientHeight = this.refreshArea.clientHeight;
        const resultHeight = clientHeight - 8;
        this.refreshArea.setAttribute('style', `height: ${resultHeight <= 0 ? 0 : resultHeight}px`);

        if(this.refreshArea.clientHeight > 0){
            window.requestAnimationFrame(this.handleHeightClose);
        }
    };


    /**
     * 處理拉動放開的情況
     */
    handleTouchEnd = (e) => {
        // e.preventDefault();
        const {onScrollToTop, scrollTopRefreshText} = this.props;
        const {isReadyHandleScrollTop} = this.state;

        if(this.startScrollY < 0){
            e.preventDefault();
        }

        window.requestAnimationFrame(this.handleHeightClose);

        if(isReadyHandleScrollTop === true){
            onScrollToTop();
            const $this = this;
            setTimeout(function(){
                // ex: '刷新中，请耐心等候'
                $this.setState({isReadyHandleScrollTop: false, scrollTopText: scrollTopRefreshText});
            },500);
        }

    };


    /**
     * 處理裝置按壓移動的情況
     */
    handleTouchMove = (e) => {
        const {onScrollToBottom, isScrollTopLoading, isScrollRefreshLocked, isScrollBottomLoading, scrollTopText, scrollTopReadyText} = this.props;
        const {isReadyHandleScrollTop} = this.state;

        // 取得現在Scroll參數
        const bodyParam = this.getBodyParam();

        // 計算捲動高度是否超過內容高度
        const userScrollSum = bodyParam.viewHeight + bodyParam.offsetY;

        // 必須在非讀取中才會繼續偵測
        if(!isScrollTopLoading && !isScrollBottomLoading){

            // 取得移動距離
            const moveTouchY = e.changedTouches[0].pageY;
            const moveLength = moveTouchY - this.startTouchY;

            // 判定 手指拉動下滑到達頂端時, 阻止繼續滑動
            if(moveTouchY > this.startTouchY && bodyParam.offsetY <= 0){
                if(e.originalEvent !== undefined && event.cancelable) {
                    e.preventDefault();
                }
            }

            // 判定 手指拉動下滑到達頂端時, 阻止繼續滑動
            if(!isScrollRefreshLocked){
                if(userScrollSum === bodyParam.contentHeight) {
                    // 偵測到底觸發 onScrollToBottom
                    if(this.isNeedScrollToBottom && isScrollBottomLoading === false){
                        onScrollToBottom();
                        if(e.originalEvent !== undefined && event.cancelable){
                            e.preventDefault();
                        }
                    }
                } else if (isReadyHandleScrollTop === false && this.startScrollY === 0) {
                    // 若移動高於一定高度則轉向
                    if(moveLength/2 >= 70){
                        // ex: 放開刷新
                        this.setState({isReadyHandleScrollTop: true, scrollTopText: scrollTopReadyText});
                    }
                }else if(isReadyHandleScrollTop === true){
                    if(moveLength/2 < 70) {
                        // ex: 下拉刷新額度
                        this.setState({isReadyHandleScrollTop: false, scrollTopText: scrollTopText});
                    }
                }
            }



            // 設定下拉區域的高度
            if(this.isNeedScrollToTop){
                if(this.startScrollY === 0 && bodyParam.offsetY <= 0 && moveLength/2 <= this.maxHeight){
                    window.requestAnimationFrame(() => this.refreshArea.setAttribute('style', `height: ${moveLength / 2}px`));
                }
            }


        }

    };

    /**
     * 處理觸摸移動開始
     * @param e
     */
    handleTouchStart = (e) => {
        const scrollView = this.getBodyParam();

        // 紀錄
        // - 開始的觸摸Y座標: this.startTouchY
        // - 開始的捲軸座標: this.startScrollY
        this.startTouchY = e.changedTouches[0].pageY;
        this.startScrollY = scrollView.offsetY;
    };

    render() {
        const {style, className, children, isScrollTopLoading, isScrollBottomLoading, isScrollRefreshLocked} = this.props;
        const {isReadyHandleScrollTop, scrollTopText} = this.state;

        return (
            <ScrollViewRoot ref={ref => this.scrollView = ref} style={style} className={className}>
                {this.isNeedScrollToTop &&
                    <RefreshTop ref={ref => this.refreshArea = ref} isLoading={isScrollTopLoading} >
                        {isScrollRefreshLocked ?
                            <TopLoaderIcon isLoading size={24}/> :
                            <ArrowIcon code="arrow-down" arrow={isReadyHandleScrollTop ? 'up': 'down'}/>
                        }
                        {scrollTopText && <RefreshText isRefreshing={isScrollRefreshLocked}>{scrollTopText}</RefreshText>}
                    </RefreshTop>
                }
                <TopLoaderIcon isLoading={isScrollTopLoading} size={24}/>

                {children}
                {this.isNeedScrollToBottom &&
                    <BottomLoaderIcon isLoading={isScrollBottomLoading} size={24}/>
                }
            </ScrollViewRoot>
        );
    }
}

export default ScrollView;



const BottomLoaderIcon = styled(Rolling)`
    text-align: center;
    margin-bottom: 0;
    opacity: 0;
    position: relative;
    z-index: -1;
    margin-top: -${props => px2vw(props.size)};
    height: ${props => px2vw(props.size)};
    
    ${props=> props.isLoading && css`
        margin-top: 10px;
        margin-bottom: 10px;
        opacity: 1;
        z-index: 10;
    `};
    
    @media ${screen.lg} {
        margin-top: -${props => props.size}px;
        height: ${props => props.size}px;
        
        ${props=> props.isLoading && css`
            margin-top: 20px;
        `};
    };
`;


const TopLoaderIcon = styled(Rolling)`
    text-align: center;
    margin-bottom: 0;
    opacity: 0;
    position: relative;
    z-index: 0;
    transition: margin-top .4s, margin-bottom .4s, opacity .7s;
    margin-top: -${props => px2vw(props.size)};
    height: ${props => px2vw(props.size)};
    
    ${props=> props.isLoading && css`
        margin-top: 10px;
        margin-bottom: 10px;
        opacity: 1;
        z-index: 4;
    `};
    
    @media ${screen.lg} {
        margin-top: -${props => props.size}px;
        height: ${props => props.size}px;
        
        ${props=> props.isLoading && css`
            margin-top: 20px;
        `};
    };
`;

const ArrowIcon = styled(Icon)`
    width: 100%;
    display: block;
    transition: transform .4s;
    ${props => props.arrow === 'up' && css`
        transform: rotate(180deg);
    `};
`;

const RefreshText = styled.div`
    width: 100%;
    ${props => props.isRefreshing && css`
        color: ${props.theme.primaryColor};
    `};
`;

const RefreshTop = styled.div`
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    color: #bdbdbd;
    
    ${props => props.isLoading && css`
        opacity: 0;
    `}
`;


const ScrollViewRoot = styled.div`
    color: #fff;
    order: 0;
    flex: 1 1 auto;
    align-self: auto;
    width: 100%;
    position: relative;
`;
