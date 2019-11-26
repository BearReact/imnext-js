import React from 'react'
import PropTypes from 'prop-types'

import BlockTitle from "@components/atoms/BlockTitle/BlockTitle";


const WithNextI18Next = ({ t }) => {
    return <div>
        <div>NextjsI18Next 只需要追加除了 common 的 namespacesRequired</div>


        <BlockTitle/>
        <div>
            <Link href="/examples">
                <a>Go Back</a>
            </Link>
        </div>
    </div>
};

export default WithNextI18Next;
