// @flow
import * as React from 'react';
import styled from 'styled-components';
import screen from '@themes/Screen';

import DepositTypeCard from '@components/molecules/DepositTypeCard';

type Props = {
    style?: React.CSSProperties,
    itemStyle?: React.CSSProperties,
    className?: string,
    source: Array<{
        code: string,
        name: string,
        isMaintain: boolean,
        isHidden: boolean,
        desc: string
    }>,
    lobbyCode: number
};
type State = {};

class DepositTypeList extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        itemStyle: undefined,
        className: undefined
    };

    renderHref(code: string) {
        const {lobbyCode} = this.props;
        const codeSmall = code.toLowerCase();

        switch (codeSmall) {
            case 'webbank':
                return `/deposit/lobby/${lobbyCode}/onlineBank`;
            case 'icard':
                return `/deposit/lobby/${lobbyCode}/iCard`;
            case 'ipay':
                return `/deposit/lobby/${lobbyCode}/dPay`;
            case 'aibo':
                return `/deposit/lobby/${lobbyCode}/aibo`;
            case 'wechat':
                return `/deposit/lobby/${lobbyCode}/weChat`;
            case 'alipay':
                return `/deposit/lobby/${lobbyCode}/aliPay`;
            case 'pointcard':
                return `/deposit/lobby/${lobbyCode}/pointCard`;
            case 'quick':
                return `/deposit/lobby/${lobbyCode}/quick`;
            case 'qq':
                return `/deposit/lobby/${lobbyCode}/qq`;
            case 'union':
                return `/deposit/lobby/${lobbyCode}/union`;
            case 'jd':
                return `/deposit/lobby/${lobbyCode}/jd`;
            case 'bank':
                return `/deposit/lobby/${lobbyCode}/atm`;
            case 'alipaynoresponse':
                return `/deposit/lobby/${lobbyCode}/newAlipay`;
            default:
                return false;
        }
    }

    render() {
        const {className, style, itemStyle, source} = this.props;
        return (
            <DepositTypeListRoot className={className} style={style}>
                {source.map(row => (
                    <div className="col-24 col-lg-12" key={row.code}>
                        <DepositTypeCardItem
                            code={row.code}
                            name={row.name}
                            isMaintain={row.isMaintain}
                            desc={row.desc}
                            href={this.renderHref(row.code)}
                            style={itemStyle}
                        />
                    </div>
                ))}
            </DepositTypeListRoot>
        );
    }
}

export default DepositTypeList;

const DepositTypeCardItem = styled(DepositTypeCard)`
    margin-bottom: 10px;
    
    @media ${screen.lg} {
        margin-bottom: 20px;
    }
`;

const DepositTypeListRoot = styled.div``;
