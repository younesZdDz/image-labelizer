import React, { createContext, useEffect } from 'react';
import axios from 'axios';
import authReducer from '../reducers/auth.reducer';
import { AuthState, AuthAction } from '../types';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import config from '../config';

export const AuthContext = createContext<AuthState | null>(null);
export const SetAuthContext = createContext<React.Dispatch<AuthAction> | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, dispatch] = useLocalStorageReducer<AuthState, AuthAction>(
        'auth',
        {
            accessToken: '',
            refreshToken: '',
            accessExpiresIn: 0,
            refreshExpiresIn: 0,
        },
        authReducer,
    );

    /* useEffect(() => {
        const fetchAuth = async () => {
            const res = await axios.get(`${config.API_URI}/api/v1/auth/current_user`, { withCredentials: true });
            if (res.data) {
                dispatch && dispatch({ type: 'SET', payload: { ...res.data } });
            }
        };
        fetchAuth();
    }, []);*/
    return (
        <SetAuthContext.Provider value={dispatch}>
            <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
        </SetAuthContext.Provider>
    );
};
