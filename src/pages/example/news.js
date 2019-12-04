// @flow

import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import {withTranslation} from '@library/i18next/configureI18Next';
import Layout from '@layouts/example';
import screen from '@themes/Screen';

const sourceData = [
    {
        id: 1,
        title: 'Nulla eget urna at tortor turpi feugiat tristique in sit.',
        author: 'Imagine',
        thumb: '/static/images/example/news-1.jpg',
        avatar: '/static/images/example/author-1.jpg',
    },
    {
        id: 2,
        title: 'Nulla eget urna at tortor turpi feugiat tristique in sit.',
        author: 'Imagine',
        thumb: '/static/images/example/news-2.jpg',
        avatar: '/static/images/example/author-2.jpg',
    },
    {
        id: 3,
        title: 'Nulla eget urna at tortor turpi feugiat tristique in sit.',
        author: 'Imagine',
        thumb: '/static/images/example/news-3.jpg',
        avatar: '/static/images/example/author-3.jpg',
    },
];

type Props = {
    t: (localeKey: string) => string,
};

const News = (props: Props) => {
    const {t} = props;
    return (
        <Section>
            <div className="container">

                {/* 標題 */}
                <div className="row justify-content-center mb-4">
                    <div className="col-lg-8">
                        <div className="text-center">
                            <PageSubTitle>{t('example:pageNews.subTitle')}</PageSubTitle>
                            <PageTitle dangerouslySetInnerHTML={{__html: t('example:pageNews.title')}}/>
                        </div>
                    </div>
                </div>


                <div className="row">
                    {sourceData.map(row => (
                        <div
                            className="col-lg-8 col-md-12 col-sm-16 mb-5"
                            key={row.id}
                        >
                            <a href="blog-details.html">
                                <Thumb src={row.thumb} alt="news" className="mb-4"/>
                            </a>
                            <div>
                                <Title className="mb-3">
                                    <a href="blog-details.html">
                                        {row.title}
                                    </a>
                                </Title>
                                <div className="blog-author d-flex align-items-center">
                                    <div className="pr-4">
                                        <Avatar src={row.avatar} alt="author"/>
                                    </div>
                                    <div>
                                        <AuthorPosted>{t('example:pageNews.postedBy')}</AuthorPosted>
                                        <AuthorText>{row.author}</AuthorText>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

News.Layout = Layout;
News.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(News);


const Section = styled.div`
    flex: 1 1 auto;
`;


const Thumb = styled.img`
    width: 95%;
`;

const Avatar = styled.img`
    width: 65px;
    border-radius: 50%;
`;

const Title = styled.h4`
    font-size: 20px;
    font-weight: 600;
    color: #222;
    
    @media ${screen.lg} {
        font-size: 24px;
    }
`;

const AuthorPosted = styled.div`
        font-size: 14px;
    color: #f14836;
    font-weight: 400;
    
`;


const AuthorText = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
    color: #798795;
`;

const PageSubTitle = styled.h6`
    font-size: 18px;
    font-weight: 400;
    color: #f14836;
    text-transform: uppercase;
`;
const PageTitle = styled.h4`
    font-size: 32px;
    
    span{
        font-weight: 400;
        display: contents;  
    }
`;
