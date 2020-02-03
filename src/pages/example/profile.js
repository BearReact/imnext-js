// @flow

import React from 'react';
import {withTranslation} from '@library/i18next/configureI18Next';
import withAuth from '@middleware/withAuth';
import Layout from '@layouts/example';
import Container from '@container/example/Profile';
import {compose} from 'redux';

type Props = {
    t: (localeKey: string) => string,
};

const Profile = (props: Props) => (
    <Container {...props}/>
);

Profile.Layout = Layout;
Profile.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(withAuth(Profile));

// export default withTranslation()(
//     Profile
// );
