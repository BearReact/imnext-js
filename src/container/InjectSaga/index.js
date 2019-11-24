import React from 'react'

import {connect} from 'react-redux';
import {compose} from 'redux';
import Link from "next/link";

import uiAction from '@library/redux/store/Ui/Reducer';
import injectReducerSaga from "@library/redux/utils/injectReducerSaga";
import pageAction, {reducer, saga} from './store';


class InjectSaga extends React.Component {

    render () {
        return <ul>

            <li>
                {!this.props.isFetching ?
                    <button onClick={()=>this.props.fetchCurrent(1)}>取得Inject Redux 資料</button>
                    :
                    '資料讀取中...'
                }
                {this.props.currentData}

            </li>

            <li>
                <button onClick={()=>this.props.handleTogglePanel()}>
                    Common Redux: handleTogglePanel
                </button>
                isOpenPanel: {this.props.isOpenPanel}
            </li>


            <li>
                <button onClick={this.props.submitLogin}>
                    submitLogindds
                </button>
            </li>

            <div>
                <Link href="/examples"><a>Go Back</a></Link>
            </div>

        </ul>
    }
}



const mapDispatchToProps = {
    handleTogglePanel: uiAction.handleTogglePanel,
    fetchCurrent: pageAction.fetchCurrent
};

const mapStateToProps = state => ({
    isOpenPanel: state.ui.isOpenPanel,
    isFetching: state.examples.isFetching,
    currentData: state.examples.currentData,
});


export default compose(
    injectReducerSaga("examples", {reducer, saga}),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(InjectSaga);

