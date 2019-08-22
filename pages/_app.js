import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components'
import {compose} from 'redux';
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '../library/redux/store'


import { appWithTranslation } from '../i18n';

const theme = {
    colors: {
        primary: '#0070f3'
    }
}

class MyApp extends App {

    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx })
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props

        return (
            <Container>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </Provider>
            </Container>
        )
    }
}

export default compose(
    withRedux(createStore),
    withReduxSaga,
    appWithTranslation
)(MyApp);

// export default withRedux(createStore)(withReduxSaga(appWithTranslation(MyApp)))
