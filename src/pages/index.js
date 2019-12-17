import React, {useEffect} from 'react';
import Layout from '@layouts/main';
import Router from 'next/router';

const Homepage = () => (
    <main>
        <span>Nextjs 9</span>
        <button type="button" onClick={() => Router.push('/example')}>Go Sample</button>
    </main>
);
Homepage.Layout = Layout;

export default Homepage;
