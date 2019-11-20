import React from 'react'
import PropTypes from 'prop-types'

// import { withTranslation } from 'react-i18next';

import { i18n, Link, withTranslation } from '@library/i18next/configureI18Next'


const Homepage = ({ t }) => (
    <button
        type='button'
        onClick={() => i18n.changeLanguage(i18n.language === 'en-US' ? 'zh-CN' : 'en-US')}
    >
        {t('common:change-locale')}
    </button>
);

Homepage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

Homepage.propTypes = {
    t: PropTypes.func.isRequired,
};

// export default Homepage;
export default
    withTranslation('common')(Homepage)
