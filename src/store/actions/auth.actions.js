export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_SESSION = 'SET_SESSION';
/**
 * Change current theme path
 */
export function login(email, password) {
    return { type: LOGIN, data:{email, password} };
}

export function logout() {
    return { type: LOGOUT };
}

export function setSession(sessionData) {
    return { type: SET_SESSION, data:sessionData };
}
