import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import conformsTo from 'lodash/conformsTo';
import invariant from 'invariant';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
    const shape = {
        dispatch: isFunction,
        subscribe: isFunction,
        getState: isFunction,
        replaceReducer: isFunction,
        runSaga: isFunction,
        injectedReducers: isObject,
        injectedSagas: isObject
    };

    invariant(conformsTo(store, shape), '(src/utils...) injectors: Expected a valid redux store');
}
