import React from 'react'
import Link from 'next/link'

const WithServerHandle = (props) => {
    return <div>
        <div>postId: {props.postId}</div>
        <div>
            <Link href="/examples"><a>Go Back</a></Link>
        </div>
    </div>
};

WithServerHandle.getInitialProps = ({ ctx }) => {
    return { postId: ctx.query.id }
}

export default WithServerHandle