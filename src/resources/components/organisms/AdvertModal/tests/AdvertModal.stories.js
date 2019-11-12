import React from 'react';
import {storiesOf} from '@storybook/react';
import AdvertModal from '../AdvertModal';

const categoryList = [
    {
        id: 1,
        title: 'Lucky Draw',
        imgUrl: '/sample/images/promotion/sample-7.jpg',
        detailUrl: 'http://google.com.tw'
    },
    {
        id: 2,
        title: 'The Gift Giveaway!',
        imgUrl: '/sample/images/promotion/sample-6.jpg',
        detailUrl: 'http://google.com.tw'
    },
    {
        id: 3,
        title: 'Recommend Friends',
        imgUrl: '/sample/images/promotion/sample-5.jpg',
        detailUrl: 'http://google.com.tw'
    }
];

storiesOf('Organisms|AdvertModal', module)
    .add('default', () => (
        <AdvertModal
            source={categoryList}
            title={categoryList.title}
            imgUrl={categoryList.imgUrl}
            detailUrl={categoryList.detailUrl}
        />
    ));
