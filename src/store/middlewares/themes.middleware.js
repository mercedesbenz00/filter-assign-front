import { CHANGE_THEME } from '../actions/actions';

const LINK_ID = 'theme-stylesheet';

const createLink = () => {
    let link = document.getElementById(LINK_ID)
    if (!link) {
        const head = document.getElementsByTagName('head')[0];
        link = document.createElement('link');
        link.id = LINK_ID;
        link.rel = 'stylesheet';
        head.appendChild(link);
    }
    return link;
}

const injectStylesheet = stylesheet => {
    const linkTag = createLink();
    if (stylesheet)
        linkTag.href = stylesheet;
}

/*
    Export this method to talk directly with the middleware
*/
export const updateTheme = state => {
    if(state.theme.path !== '')
        injectStylesheet(state.theme.path)
}

/*
    Hook into theme change to set a inject a selected theme
*/
const themes = store => next => action => {
    let result = next(action)
    if (action.type === CHANGE_THEME) {
        updateTheme(store.getState())
    }
    return result
}

export default themes;