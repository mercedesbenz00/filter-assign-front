import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import authReducer from './auth.reducers.js';
import filterReducer from './filter.reducers.js';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    auth: authReducer,
    filter: filterReducer
});
