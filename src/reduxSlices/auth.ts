import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { callApi } from '../api';
import { RootState } from '../configStore';
import { FetchStatus } from '../types';

export type AuthState = {
    status: FetchStatus;
    isAuthenticated: boolean;
    errorMessage?: string;
};

const initialState: AuthState = {
    status: 'idle',
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: {
            reducer(state, action: PayloadAction<boolean>) {
                state.isAuthenticated = action.payload;
            },
            prepare() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('access_expiry_time');
                localStorage.removeItem('refresh_expiry_time');
                return { payload: false };
            },
        },
    },
    extraReducers: (builder) => {
        builder.addCase('auth/fetchAuth/pending', (state) => {
            state.status = 'loading';
        });
        builder.addCase('auth/fetchAuth/fulfilled', (state) => {
            state.status = 'succeeded';
            state.isAuthenticated = true;
        });
        builder.addCase('auth/fetchAuth/rejected', (state, action) => {
            state.status = 'failed';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            state.errorMessage = action.error.message;
        });
    },
});

export const asyncLoginUser = createAsyncThunk(
    'auth/fetchAuth',
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await callApi(`api/v1/auth/login`, false, 'post', {
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
            return true;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'There was an error';
            throw new Error(errorMessage);
        }
    },
);

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
