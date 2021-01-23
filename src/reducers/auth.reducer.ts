import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    AuthState,
    AuthAction,
} from '../types';

const defaultState: AuthState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
};

const authReducer: (state: AuthState, action: AuthAction) => AuthState = (state = defaultState, action: AuthAction) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { isFetching: true, isAuthenticated: false };
        case LOGIN_SUCCESS:
            return {
                isFetching: false,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
            return {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.payload,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
