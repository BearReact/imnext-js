import React from 'react';
import {storiesOf} from '@storybook/react';
import Marquee from '../Marquee';
import MarqueeVertical from '../MarqueeVertical';

storiesOf('Atoms|Marquee', module).add('default', () => <Marquee source={[
    'Provide players with the most exciting sports betting like world cup betting',
    'Provide players with the most exciting sports betting like world cup betting',
    'Provide players with the most exciting sports betting like world cup betting'
]}/>).add('vertical', () => <MarqueeVertical source={[
    'Provide players with the most exciting sports betting like world cup betting',
    'Provide players with the most exciting sports betting like world cup betting',
    'Provide players with the most exciting sports betting like world cup betting'
]}/>);
