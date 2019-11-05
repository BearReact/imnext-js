import React from 'react'
import { connect } from 'react-redux'

import { startClock, tickClock } from '../library/redux/actions'
import Page from '../components/page'

class Saga extends React.Component {
    // static async getInitialProps (props) {
    //     const { store, isServer } = props.ctx;
    //     store.dispatch(tickClock(isServer));
    //     return { isServer }
    // }

    componentDidMount () {
        this.props.dispatch(startClock())
    }

    render () {
        return <Page title='Other Page' linkTo='/' NavigateTo='Index Page' />
    }
}

export default connect()(Saga)
