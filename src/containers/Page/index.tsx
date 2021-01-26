import React, { Suspense } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectStatus } from '../../reduxSlices/auth';
import './style.css';

const Page: React.FC<Props> = ({
    title,
    description,
    errorImage,
    fallback,
    requireLogin,

    children,
}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const status = useSelector(selectStatus);

    if (requireLogin && !isAuthenticated) {
        return <Redirect to="/auth" />;
    }
    const content =
        status === 'loading' ? (
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

export default Page;
