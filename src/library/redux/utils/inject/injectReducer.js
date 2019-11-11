/* eslint-disable */

import React from 'react';
import PropTypes, {object} from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useStore} from "react-redux";

import getInjectors from '../reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({key, reducer}) => WrappedComponent => {

    class ReducerInjector extends React.Component {
        static WrappedComponent = WrappedComponent;

        static contextTypes = {
            store: PropTypes.object.isRequired
        };


        static displayName = `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        constructor(props, context) {
            super(props, context);

            const {injectReducer} = getInjectors(props.store);

            injectReducer(key, reducer);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};


