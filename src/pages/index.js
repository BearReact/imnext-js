import React, {useEffect} from 'react';
import Layout from '@layouts/main';
import Router from 'next/router';

const Homepage = () => (
    <main>
            Nextjs 9, test to
        <button type="button" onClick={() => Router.push('/example')}>example</button>
    </main>
);
Homepage.Layout = Layout;

export default Homepage;
