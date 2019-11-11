import React from 'react'

import {connect} from 'react-redux';
import {compose} from 'redux';

import action from '@library/redux/store/Ui/Reducer';
import LoginAction from '@library/redux/store/Login/Reducer';

class Saga3 extends React.Component {
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

            <button onClick={this.props.submitLogin}>
                toggle
            </button>
            </>
    }
}



const mapDispatchToProps = {
    handleTogglePanel: action.handleTogglePanel,
    submitLogin: LoginAction.submitLogin
};
const mapStateToProps = state => ({
    isOpenPanel: state.ui.isOpenPanel,
});



export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Saga3);
