import { combineReducers } from 'redux';
import auth from './auth.reducer';
import annotations from './annotations.reducer';
const reducers = combineReducers({
    auth,
    annotations,
});
export default reducers;
