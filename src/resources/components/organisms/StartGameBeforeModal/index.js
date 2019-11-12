import {connect} from 'react-redux';
import StartGameBeforeModal from './StartGameBeforeModal';

const mapStateToProps = state => ({
    agentFinanceLivechatUrl: state.system.agentFinanceLivechatUrl
});

export default connect(
    mapStateToProps
)(StartGameBeforeModal);
