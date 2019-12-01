// @flow
import React from 'react';
import Link from 'next/link';

type Props = {
    postId: number,
}

const WithServerHandle = (props: Props) => {
    const {postId} = props;
    return (
        <div>
            <div>
                postId:
                {postId}
            </div>
            <div>
                <Link href="/examples">
                    <a>Go Back</a>
                </Link>
            </div>
        </div>
    );
};

WithServerHandle.getInitialProps = ({ctx}) => ({postId: ctx.query.id});

export default WithServerHandle;
