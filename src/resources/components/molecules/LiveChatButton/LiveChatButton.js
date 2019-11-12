// @flow
/**
 * LiveChatButton
 */
import * as React from 'react';
import Icon from '@components/atoms/Icon';

import SupportModal from '@components/organisms/SupportModal';

type Props = {
    liveChatUrl?: string,
    account?: string,
    whatsAppID: string
};

type State = {
    isSupportModal: boolean
};

class LiveChatButton extends React.PureComponent<Props, State> {

    state = {
        isSupportModal: false
    };

    /**
     * 客服系統光箱
     */
    handleSupportModal = () => {
        const {isSupportModal} = this.state;
        this.setState({isSupportModal: !isSupportModal});
    };


    render() {
        const {liveChatUrl, whatsAppID, account} = this.props;
        const {isSupportModal} = this.state;
        return (
            <div className="d-lg-none d-sm-block">
                <Icon code="support" color="#fff" size={24} onClick={whatsAppID ? this.handleSupportModal : ()=>window.open(`${liveChatUrl}&name=${account}`)} />
                {
                    isSupportModal && <SupportModal onClose={()=>this.handleSupportModal()} liveChatUrl={liveChatUrl} whatsAppID={whatsAppID} account={account}/>
                }
            </div>


        );
    }

}

LiveChatButton.defaultProps = {
    liveChatUrl: '',
    account: 'guest'
};

export default LiveChatButton;
