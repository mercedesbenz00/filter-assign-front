export const FILTER = 'FILTER';
export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const FILTER_FAIL = 'FILTER_FAIL';
/**
 * Change current theme path
 */
export function filter( type, status) {
    return { type: FILTER, data:{ type: type, status: status } };
}