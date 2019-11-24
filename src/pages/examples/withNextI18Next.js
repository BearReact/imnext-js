import React from 'react'
import PropTypes from 'prop-types'

import { i18n, Link, withTranslation } from '@library/i18next/configureI18Next'


const WithNextI18Next = ({ t }) => {
    return <div>
        <div>NextjsI18Next 只需要追加除了 common 的 namespacesRequired</div>
        <div>{t('common:title')}</div>

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

WithNextI18Next.getInitialProps = async () => ({
    namespacesRequired: ['examples'],
});

WithNextI18Next.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation()(WithNextI18Next)