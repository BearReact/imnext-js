// @flow

import React from 'react';
import Container from '@container/InjectSaga';
import injectReducerSaga from '@library/redux/utils/injectReducerSaga';
import pageAction, {reducer, saga} from '@container/InjectSaga/store';
import uiAction from '@library/redux/store/Ui/Reducer';
import {connect} from 'react-redux';
import {compose} from 'redux';

const WithInjectSaga = props => <Container {...props}/>;

// export default WithInjectSaga;

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
