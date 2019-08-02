import React from 'react'
import PropTypes from 'prop-types'

import { i18n, Link, withTranslation } from '../i18n'

import Header from '../components/Header'

const Homepage = ({ t }) => (
    <React.Fragment>
        <main>
            <Header title={t('h1')} />
            <div>
                <button
                    type='button'
                    onClick={() => i18n.changeLanguage(i18n.language === 'en-US' ? 'zh-CN' : 'en-US')}
                >
                    {t('change-locale')}
                </button>
                <br/>
                <br/>
                <br/>
                {t('test')}
                <br/>
                <br/>
                <br/>
                <Link href='/second-page'>
                    <button
                        type='button'
                    >
                        {t('to-second-page')}
                    </button>
                </Link>
            </div>
        </main>
    </React.Fragment>
)

Homepage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

Homepage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Homepage)
