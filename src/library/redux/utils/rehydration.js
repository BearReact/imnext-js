import AsyncStorage from 'localforage';
import {persistStore} from 'redux-persist';
import ReduxPersist from '../config/reduxPersist';

const updateReducers = (store, startup) => {
    const reducerVersion = ReduxPersist.reducerVersion;

    // Check to ensure latest reducer version
    AsyncStorage.getItem('reducerVersion')
        .then(localVersion => {
            if (localVersion !== reducerVersion) {
                // Purge store
                persistStore(store, null, startup).purge();
                AsyncStorage.setItem('reducerVersion', reducerVersion);
            } else {
                persistStore(store, null, startup);
            }
        })
        .catch(() => {
            persistStore(store, null, startup);
            AsyncStorage.setItem('reducerVersion', reducerVersion);
        });
};

export default {updateReducers};
