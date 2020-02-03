import React, {useEffect} from 'react';
import Layout from '@layouts/main';
import {Router} from '@library/nextRoute';

const Homepage = () => (
    <main>
        Nextjs 9, test to
        <button type="button" onClick={() => Router.pushRoute('example')}>go example</button>
    </main>
);

Homepage.Layout = Layout;
Homepage.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default Homepage;
