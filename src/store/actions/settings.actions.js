export const TOGGLE_SETTING = 'TOGGLE_SETTING';
export const CHANGE_SETTING = 'CHANGE_SETTING';

/**
 * Change a setting value
 * payload.name: name of the setting prop to change
 * payload.value: new value to apply
 */
export function changeSetting(name, value) {
    return { type: CHANGE_SETTING, name, value };
}

/**
 * Toggle a setting value (only boolean)
 */
export function toggleSetting(name) {
    return { type: TOGGLE_SETTING, name };
}