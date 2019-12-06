import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'contact';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isSubmitting: false,
    message: '',
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    queryParam: state => state[PREFIX].queryParam,
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
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SUBMIT_FORM_BEGIN]: Reducers.submitForm.begin,
    [Types.SUBMIT_FORM_SUCCESS]: Reducers.submitForm.success,
    [Types.SUBMIT_FORM_FAIL]: Reducers.submitForm.fail,
});
