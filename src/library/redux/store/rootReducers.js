/* eslint-disable global-require */

/** -----------------------------------------
            Assemble The Reducers
 /** ---------------------------------------*/
const rootReducers = {
    startup: require('./Startup/Reducer').reducer,
    system: require('./System/Reducer').reducer,
    auth: require('./Auth/Reducer').reducer,
    login: require('./Login/Reducer').reducer,
    ui: require('./Ui/Reducer').reducer,
    //
    // ...write other reducer
};

export default rootReducers;
