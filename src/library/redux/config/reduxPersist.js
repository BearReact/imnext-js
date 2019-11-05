import Immutable from 'seamless-immutable';
import AsyncStorage from 'localforage';
import appConfig from '@config/app';
import immutablePersistenceTransform from '../utils/immutablePersistenceTransform';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = Immutable(appConfig.reduxPersist).merge(
    {
        storeConfig: {
            storage: AsyncStorage,
            transforms: [immutablePersistenceTransform]
        }
    },
    {deep: true}
);

export default REDUX_PERSIST;
