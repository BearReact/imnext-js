// @flow

import React from 'react';
import {withTranslation} from '@library/i18next/configureI18Next';
import Layout from '@layouts/example';
import Container from '@container/Example/News/Detail';

type Props = {
    t: (localeKey: string) => string,
};

const Index = (props: Props) => (
    <Container {...props}/>
);

Index.Layout = Layout;
Index.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(Index);
