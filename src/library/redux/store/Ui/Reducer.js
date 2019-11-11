import * as React from 'react';
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'ui';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isOpenPanel: 'yes',

    isModalVisible: false,
    modalProps: {},

    isBlockVisible: false,
    blockMessage: ''
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        handleTogglePanel: null,

        modalOpenSuccess: ['message', 'onClickOk'],
        modalOpenError: ['message', 'statusCode', 'onClickOk'],
        modalOpenConfirm: ['message', 'onClickOk'],
        modalOpen: ['modalProps'],
        modalClickOk: null,
        modalClickCancel: null,
        modalClose: null,

        blockOpen: ['message'],
        blockClose: null
    },
    {prefix: `${PREFIX}/`}
);

export default Creators;

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    handleTogglePanel(state) {
        console.log('INITIAL_STATE', INITIAL_STATE);
        console.log('state', state);
        // return {
        //     ...state,
        //     isOpenPanel: state.isOpenPanel === 'yes' ? 'no' : 'yes'
        // }
        return state.merge({
            isOpenPanel: state.isOpenPanel === 'yes' ? 'no' : 'yes'
        });
    },
    Block: {
        open(state, action) {
            return state.merge({
                isBlockVisible: true,
                blockMessage: action.message
            });
        },
        close(state) {
            return state.merge({
                isBlockVisible: false,
                blockMessage: ''
            });
        }
    },
    Modal: {
        openSuccess(state, action) {
            const {onClickOk} = action;
            return state.merge({
                isModalVisible: true,
                modalProps: {
                    type: 'success',
                    title: '成功',
                    buttons: [{text: '确定', type: 'primary', onClick: onClickOk, effectType: 'MODAL_CLICK_OK'}],
                    children: action.message
                }
            });
        },
        openError(state, action) {
            const {onClickOk} = action;
            if(!state.isModalVisible){
                return state.merge({
                    isModalVisible: true,
                    modalProps: {
                        type: 'error',
                        title: '失败',
                        buttons: [{text: '确定', type: 'danger', onClick: onClickOk, effectType: 'MODAL_CLICK_OK'}],
                        children: action.message,
                        statusCode: action.statusCode
                    }
                });
            }
            return state;
        },
        openConfirm(state, action) {
            const {onClickOk} = action;
            return state.merge({
                isModalVisible: true,
                modalProps: {
                    type: 'confirm',
                    title: '确认',
                    buttons: [
                        {text: '取消', type: 'danger', effectType: 'MODAL_CLICK_CANCEL'},
                        {text: '确定', type: 'primary', onClick: onClickOk, effectType: 'MODAL_CLICK_OK'}
                    ],
                    children: action.message
                }
            });
        },
        open(state, action) {
            return state.merge({
                isModalVisible: true,
                modalProps: action.modalProps
            });
        },
        close(state) {
            return state.merge({
                isModalVisible: false,
                props: {}
            });
        }
    }

};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.HANDLE_TOGGLE_PANEL]: Reducers.handleTogglePanel,

    [Types.MODAL_OPEN_SUCCESS]: Reducers.Modal.openSuccess,
    [Types.MODAL_OPEN_ERROR]: Reducers.Modal.openError,
    [Types.MODAL_OPEN_CONFIRM]: Reducers.Modal.openConfirm,
    [Types.MODAL_OPEN]: Reducers.Modal.open,
    [Types.MODAL_CLOSE]: Reducers.Modal.close,

    [Types.BLOCK_OPEN]: Reducers.Block.open,
    [Types.BLOCK_CLOSE]: Reducers.Block.close
});
