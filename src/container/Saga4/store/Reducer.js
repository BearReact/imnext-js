import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'promotionDetail';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isFetching: false,
    message: '',
    currentData: undefined
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    queryParam: state => state[PREFIX].queryParam
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 取明細
        fetchCurrent: ['id'],
        fetchCurrentBegin: null,
        fetchCurrentSuccess: ['data'],
        fetchCurrentFail: ['message']
    },
    {prefix: `${PREFIX}/`}
);

export default Creators;

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    // 查明細
    FetchCurrent: {
        begin(state) {
            return state.merge({
                isFetching: true
            });
        },
        success(state, action) {
            return state.merge({
                isFetching: false,
                currentData: action.data,
                message: null
            });
        },
        fail(state, action) {
            return state.merge({
                isFetching: false,
                message: action.message
            });
        }
    }
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_CURRENT_BEGIN]: Reducers.FetchCurrent.begin,
    [Types.FETCH_CURRENT_SUCCESS]: Reducers.FetchCurrent.success,
    [Types.FETCH_CURRENT_FAIL]: Reducers.FetchCurrent.fail
});
