import React from "react";
import { object } from "prop-types";
import { useStore } from 'react-redux'

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
const withReducer = (key, reducer) => WrappedComponent => {
    const Extended = (props, context) => {
        // Here's where we add the new reducer.
        // See initilizeStore for details on how this works.
        console.log('useStore');
        const store = useStore();
        store.injectReducer(key, reducer);
        return <WrappedComponent {...props} />;
    };

    // To use context, you must define contextTypes
    // https://reactjs.org/docs/context.html
    Extended.contextTypes = {
        store: object
    };

    return Extended;
};



// runSaga is middleware.run function
// rootSaga is a your root saga for static saagas
function createSagaInjector(runSaga, rootSaga) {
    // Create a dictionary to keep track of injected sagas
    const injectedSagas = new Map();

    const isInjected = key => injectedSagas.has(key);

    const injectSaga = (key, saga) => {
        // We won't run saga if it is already injected
        if (isInjected(key)) return;

        // Sagas return task when they executed, which can be used
        // to cancel them
        const task = runSaga(saga);

        // Save the task if we want to cancel it in the future
        injectedSagas.set(key, task);
    };

    // Inject the root saga as it a staticlly loaded file,
    injectSaga('root', rootSaga);

    return injectSaga;
}



export { withReducer };
