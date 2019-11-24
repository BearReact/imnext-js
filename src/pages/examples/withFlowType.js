// @flow

import * as React from 'react';
import Link from 'next/link'

type Props = {
    style?: $Shape<CSSStyleDeclaration>,
    className?: string,
    children?: React.Node,
};

type State = {
    isVisible: boolean
};


/**
 * 使用 Function Component
 * @param props
 * @returns {*}
 * @constructor
 */
const FunctionComponent = (props: Props) => {
    return <div>{props.children}</div>;
};

/**
 * 使用 Class Component
 * @param props
 * @returns {*}
 * @constructor
 */
class ClassComponent extends React.Component<Props, State> {

    render(){
        const {children} = this.props;
        return <div>{children}</div>;
    }
};


/**
 * 使用 FlowType
 * @returns {*}
 */
const WithFlowType = () => {
    return <div>
        <FunctionComponent>FunctionComponent</FunctionComponent>
        <ClassComponent>ClassComponent</ClassComponent>
        <Link href="/examples"><a>Go Back</a></Link>
    </div>
};


export default WithFlowType;
