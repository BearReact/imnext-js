// @flow
/**
 * HOC Modal Props
 * http://le0zh.github.io/2016/11/23/react-provider-hoc/
 */


import * as React from 'react';
import {compose} from 'redux';

import UiActions from '@library/redux/store/Ui/Reducer';
import connect from 'react-redux/es/connect/connect';


const injectModal = (ComponentToWrap) => {

    type Props = {
        modalOpenSuccess: Function,
        modalOpenError: Function,
        modalOpenConfirm: Function,
        modalOpen: Function,
    }
    class ModalComponent extends React.Component<Props, State> {

        success = (message: string, onClickOk: Function = () => {}) => {
            const {modalOpenSuccess} = this.props;
            modalOpenSuccess(message, onClickOk);
        };

        error = (message: string, statusCode: string, onClickOk: Function = () => {}) => {
            const {modalOpenError} = this.props;
            modalOpenError(message, statusCode, onClickOk);
        };

        confirm = (message: string, onClickOk: Function = () => {}) => {
            const {modalOpenConfirm} = this.props;
            modalOpenConfirm(message, onClickOk);
        };

        fire = (props) => {
            const {modalOpen} = this.props;
            modalOpen(props);
        };

        render() {
            return (
                <ComponentToWrap {...this.props} modal={{
                    success: this.success,
                    error: this.error,
                    confirm: this.confirm,
                    fire: this.fire
                }} />
            );
        }
    }

    const mapDispatchToProps = {
        modalOpenSuccess: UiActions.modalOpenSuccess,
        modalOpenError: UiActions.modalOpenError,
        modalOpenConfirm: UiActions.modalOpenConfirm,
        modalOpen: UiActions.modalOpen
    };

    const mapStateToProps = state => ({});

    return compose(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )
    )(ModalComponent);

};
export default injectModal;


