import React from 'react'

import {connect} from 'react-redux';
import {compose} from 'redux';

import action from '@library/redux/store/Ui/Reducer';
import LoginAction from '@library/redux/store/Login/Reducer';
import injectReducerSaga from "@library/redux/utils/injectReducerSaga";
import Link from "next/link";
import PageAction from './store/Reducer';
import promotionDetailStore from './store';


class Saga4 extends React.Component {
    // static async getInitialProps (props) {
    //     const { store, isServer } = props.ctx;
    //     store.dispatch(tickClock(isServer));
    //     return { isServer }
    // }

    componentDidMount () {
        // this.props.dispatch(startClock())
    }

    render () {
        return <>
            dasdaa
            isOpenPanel: {this.props.isOpenPanel}

            <button onClick={()=>this.props.fetchCurrent(1)}>
                XXXaa
            </button>
            <button onClick={this.props.submitLogin}>
                submitLogindds
            </button>

            <Link href="/">回到首頁</Link>
            {String(this.props.isFetching)}
            </>
    }
}



const mapDispatchToProps = {
    handleTogglePanel: action.handleTogglePanel,
    submitLogin: LoginAction.submitLogin,
    // onSubmit: PageAction.submitForm,
    fetchCurrent: PageAction.fetchCurrent
};

const mapStateToProps = state => ({
    isOpenPanel: state.ui.isOpenPanel,
    isFetching: state.promotionDetail.isFetching,
});


export default compose(
    injectReducerSaga("promotionDetail", promotionDetailStore),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Saga4);


