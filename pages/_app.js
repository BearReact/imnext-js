import React from 'react';
import App  from 'next/app';
import { ThemeProvider } from 'styled-components'
import {compose} from 'redux';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '../library/redux/store'
// import createStore from '../library/redux/configureStore'


import { appWithTranslation } from '../i18n';

const theme = {
    colors: {
        primary: '#0070f3'
    }
}

class MyApp extends App {

    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {
            namespacesRequired: ['common'] // i18next default NS
        };

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx })
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props

        return (
            <Provider store={store}>
                <PersistGate persistor={store.__PERSISTOR} loading={null}>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        )
    }
}

export default compose(
    withRedux(createStore),
    withReduxSaga,
    appWithTranslation
)(MyApp);

// export default withRedux(createStore)(withReduxSaga(appWithTranslation(MyApp)))
