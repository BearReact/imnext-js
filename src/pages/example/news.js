// @flow

import React from 'react';
import {withTranslation} from '@library/i18next/configureI18Next';
import Layout from '@layouts/example';
import Container from '@container/example/news/List';

type Props = {
    t: (localeKey: string) => string,
};

const News = (props: Props) => (
    <Container {...props}/>
);

News.Layout = Layout;
News.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(News);
