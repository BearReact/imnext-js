import React from 'react'
import PropTypes from 'prop-types'

import Link from "next/link";


const WithReactI18Next = () => {
    return <div>
        <div>使用 React-i18next套件的 withTranslation, 只會在前端 Render, 會造成首次頁面看到語系代碼, 然後才轉成語系</div>

        <div>
            <Link href="/examples">
                <a>Go Back</a>
            </Link>
        </div>
    </div>
};


export default WithReactI18Next;
