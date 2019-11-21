import React from 'react'
import PropTypes from 'prop-types'

import { withTranslation } from 'react-i18next';


const Homepage = ({ t }) => (
    <div
    >
        {t('common:change-locale')}
    </div>
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
