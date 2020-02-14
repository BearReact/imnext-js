// @flow

import React from 'react';
import {withTranslation} from '@library/i18next/configureI18Next';
import Layout from '@layouts/example';
import Container from '@container/Example/Home';
import StartupAction from '@library/redux/store/Startup/Reducer';

type Props = {
    t: (localeKey: string) => string,
};

const Home = (props: Props) => (
    <Container {...props}/>
);

Home.Layout = Layout;
Home.getInitialProps = async ({store}) => {

    store.dispatch(StartupAction.checking());

    return {
        namespacesRequired: ['example'],
    };
};

export default withTranslation()(Home);
