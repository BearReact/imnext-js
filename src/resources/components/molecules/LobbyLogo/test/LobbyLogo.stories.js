import React from 'react';
import {storiesOf} from '@storybook/react';
import LobbyLogo from '../LobbyLogo';

storiesOf('Molecules|LobbyLogo', module).add('Default', () => (
    <div className="container">
        <div className="row">
            <div className="col-24" style={{marginBottom: 30}}>
                <LobbyLogo lobbyCode={1040} isShowFavorite isFavourite isShadow />
            </div>
            <div className="col-24" style={{marginBottom: 30}}>
                <LobbyLogo lobbyCode={1140} size={80} />
            </div>
            <div className="col-24">
                <LobbyLogo lobbyCode={1140} isShowFavorite isFavourite={false} />
            </div>
        </div>
    </div>
));
