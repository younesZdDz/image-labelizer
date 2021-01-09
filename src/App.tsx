import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import errorImage from './assets/500.svg';
import './App.css';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="page" timeout={500}>
                        <Switch location={location}>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Page
                                        title="Image-labelizer dashboard"
                                        description="Image-labelizer dashboard"
                                        fallback={<Loading />}
                                        errorImage={errorImage}
                                        requireLogin={false}
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
