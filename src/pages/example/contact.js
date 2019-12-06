// @flow

import React from 'react';
import {withTranslation} from '@library/i18next/configureI18Next';
import Layout from '@layouts/example';
import Container from '@container/example/contact';

type Props = {
    t: (localeKey: string) => string,
};

const Contact = (props: Props) => (
    <Container {...props}/>
);

Contact.Layout = Layout;
Contact.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(Contact);
