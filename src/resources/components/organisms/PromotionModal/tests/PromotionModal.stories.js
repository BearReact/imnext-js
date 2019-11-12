import React from 'react';
import {storiesOf} from '@storybook/react';
import styled from 'styled-components';
import {action} from '@storybook/addon-actions';
import {asset} from '@utils/uri';
import {px2vw} from '@utils/format';
import PromotionModal from '../PromotionModal';

const source = [
    {id: 1, title: 'The Gift Giveaway! ', content: 'Christmas Lucky Draw is underway! Grab an opportunity to receive luxury gifts from us and a chance to win the grand prize BMW 5 Series 530i G30!\n' +
            '                    Join  iBET to drive it home.', adImgUrl: asset('sample/images/promotion/modal.jpg'), detailUrl: 'https://www.google.com', isOpen: true},
    {id: 2, title: 'The Gift Giveaway! ', content: 'Christmas Lucky Draw is underway! Grab an opportunity to receive luxury gifts from us and a chance to win the grand prize BMW 5 Series 530i G30!\n' +
            '                    Join  iBET to drive it home.', adImgUrl: asset('sample/images/promotion/modal.jpg'), detailUrl: '', isOpen: false}
];


storiesOf('Organisms|PromotionModal', module)
    .add('default', () => (
        <Modal>
            <PromotionModal
                source={source}
                onClose={action('onClick')}
            />
        </Modal>

    ));

const Modal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${px2vw(270)};
    margin: auto;
`;
