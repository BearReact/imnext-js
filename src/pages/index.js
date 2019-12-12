import React, {useEffect} from 'react';
import Layout from '@layouts/main';
import Router from 'next/router';

const Homepage = () => {

    useEffect(() => {
        Router.push('/example');
    }, []);

    return (
        <main>Nextjs 9</main>
    );
};
Homepage.Layout = Layout;

export default Homepage;
