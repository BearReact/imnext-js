// @flow
import React from 'react';
import {useStore} from 'react-redux';

/**
 * HOC for adding dynamic reducers to the global store.
 *
 * Typical usage:
 *   export default withReducer('myComponent', reducer)(MyComponent)
 *
 * Thoughts:
 *   This uses Context which has all of the warnings in the React
 *   docs to not use, but it's still documented and works here.
 *   If context seems like a bad idea, I *think* you could instead
 *   use react-redux.connect here instead. Once connected, this
 *   HOC would have access to store as a prop. Once you have
 *   access to store, you have access to injectReducer. That's the
 *   main goal, get access to the store object.
 */
const injectReducerSaga = (key, injectStore) => (WrappedComponent) => {
    const Extended = (props, context) => {
        // Here's where we add the new reducer.
        // See initilizeStore for details on how this works.
        const store = useStore();
        if (injectStore.reducer) {
            store.injectReducer(key, injectStore.reducer);
        }

        if (injectStore.saga) {
            store.injectSaga(key, injectStore.saga);
        }

        return <WrappedComponent {...props} />;
    };

    // To use context, you must define contextTypes
    // https://reactjs.org/docs/context.html
    Extended.contextTypes = {
        store: {},
    };

    return Extended;
};

export default injectReducerSaga;
