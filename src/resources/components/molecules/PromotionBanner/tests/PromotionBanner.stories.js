import React from 'react';
import {storiesOf} from '@storybook/react';
import {asset} from '@utils/uri';
import PromotionBanner from '../PromotionBanner';

const PromotionBannerList = [
    {id: '1', photoUrl: asset('common/images/sample/promotion/banner-event.jpg')},
    {id: '2', photoUrl: asset('common/images/sample/promotion/banner-event.jpg')},
    {id: '3', photoUrl: asset('common/images/sample/promotion/banner-event.jpg')}
];

class StateComponent extends React.Component {
    state = {
        isClose: false
    };

    handleClose = () => {
        this.setState({isClose: true});
    };

    render() {
        const {isClose} = this.state;
        return <div>{!isClose && <PromotionBanner source={PromotionBannerList} onClick={this.handleClose} />}</div>;
    }
}

storiesOf('Molecules|PromotionBanner', module).add('default', () => <StateComponent />);
