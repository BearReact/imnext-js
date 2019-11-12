// @flow
import * as React from 'react';
import styled from 'styled-components';
import {GameLobby as LobbyLogoImage} from '@themes/Images';

type Props = {
    lobbyCode?: number,
    isShadow?: boolean,
    size?: number,
    style?: React.CSSProperties
};
type State = {};

/**
 * LobbyStar
 */
class LobbyLogo extends React.PureComponent<Props, State> {
    static defaultProps = {
        lobbyCode: false,
        size: 100,
        isShadow: true,
        style: {}
    };

    render() {
        const {lobbyCode, size, isShadow, style} = this.props;
        return (
            <LogoContainer style={style} isShadow={isShadow}>
                <Logo src={LobbyLogoImage[lobbyCode]} size={size} />
            </LogoContainer>
        );
    }
}

export default LobbyLogo;

const LogoContainer = styled.div``;

const Logo = styled.img`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 10px;
    overflow: hidden;
`;
