import {connect} from 'react-redux';
import {compose} from 'redux';
import Saga2 from './Saga2';

import action from '@library/redux/store/Ui/Reducer';
//
// const mapDispatchToProps = {
//     handleTogglePanel: action.handleTogglePanel
// };
// const mapStateToProps = state => ({
//     isOpenPanel: state.ui.isOpenPanel,
// });
//
//
//
// export default compose(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )
// )(Saga2);

export default Saga2;
