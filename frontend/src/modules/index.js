import { combineReducers } from 'redux';
import userReducer from './reducer/userModules/UserLoginModule';

const rootReducer = combineReducers({
    userReducer
    // menuReducer
});

export default rootReducer;