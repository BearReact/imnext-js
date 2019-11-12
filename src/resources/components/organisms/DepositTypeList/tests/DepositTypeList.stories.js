import React from 'react';
import {storiesOf} from '@storybook/react';
import DepositTypeList from '../DepositTypeList';

const DepositTypeCardList = [
    {code: 'webBank', name: '网银存款', isMaintain: false, isHidden: false, desc: 'Easy deposit online bank transfer'},
    {code: 'bank', name: 'Atm/Cash', isMaintain: false, isHidden: false, desc: '單筆充值最低 $10 元'},
    {code: 'iPay', name: 'iPay', isMaintain: true, isHidden: false, desc: '相同卡号，可多次充值'},
    {code: 'wechat', name: 'WeChat', isMaintain: true, isHidden: false, desc: '單筆充值最低 $10 元'},
    {code: 'alipay', name: '支付寶', isMaintain: true, isHidden: false, desc: '單筆充值最低 $10 元'},
    {code: 'pointCard', name: '點卡', isMaintain: true, isHidden: false, desc: '相同卡号，可多次充值'},
    {code: 'pointCard', name: '點卡', isMaintain: true, isHidden: true, desc: '相同卡号，可多次充值'}
];

class StateComponent extends React.Component {
    render() {
        return <DepositTypeList source={DepositTypeCardList.filter(data => data.isHidden === false)} />;
    }
}

storiesOf('Organisms|DepositTypeList', module).add('default', () => (
    <div style={{backgroundColor: '#fff'}}>
        <StateComponent />
    </div>
));
