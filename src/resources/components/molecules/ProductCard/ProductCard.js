// @flow
/**
 * LobbyCard
 */
import * as React from 'react';
import {FormattedMessage as I18N} from 'react-intl';
import {LobbyCardRoot, MaintainText, Card, Info, Name, Free, LearnButton} from './Style';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    name: string,
    code: number,
    isFree: boolean,
    isMaintain: boolean,
    onPlay: Function
};
type State = {};

class LobbyCard extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined
    };

    render() {
        const {
            style,
            className,
            name,
            code,
            isFree,
            isMaintain,
            onPlay
        } = this.props;

        return (
            <Card>
                <LobbyCardRoot
                    onClick={() => onPlay(code)}
                    className={className}
                    style={style}
                    src={`common/images/other-product/base/${code}.jpg`}
                    isMaintain={isMaintain}
                />
                <Info>
                    <Name>{name}</Name>
                    <Free>
                        {isFree && (<I18N id='column.free' />)}
                    </Free>
                    {isMaintain ? (
                        <MaintainText>
                            <I18N id='action.maintain' />
                        </MaintainText>
                    ) : (
                        <LearnButton
                            onClick={() => {
                                onPlay(code);
                            }}
                        >
                            <I18N id='action.learnMore' />
                        </LearnButton>
                    )}
                </Info>
            </Card>
        );
    }
}

export default LobbyCard;
