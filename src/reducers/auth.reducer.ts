import { AuthState, AuthAction, Reducer } from '../types';

const defaultState = {
    accessToken: '',
    refreshToken: '',
    accessExpiresIn: 0,
    refreshExpiresIn: 0,
};
const reducer: Reducer<AuthState, AuthAction> = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET':
            return {
                ...action.payload,
            };
        case 'RESET':
            return { ...defaultState };
        case 'SET_ACCESS':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                accessExpiresIn: action.payload.accessExpiresIn,
            };
        default:
            return state;
    }
};

export default reducer;
