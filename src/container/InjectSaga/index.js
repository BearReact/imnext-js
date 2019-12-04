// @flow

import * as React from 'react';

import {connect} from 'react-redux';
import {compose} from 'redux';
import Link from 'next/link';

import uiAction from '@library/redux/store/Ui/Reducer';
import injectReducerSaga from '@library/redux/utils/injectReducerSaga';
import pageAction, {reducer, saga} from './store';

type Props = {
    isFetching?: boolean,
    currentData: boolean,
    isOpenPanel: boolean,
    submitLogin: Function,
    fetchCurrent: Function,
    handleTogglePanel: Function,
};

const WithInjectSaga = (props: Props) => {
    const {
        isFetching, currentData, submitLogin, fetchCurrent, isOpenPanel, handleTogglePanel,
    } = props;
    return (
        <ul>
            <li>
                {!isFetching ? (
                    <button type="button" onClick={() => fetchCurrent(1)}>
                        取得Inject Redux 資料
                    </button>
                ) : (
                    '資料讀取中...'
                )}
                {currentData}
            </li>

            <li>
                <button type="button" onClick={() => handleTogglePanel()}>
                    Common Redux: handleTogglePanel
                </button>
                isOpenPanel:
                {' '}
                {isOpenPanel}
            </li>

            <li>
                <button type="button" onClick={submitLogin}>
                    submitLogin
                </button>
            </li>

            <div>
                <Link href="/example">
                    <a>Go Back</a>
                </Link>
            </div>
        </ul>
    );
};

WithInjectSaga.defaultProps = {
    isFetching: false,
};

const mapDispatchToProps = {
    handleTogglePanel: uiAction.handleTogglePanel,
    fetchCurrent: pageAction.fetchCurrent,
};

const mapStateToProps = state => ({
    isOpenPanel: state.ui.isOpenPanel,
    isFetching: state.example.isFetching,
    currentData: state.example.currentData,
});

export default compose(
    injectReducerSaga('example', {reducer, saga}),
    connect(mapStateToProps, mapDispatchToProps)
)(WithInjectSaga);
