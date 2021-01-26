import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import annotationsReducer from './reduxSlices/annotations';
import authReducer from './reduxSlices/auth';

const rootReducer = combineReducers({
    auth: authReducer,
    annotations: annotationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
