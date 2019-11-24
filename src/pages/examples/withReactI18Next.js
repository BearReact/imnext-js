import React from 'react'
import PropTypes from 'prop-types'

import { withTranslation } from 'react-i18next';
import {i18n} from "@library/i18next/configureI18Next";
import Link from "next/link";


const WithReactI18Next = ({ t }) => {
    return <div>
        <div>{t('common:title')}</div>
        <div>使用 React-i18next套件的 withTranslation, 只會在前端 Render, 會造成首次頁面看到語系代碼, 然後才轉成語系</div>
        <button
            type='button'
            onClick={() => i18n.changeLanguage(i18n.language === 'en-US' ? 'zh-CN' : 'en-US')}
        >
            {t('examples:change-locale')}
        </button>

        <div>
            <Link href="/examples">
                <a>Go Back</a>
            </Link>
        </div>
    </div>
};

WithReactI18Next.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation(['common','examples'])(WithReactI18Next)