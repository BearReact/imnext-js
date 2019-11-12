// @flow
/**
 * LobbyList
 */
import * as React from 'react';
import styled, {convertPx2vw} from '@library/styled-components';
import cx from 'classnames';
import orderBy from 'lodash/orderBy';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import LobbyCard from '@components/molecules/LobbyCard';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    source?: Array<{
        name: string,
        code: number,
        amount: number,
        isMaintain: boolean,
        isPromotionLock: boolean,
        isPromotionUnlockApply: boolean,
        isFavourite: boolean,
        isRefreshing: boolean,
        hasComputer: boolean,
        categoryList: Array<{
            categoryId: number,
            menuOrder: 0
        }>
    }>,
    onPlay: Function,
    selectLobbyCode?: number,
    onSetFavourite: Function,
    isFavourite?: boolean,
    activeCategoryCode?: string,
    isGuest?: boolean
};
type State = {};

class LobbyList extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        source: [],
        selectLobbyCode: null,
        isFavourite: false,
        activeCategoryCode: null,
        isGuest: false
    };

    render() {
        const {
            className,
            style,
            source,
            onSetFavourite,
            selectLobbyCode,
            onPlay,
            activeCategoryCode,
            isFavourite,
            isGuest
        } = this.props;

        return (
            <LobbyListRoot
                isShow={activeCategoryCode !== '5'}
                className={cx('container-fluid', className)}
                style={{
                    ...style
                }}
            >
                <div className="row">
                    {orderBy(
                        source.filter(itemParam => {
                            if (isFavourite) {
                                return itemParam.isFavourite;
                            }
                            return !!itemParam.categoryList.find(
                                category => category.categoryId === activeCategoryCode
                            );
                        }),
                        [
                            'isMaintain',
                            function(o) {
                                const categoryItem = o.categoryList.find(
                                    category => category.categoryId === activeCategoryCode
                                );
                                if (categoryItem) {
                                    return categoryItem.menuOrder;
                                }
                            }
                        ],
                        ['asc', 'asc']
                    ).map(itemParam => (
                        <Col className="col-12 col-lg-8 col-xl-6 col-xxl-4" key={itemParam.code}>
                            {itemParam.categoryList.menuOrder}
                            <LobbyCard
                                onPlay={onPlay}
                                onSetFavourite={onSetFavourite}
                                isSelected={selectLobbyCode === itemParam.code}
                                isLocked={itemParam.isPromotionLock}
                                isMaintain={itemParam.isMaintain}
                                isRefreshing={itemParam.isRefreshing}
                                isFavourite={itemParam.isFavourite}
                                amount={itemParam.amount}
                                categoryList={itemParam.categoryList}
                                name={itemParam.name}
                                code={itemParam.code}
                                isGuest={isGuest}
                            />
                        </Col>
                    ))}
                </div>
            </LobbyListRoot>
        );
    }
}

export default LobbyList;

const Col = styled.div``;

const LobbyListRoot = styled.div`
    display: ${props => props.isShow ? 'block' : 'none'};
    ${convertPx2vw`
        padding: 4px;
        
        > .row{
            margin-left: -2px;
            margin-right: -2px;
            
            > ${Col}{
                padding: 2px;
            }
        }
    `};
    
    @media ${screen.lg} {
       padding: 10px 20px 20px 20px;
    
        > .row{
            margin-left: -10px;
            margin-right: -10px;
            
            > .col-12{
                padding: 5px;
            }
        }
    };
    
    @media ${screen.xxl} {
        //padding: 10px 5px 20px 20px;
    };
`;
