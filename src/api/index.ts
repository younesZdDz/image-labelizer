import axios, { AxiosRequestConfig } from 'axios';
import { Middleware } from 'redux';
import { DateTime } from 'luxon';
import config from '../config';
import { RootState } from '../configStore';

type METHODS = 'post' | 'get' | 'put' | 'delete';

export const callApi = async (endpoint: string, authenticated: boolean, method: METHODS, data?: any) => {
    let accessToken = localStorage.getItem('access_token');
    let accessExpiresIn = parseInt(localStorage.getItem('access_expiry_time') || '0', 10);
    const refreshToken = localStorage.getItem('refresh_token');
    const refreshExpiresIn = parseInt(localStorage.getItem('refresh_expiry_time') || '0', 10);

    if (refreshExpiresIn && refreshExpiresIn - DateTime.local().toSeconds() < 0) {
        await axios.put(
            `${config.API_URI}/api/v1/auth/logout`,
            {
                refreshToken,
            },
            {
                headers: {
                    authorization: accessToken,
                },
            },
        );
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_expiry_time');
        localStorage.removeItem('refresh_expiry_time');
        throw new Error('Refresh token expired!');
    } else if (accessExpiresIn && accessExpiresIn - DateTime.local().toSeconds() < 0) {
        const response = await axios.put(
            `${config.API_URI}/api/v1/auth/refresh-token`,
            {
                refreshToken,
            },
            {
                headers: {
                    authorization: accessToken,
                },
            },
        );
        accessToken = response.headers['authorization'];
        accessExpiresIn = response.headers['x-access-expiry-time'];
        localStorage.setItem('access_token', accessToken || '');
        localStorage.setItem('access_expiry_time', `${accessExpiresIn}`);
    }
    const axiosParams: AxiosRequestConfig = {
        method,
        url: `${config.API_URI}/${endpoint}`,
    };
    if (authenticated) {
        if (accessToken) {
            axiosParams.headers = { authorization: accessToken };
        } else {
            throw new Error('No token saved!');
        }
    }
    if (data) {
        axiosParams.data = data;
    }
    const response = await axios({
        ...axiosParams,
    });
    return response;
};

export const CALL_API = Symbol('Call API');

// eslint-disable-next-line @typescript-eslint/ban-types
const apiMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action) => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }
    const { endpoint, types, authenticated, method, data } = callAPI;

    const [requestType, successType, errorType] = types;
    try {
        const response = await callApi(endpoint, authenticated, method, data);
        return next({
            type: successType,
            payload: response.data,
        });
    } catch (error) {
        if (error?.response?.data?.message) {
            return next({
                type: errorType,
                payload: error?.response?.data?.message,
            });
        }
        return next({
            type: errorType,
            payload: error.message || 'There was an error.',
        });
    }
};
export default apiMiddleware;
