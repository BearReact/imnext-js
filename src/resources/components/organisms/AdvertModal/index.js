import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {compose} from 'redux';

import PromotionActions from '@library/redux/store/Promotion/Reducer';
import AdvertModal from './AdvertModal';

const mapDispatchToProps = {
    fetchStartBlockAdvertisement: PromotionActions.fetchStartBlockAdvertisement
};

const mapStateToProps = state => ({
    isFetching: state.promotion.isFetching,
    startBlockAdvertisement: state.promotion.startBlockAdvertisement
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(AdvertModal);
