import React, {useEffect} from 'react';
import Layout from '@layouts/main';
import Router from 'next/router';
import cookie from 'js-cookie';

const Homepage = () => (
    <main>
            Nextjs 9, test to
        <button type="button" onClick={() => Router.push('/example')}>go example</button>
        <div>
                client get cookie token:
            {cookie.get('token')}
        </div>
    </main>
);

Homepage.Layout = Layout;
Homepage.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default Homepage;
