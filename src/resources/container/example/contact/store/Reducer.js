import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'contact';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isSubmitting: false,
    message: '',
    timeSec: 5,
    progress: 0,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    queryParam: state => state[PREFIX].queryParam,
    progress: state => state[PREFIX].progress,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 送出表單
        submitForm: ['data'],
        submitFormBegin: null,
        submitFormSuccess: ['message'],
        submitFormFail: ['message'],

        setProgress: ['progress'],
    },
    {prefix: `${PREFIX}/`}
);

export default Creators;

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    // 查詢列表
    submitForm: {
        begin(state) {
            return state.merge({
                isSubmitting: true,
                progress: 0,
            });
        },
        success(state, action) {
            return state.merge({
                isSubmitting: false,
                message: null,
            });
        },
        fail(state, action) {
            return state.merge({
                isSubmitting: false,
                message: action.message,
            });
        },
    },
    setProgress(state, action) {
        return state.merge({
            progress: action.progress,
        });
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SUBMIT_FORM_BEGIN]: Reducers.submitForm.begin,
    [Types.SUBMIT_FORM_SUCCESS]: Reducers.submitForm.success,
    [Types.SUBMIT_FORM_FAIL]: Reducers.submitForm.fail,
    [Types.SET_PROGRESS]: Reducers.setProgress,
});
