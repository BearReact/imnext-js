import {connect} from 'react-redux';
import UiActions from '@library/redux/store/Ui/Reducer';
import Panel from './Panel';

const mapDispatchToProps = {
    onToggleMenu: UiActions.handleTogglePanel
};

const mapStateToProps = state => ({
    isOpen: state.ui.isOpenPanel
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel);
