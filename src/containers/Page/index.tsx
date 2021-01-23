import React, { Suspense } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import ErrorBoundary from '../../components/ErrorBoundary';
import { SystemState } from '../../types';
import './style.css';

const Page: React.FC<Props & PropsFromRedux> = ({
    title,
    description,
    errorImage,
    fallback,
    requireLogin,

    children,

    isAuthenticated,
    isFetching,
}) => {
    if (requireLogin && !isAuthenticated) {
        return <Redirect to="/auth" />;
    }
    const content = isFetching ? (
        [fallback]
    ) : (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <ErrorBoundary errorImage={errorImage}>
                <Suspense fallback={fallback}>
                    <section className="section">{children}</section>
                </Suspense>
            </ErrorBoundary>
        </>
    );

    return <div className="page">{content}</div>;
};
interface Props {
    title: string;
    description: string;
    errorImage: string;
    fallback: NonNullable<React.ReactNode>;
    requireLogin: boolean;

    children: React.ReactNode;
}
function mapStateToProps(state: SystemState) {
    const {
        auth: { isAuthenticated, isFetching },
    } = state;

    return {
        isAuthenticated,
        isFetching,
    };
}
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Page);
