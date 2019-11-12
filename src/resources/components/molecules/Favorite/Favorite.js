// @flow
/**
 * Favorite
 */
import * as React from 'react';
import styled from 'styled-components';
import Icon from '@components/atoms/Icon/Icon';
import Button from '@components/atoms/Button/Button';
import screen from '@themes/Screen';

type Props = {
    theme: {},
    style?: React.CSSProperties,
    className?: string,
    isFavourite?: boolean,
    onClick?: Function
};
type State = {};

class Favorite extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isFavourite: false,
        onClick: () => {}
    };

    render() {
        const {className, style, isFavourite, onClick} = this.props;
        return (
            <FavoriteRoot className={className} style={style} onClick={onClick}>
                <Icon code={isFavourite? 'heart2' : 'heart1' } size={26} color={isFavourite ? siteConfig.theme.primaryColor : '#d8d8d8'} />
            </FavoriteRoot>
        );
    }
}

export default Favorite;

const FavoriteRoot = styled(Button)`
   padding: 0;

    @media ${screen.lg} {
       padding: 10px 10px 0;
       min-height: auto;
    };
`;
