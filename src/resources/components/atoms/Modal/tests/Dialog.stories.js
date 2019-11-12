import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Modal from '../Modal';

storiesOf('Atoms|Dialog', module)
    .add('with success', () => (
        <Modal
            isVisible
            type="success"
            title="success"
            buttons={[
                {text: 'Cancel', type: 'gray', onClick: action('onClick-cancel-button')},
                {text: 'OK', type: 'primary', onClick: action('onClick-ok-button')}
            ]}
        >
            Successful redemption offer, please visit the game lobby
        </Modal>
    ))

    .add('with error', () => (
        <Modal
            isVisible
            type="error"
            title="success"
            buttons={[{text: 'OK', type: 'danger', onClick: action('onClick-ok-button')}]}
        >
            Sorry, your answer is fail
        </Modal>
    ))

    .add('with not title', () => (
        <Modal buttons={[{text: '我知道了', type: 'primary', onClick: action('onClick-ok-button')}]}>
            Sorry, your answer is fail
        </Modal>
    ));
