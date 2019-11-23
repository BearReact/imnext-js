import React from 'react'
import Link from 'next/link'

const Examples = () => (
    <div>
        <h1>索引頁面</h1>
        <ul>
            <li>
                <Link href='/examples/withFlowType'><a>with FlowType</a></Link>
            </li>
            <li>
                <Link href='/examples/withReactI18Next'><a>with React I18Next</a></Link>
            </li>
            <li>
                <Link href='/examples/withNextI18Next'><a>with Nextjs I18Next</a></Link>
            </li>
            <li>
                <Link href='/examples/withBootstrap'><a>with Bootstrap</a></Link>
            </li>
            <li>
                <Link href={{ pathname: '/examples/withServerHandle', query: { id: 'Zeit' } }}><a>With Server Handle</a></Link>
            </li>
        </ul>
    </div>
);

export default Examples;
