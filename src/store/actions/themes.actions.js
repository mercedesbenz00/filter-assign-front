export const CHANGE_THEME = 'CHANGE_THEME';


/**
 * Change current theme path
 */
export function changeTheme(path) {
    return { type: CHANGE_THEME, path };
}
