import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import annotationsReducer from '../reducers/annotations.reducer';
import { AnnotationsState, AnnotationsAction } from '../types';
import config from '../config';
import { AuthContext, SetAuthContext } from './auth.context';

const defaultAnnotationsData = {
    annotations: [],
    currentAnnotationId: '',
};

export const AnnotationsContext = createContext<AnnotationsState>(defaultAnnotationsData);
export const DispatchContext = createContext<React.Dispatch<AnnotationsAction> | null>(null);

export const AnnotationsProvider: React.FC = ({ children }) => {
    const authState = useContext(AuthContext);
    const dispatchAuth = useContext(SetAuthContext);

    const [annotations, dispatch] = useReducer(annotationsReducer, defaultAnnotationsData);
    useEffect(() => {
        const fetchData = async () => {
            if (authState?.refreshToken && authState?.refreshExpiresIn - DateTime.local().toSeconds() < 0) {
                await axios.put(
                    `${config.API_URI}/api/v1/auth/logout`,
                    {
                        refreshToken: authState.refreshToken,
                    },
                    {
                        headers: {
                            authorization: authState.accessToken,
                        },
                    },
                );

                dispatchAuth &&
                    dispatchAuth({
                        type: 'RESET',
                    });
            } else if (authState?.accessToken && authState?.accessExpiresIn - DateTime.local().toSeconds() < 0) {
                const res = await axios.put(
                    `${config.API_URI}/api/v1/auth/refresh-token`,
                    {
                        refreshToken: authState.refreshToken,
                    },
                    {
                        headers: {
                            authorization: authState.accessToken,
                        },
                    },
                );

                dispatchAuth &&
                    dispatchAuth({
                        type: 'SET_ACCESS',
                        payload: {
                            accessToken: res.headers['authorization'],
                            accessExpiresIn: res.headers['x-access-expiry-time'],
                        },
                    });
            }
            const res = await axios.get(`${config.API_URI}/api/v1/annotation/status/pending`, {
                headers: {
                    authorization: authState?.accessToken,
                },
            });
            const annotations = res?.data || [];
            dispatch({ type: 'SET_ANNOTATIONS', payload: annotations });
            dispatch({ type: 'SET_CURR_ANNOTATION_ID', payload: annotations.length ? annotations[0]._id : '' });
        };
        fetchData();
    }, [authState]);
    return (
        <DispatchContext.Provider value={dispatch}>
            <AnnotationsContext.Provider value={annotations}>{children}</AnnotationsContext.Provider>
        </DispatchContext.Provider>
    );
};
