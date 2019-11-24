import React from 'react'
import Link from 'next/link'

const WithBootstrap = () => {
    return <div className="container">
        <div className="row">
            <div className="col">
                test1
            </div>
            <div className="col">
                test2
            </div>
            <div className="col">
                test3
            </div>
        </div>
        <div>
            <Link href="/examples"><a>Go Back</a></Link>
        </div>
    </div>
};

export default WithBootstrap