// @flow
import React from 'react';
import {i18n, Link, withTranslation} from '@library/i18next/configureI18Next';
import BlockTitle from '@components/atoms/BlockTitle/BlockTitle';

type Props = {
    t: Function,
};

const WithNextI18Next = (props: Props) => {
    const {t} = props;
    return (
        <div>
            <div>NextjsI18Next 只需要追加除了 common 的 namespacesRequired</div>
            <div>{t('common:title')}</div>

            <button type="button" onClick={() => i18n.changeLanguage(i18n.language === 'en-US' ? 'zh-CN' : 'en-US')}>
                {t('example:change-locale')}
            </button>

            <BlockTitle />
            <div>
                <Link href="/example">
                    <a>Go Back</a>
                </Link>
            </div>
        </div>
    );
};

WithNextI18Next.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});


export default withTranslation()(WithNextI18Next);
