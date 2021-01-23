import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    AuthDispatchType,
    LoginRequestAction,
    LoginSuccessAction,
    LoginFailureAction,
    LogoutRequestAction,
    LogoutSuccessAction,
    AuthAction,
} from '../types';
import config from '../config';
import { Dispatch } from 'react';

const requestLogin: () => LoginRequestAction = () => {
    return {
        type: LOGIN_REQUEST,
    };
};

const receiveLogin: () => LoginSuccessAction = () => {
    return {
        type: LOGIN_SUCCESS,
    };
};

const loginError: (message: string) => LoginFailureAction = (message: string) => {
    return {
        type: LOGIN_FAILURE,
        payload: message,
    };
};

const requestLogout: () => LogoutRequestAction = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};

const receiveLogout: () => LogoutSuccessAction = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

export const loginUser = ({ email, password }: { email: string; password: string }) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch(requestLogin());
        try {
            const response = await axios.post(`${config.API_URI}/api/v1/auth/login`, {
                email,
                password,
            });
            const authorization = {
                accessToken: response.headers['authorization'],
                refreshToken: response.headers['x-refresh-token'],
                accessExpiresIn: response.headers['x-access-expiry-time'],
                refreshExpiresIn: response.headers['x-refresh-expiry-time'],
            };

            localStorage.setItem('access_token', authorization.accessToken);
            localStorage.setItem('refresh_token', authorization.refreshToken);
            localStorage.setItem('access_expiry_time', authorization.accessExpiresIn);
            localStorage.setItem('refresh_expiry_time', authorization.refreshExpiresIn);

            dispatch(receiveLogin());
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(loginError(error?.response?.data?.message));
            } else {
                console.error('Error: ', error);
            }
        }
    };
};

export const logoutUser = () => {
    return (dispatch: AuthDispatchType) => {
        dispatch(requestLogout());
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_expiry_time');
        localStorage.removeItem('refresh_expiry_time');
        dispatch(receiveLogout());
    };
};
