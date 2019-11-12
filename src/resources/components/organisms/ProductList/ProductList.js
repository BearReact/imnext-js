// @flow
/**
 * LobbyList
 */
import * as React from 'react';
import styled, {convertPx2vw} from '@library/styled-components';
import cx from 'classnames';
import screen from '@themes/Screen';
import ProductCard from '@components/molecules/ProductCard';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    activeCategoryCode: string,
    source?: Array<{
        name: string,
        code: number,
        isMaintain: boolean,
        isHidden: boolean,
        isFree: boolean
    }>,
    onPlay: Function
};
type State = {};

class ProductList extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        source: []
    };

    render() {
        const {
            className,
            style,
            source,
            onPlay,
            activeCategoryCode
        } = this.props;

        return (
            <LobbyListRoot
                isShow={activeCategoryCode === '5'}
                className={cx('container-fluid', className)}
                style={{
                    ...style
                }}
            >
                <div className="row">
                    {source
                        .filter(o => !o.isHidden)
                        .map(itemParam => (
                            <Col className="col-24 col-lg-12 col-xl-8" key={itemParam.code}>
                                <ProductCard
                                    onPlay={onPlay}
                                    name={itemParam.name}
                                    code={itemParam.code}
                                    isFree={itemParam.isFree}
                                    isMaintain={itemParam.isMaintain}
                                />
                            </Col>
                        ))}
                </div>
            </LobbyListRoot>
        );
    }
}

export default ProductList;

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
`;
