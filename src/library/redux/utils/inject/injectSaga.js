/* eslint-disable */

/**
 * Inject Saga
 * issue:
 * https://github.com/react-boilerplate/react-boilerplate/issues/2314
 */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from '../sagaInjectors';

export default ({key, saga, mode, args}) => WrappedComponent => {
    class InjectSaga extends React.Component {
        static contextTypes = {
            store: PropTypes.object.isRequired
        };

        constructor(props, context) {
            super(props, context);
            this.WrappedComponent = WrappedComponent;
            this.displayName = `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

            this.injectors = getInjectors(context.store);

            const {injectSaga, ejectSaga} = this.injectors;
            const injectedArgs = args || [this.props];
            const {store} = this.context;

            // eject old saga with same name, so it does not get double sagas injected
            if ( (Reflect.has(store.injectedSagas, key) && store.injectedSagas[key].saga === saga) === false) {
                injectSaga(key, {saga, mode}, ...injectedArgs);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
