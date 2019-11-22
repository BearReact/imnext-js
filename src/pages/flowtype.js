import React from 'react';
import PropTypes from 'prop-types';
import BlockTitle from '@components/atoms/BlockTitle';

import { i18n, Link, withTranslation } from '../../i18n'


const Homepage = ({ t }) => (
    <React.Fragment>
        <main>
            <div>
                <button
                    type='button'
                    onClick={() => i18n.changeLanguage(i18n.language === 'en-US' ? 'zh-CN' : 'en-US')}
                >
                    {t('common:change-locale')}123
                </button>
                <br/>
                <br/>
                <br/>
                {t('test')}
                <BlockTitle>---</BlockTitle>
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
    </React.Fragment>
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