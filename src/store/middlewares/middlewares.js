import settings from './settings.middleware.js'
import themes from './themes.middleware.js';
import auth from './auth.middleware.js';
import filter from './filter.middleware.js';

export default [
    settings,
    themes,
    auth,
    filter
]