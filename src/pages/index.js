import React from 'react'
import PropTypes from 'prop-types'

// import { withTranslation } from 'react-i18next';

import { i18n, Link, withTranslation } from '@library/i18next/configureI18Next'


const Homepage = ({ t }) => (
        <main>
            <button
                type='button'
                onClick={() => i18n.changeLanguage(i18n.language === 'en-US' ? 'zh-CN' : 'en-US')}
            >
                {t('common:change-locale')}123
            </button>

            <div>
                <h1>索引頁面</h1>
                <ul>
                    <li>
                        <Link href='/withFlowType'>with FlowType</Link>
                    </li>
                    <li>
                        <Link href='/withReactI18Next'>with React I18Next</Link>
                    </li>
                    <li>
                        <Link href='/withNextI18Next'>with Nextjs I18Next</Link>
                    </li>
                </ul>
            </div>

            <div>

                <br/>
                <br/>
                <br/>
                {t('test')}
                <br/>

                {process.env.API_BASE_URL}
                <br/>
                <br/>
                <Link href='/saga4'>
                    <button
                        type="button"
                    >
                        {t('common:to-second-page')}
                    </button>
                </Link>
                {t('common:error.msg')}
            </div>
        </main>
)

Homepage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

Homepage.propTypes = {
    t: PropTypes.func.isRequired,
};

// export default Homepage;
export default
    withTranslation('common')(Homepage)
