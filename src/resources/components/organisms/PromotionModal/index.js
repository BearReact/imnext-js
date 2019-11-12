import {connect} from 'react-redux';
import Actions from '@library/redux/store/Ui/Reducer';
import PromotionModal from './PromotionModal';

const mapDispatchToProps = {
    onClose: Actions.modalClose
};
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PromotionModal);
