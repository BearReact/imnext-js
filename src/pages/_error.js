// @flow
import React from 'react';
import {compose} from 'redux';
import {withTranslation} from '@library/i18next/configureI18Next';


type Props = {
    t: Function,
    statusCode?: string,
};

const Error = (props: Props) => {
    const {statusCode, t} = props;
    return (
        <p>{statusCode ? t('error-with-status', {statusCode}) : t('error-without-status')}</p>
    );
};

Error.getInitialProps = async ({res, err}) => {
    let statusCode = null;
    if (res) {
        ({statusCode} = res);
    } else if (err) {
        ({statusCode} = err);
    }
    return {
        statusCode,
    };
};

Error.defaultProps = {
    statusCode: null,
};


export default compose(withTranslation('about'))(Error);
