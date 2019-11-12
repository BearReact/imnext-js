import {connect} from 'react-redux';
import TabBar from './TabBar';

const mapStateToProps = state => ({
    agentFinanceLivechatUrl: state.system.agentFinanceLivechatUrl
});

export default connect(
    mapStateToProps
)(TabBar);
