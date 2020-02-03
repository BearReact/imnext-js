import React, {useEffect} from 'react';
import get from 'lodash/get';
import nextCookie from 'next-cookies';
import {Router} from '@library/nextRoute';
import cookie from 'js-cookie';

const loginPage = 'home';

export const handleAuthAction = ctx => {
    const isAuth = get(ctx.store.getState(), 'auth.isAuth', false);
    const isServer = typeof window === 'undefined';

    if (!isAuth) {
        if (isServer) {
            // ctx.res.writeHead(302, {Location: `/${loginPage}`});
            // ctx.res.end();
        } else {
            Router.pushRoute(loginPage);
        }
    }

};

const withAuth = WrappedComponent => {
    const Wrapper = props => <WrappedComponent {...props}/>;

    Wrapper.getInitialProps = async ctx => {
        handleAuthAction(ctx);

        const componentProps = WrappedComponent.getInitialProps
            && (await WrappedComponent.getInitialProps(ctx));

        return {...componentProps};
    };

    if (WrappedComponent.Layout) {
        Wrapper.Layout = WrappedComponent.Layout;
    }

    return Wrapper;
};

export default withAuth;
