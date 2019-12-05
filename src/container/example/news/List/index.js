// @flow

import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Link from 'next/link';

import injectReducerSaga from '@library/redux/utils/injectReducerSaga';
import screen from '@themes/Screen';
import {isEmpty} from '@utils/equal';
import pageAction, {reducer, saga} from '../store';

type Props = {
    isFetching?: boolean,
    fetchPaginate: Function,
    paginateData?: Array<{
        id: number,
        title: number,
        author: number,
        thumb: number,
        avatar: number,
    }>,
};

const List = (props: Props) => {

    const {
        t, isFetching, paginateData, fetchPaginate,
    } = props;

    React.useEffect(() => {
        if (isEmpty(paginateData)) {
            fetchPaginate();
        }
    }, []);

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
                    {paginateData.map(row => (
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

List.defaultProps = {
    isFetching: false,
    paginateData: [],
};

const mapDispatchToProps = {
    fetchPaginate: pageAction.fetchPaginate,
};

const mapStateToProps = state => ({
    isFetching: state.news.isFetching,
    paginateData: state.news.paginateData,
});

export default compose(
    injectReducerSaga('news', {reducer, saga}),
    connect(mapStateToProps, mapDispatchToProps)
)(List);

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
