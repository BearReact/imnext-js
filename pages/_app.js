import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components'
import { appWithTranslation } from '../i18n';

const theme = {
    colors: {
        primary: '#0070f3'
    }
}

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Container>
        )
    }
}

export default appWithTranslation(MyApp)
