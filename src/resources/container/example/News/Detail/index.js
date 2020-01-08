// @flow

import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {useRouter} from 'next/router';
import A from '@components/atoms/A';
import injectReducerSaga from '@library/redux/utils/injectReducerSaga';

import screen from '@themes/Screen';
import LoaderContainer from '@components/atoms/Loader';
import pageAction, {reducer, saga} from '../store';

type Props = {
    isFetching?: boolean,
    fetchCurrent: Function,
    currentData?: {
        id: number,
        title: number,
        desc: number,
        thumb: number,
    },
};

const List = (props: Props) => {

    const {
        t, isFetching, currentData, fetchCurrent,
    } = props;
    const router = useRouter();

    React.useEffect(() => {
        fetchCurrent(router.query.id);
    }, []);

    return (
        <Section>
            <LoaderContainer className="container" isLoading={isFetching}>

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
                    <div className="col-16">
                        {currentData && (
                            <>

                                <DetailImg imageUrl={currentData.thumb} alt="news detail"/>
                                <Title>
                                    {currentData.title}
                                </Title>
                                <Desc>
                                    {currentData.desc}
                                </Desc>

                                <div className="text-center mb-4">
                                    <A route="news">
                                        <Button type="button" className="btn col-auto mr-2">
                                            {t('example:button.back')}
                                        </Button>
                                    </A>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="col-8">
                        <CategoryArea>
                            <CategoryTitle>
                                {t('example:pageNews.categories')}
                            </CategoryTitle>

                            <CategoryContent>
                                <ul>
                                    <li>
                                            Html
                                    </li>
                                    <li>
                                            React
                                    </li>
                                </ul>
                            </CategoryContent>

                        </CategoryArea>
                    </div>
                </div>

            </LoaderContainer>
        </Section>
    );
};

List.defaultProps = {
    isFetching: false,
    currentData: null,
};

const mapDispatchToProps = {
    fetchCurrent: pageAction.fetchCurrent,
};

const mapStateToProps = state => ({
    isFetching: state.news.isFetching,
    currentData: state.news.currentData,
});

export default compose(
    injectReducerSaga('news', {reducer, saga}),
    connect(mapStateToProps, mapDispatchToProps)
)(List);

const Button = styled.button`
    font-weight: 700;
    border: 2px solid #f14836;
    border-radius: 50px;
    color: #fff;
    background-color: #f14836;
    font-size: 14px;
    padding: 10px 25px;
    
    :hover{
        color: #f14836;
        background-color: #e7e7e7;
    }
`;

const CategoryContent = styled.div`
    padding: 15px 20px 0 20px;
    color: #798795;
    
    li{
        margin-bottom: 20px;
    }
`;

const CategoryTitle = styled.div`
    border: 1px solid #dedede4f;
    padding: 15px 20px;
`;

const CategoryArea = styled.div`
    border: 1px solid #dedede4f;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const Desc = styled.div`
    margin-bottom: 30px;
`;

const DetailImg = styled.div`
    width: 100%;
    padding-bottom: 60%;
    background-image: url(${props => props.imageUrl});
    background-size: contain;
    background-position: center;
    margin-bottom: 30px;
`;

const Section = styled.div`
    flex: 1 1 auto;
`;

const Title = styled.h4`
    font-size: 20px;
    font-weight: 600;
    color: #222;
    margin-bottom: 30px;

    
    @media ${screen.lg} {
        font-size: 24px;
    }
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
