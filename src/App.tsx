import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import errorImage from './assets/500.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App: React.FC = () => {
    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="page" timeout={500}>
                        <Switch location={location}>
                            <Route
                                exact
                                path="/auth"
                                render={() => (
                                    <Page
                                        title="Image-labelizer login"
                                        description="Image-labelizer login"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={false}
                                    >
                                        <Login />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Page
                                        title="Image-labelizer dashboard"
                                        description="Image-labelizer dashboard"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={true}
                                    >
                                        <Dashboard />
                                    </Page>
                                )}
                            />
                            <Route
                                render={() => (
                                    <Page
                                        title="Oop, something lost"
                                        description="Page not found"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={false}
                                    >
                                        <NotFound />
                                    </Page>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    );
};

export default App;
