import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux';

import { withTranslation } from '@library/i18next/configureI18Next'

const Error = ({ statusCode, t }) => (
    <p>
        {statusCode
            ? t('error-with-status', { statusCode })
            : t('error-without-status')}
    </p>
)

Error.getInitialProps = async ({ res, err }) => {
    let statusCode = null
    if (res) {
        ({ statusCode } = res)
    } else if (err) {
        ({ statusCode } = err)
    }
    return {
        statusCode,
    }
}

Error.defaultProps = {
    statusCode: null,
}

Error.propTypes = {
    statusCode: PropTypes.number,
    t: PropTypes.func.isRequired,
}

export default compose(
    withTranslation('about')
)(Error)
