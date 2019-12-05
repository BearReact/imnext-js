// @flow
import React from 'react';
import ErrorComponent from 'next/error';
import {withTranslation} from '@library/i18next/configureI18Next';

type Props = {
    statusCode?: string,
};

const Error = (props: Props) => {
    const {statusCode} = props;
    if (statusCode) {
        return <ErrorComponent statusCode={statusCode}/>;
    }

    return <div>Has error with status</div>;
};

Error.defaultProps = {
    statusCode: null,
};

Error.getInitialProps = async ({res, err}) => {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    return {
        namespacesRequired: ['common'],
        statusCode,
    };
};

export default withTranslation()(Error);
