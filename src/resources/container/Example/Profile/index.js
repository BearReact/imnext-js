// @flow

import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducerSaga from '@library/redux/utils/injectReducerSaga';
import LoaderContainer from '@components/atoms/Loader';
import pageAction, {reducer, saga} from './store';

type Props = {
    isFetching?: boolean,
    fetchCurrent: Function,
    currentData: {
        email: string,
        name: string,
        country: string,
        signUpDate: string,
    },
};

const Profile = (props: Props) => {

    const {
        t, isFetching, currentData, fetchCurrent,
    } = props;

    React.useEffect(() => {
        fetchCurrent();
    }, []);

    const columnLust = currentData ? [
        {key: 'email', column: t('example:pageProfile.label.email'), value: currentData.email},
        {key: 'name', column: t('example:pageProfile.label.name'), value: currentData.name},
        {key: 'country', column: t('example:pageProfile.label.country'), value: currentData.country},
        {key: 'signUpDate', column: t('example:pageProfile.label.signUpDate'), value: currentData.signUpDate},
    ] : [];

    return (
        <Section>
            <LoaderContainer className="container" isLoading={isFetching}>

                {/* 標題 */}
                <div className="row justify-content-center mb-4">
                    <div className="col-lg-8">
                        <div className="text-center">
                            <PageSubTitle>{t('example:pageProfile.subTitle', {email: 'imagine10255'})}</PageSubTitle>
                            <PageTitle dangerouslySetInnerHTML={{__html: t('example:pageProfile.title')}}/>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12">
                        {
                            columnLust.map(row => (
                                <div className="row" key={row.key}>
                                    <div className="col-6">
                                        <div>{row.column}</div>
                                    </div>
                                    <div className="col-auto">
                                        <div>{row.value}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </LoaderContainer>
        </Section>
    );
};

Profile.defaultProps = {
    isFetching: false,
};

const mapDispatchToProps = {
    fetchCurrent: pageAction.fetchCurrent,
};

const mapStateToProps = state => ({
    isFetching: state.profile.isFetching,
    currentData: state.profile.currentData,
});

export default compose(
    injectReducerSaga('profile', {reducer, saga}),
    connect(mapStateToProps, mapDispatchToProps)
)(Profile);

const Section = styled.div`
    flex: 1 1 auto;
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
