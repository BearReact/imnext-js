import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import WalletActions from '@library/redux/store/Wallet/Reducer';
import Actions from '@library/redux/store/Login/Reducer';
import HistoryActions from '@library/redux/store/History/Reducer';
import PromotionActions from '@library/redux/store/Promotion/Reducer';
import LanguageActions from '@library/intl/store/Reducer';
import Menu from './Menu';

const mapDispatchToProps = {
    onSubmitLogout: Actions.submitLogout,
    fetchNoticeMessage: HistoryActions.fetchPaginate,
    fetchRewardAmount: WalletActions.fetchRewardAmount,
    changeLocale: LanguageActions.changeLocale,
    handleSetBlockAdvertisementModal: PromotionActions.handleSetBlockAdvertisementModal,
    fetchWalletData: WalletActions.fetchWalletData,
    fetchWalletTransferData: WalletActions.fetchWalletTransferData
};
const mapStateToProps = state => ({
    memberLevelCode: state.auth.memberLevelCode,
    memberLevelName: state.auth.memberLevelName,
    account: state.auth.account,
    signUpDate: state.auth.signUpDate,
    isHasNotRead: state.notice.isHasNotRead,
    isAuth: state.auth.isAuth,
    appDownloadUrl: state.system.appDownloadUrl,
    isShowIPointRecord: state.system.isShowIPointRecord,
    paginateData: state.history.paginateData,
    rewardAmount: state.wallet.rewardAmount,
    locale: state.language.locale,
    walletData: state.wallet.walletData,
    isFetching: state.wallet.isFetching,
    isRefresh: state.wallet.isRefresh,
    isRefreshAuto: state.wallet.isRefreshAuto,
    blockAdvertisementData: state.promotion.blockAdvertisementData,
    walletMode: state.system.walletMode,
    iMoneyName: state.system.iMoneyName,
    agentFinanceLivechatUrl: state.system.agentFinanceLivechatUrl
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Menu);
