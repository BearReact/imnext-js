import {connect} from 'react-redux';
import LiveChatButton from './LiveChatButton';

const mapDispatchToProps = {};

const mapStateToProps = state => ({
    liveChatUrl: state.system.liveChatUrl,
    account: state.auth.account,
    whatsAppID: state.system.whatsAppID
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveChatButton);
