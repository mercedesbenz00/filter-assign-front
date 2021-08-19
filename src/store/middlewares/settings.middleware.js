import { TOGGLE_SETTING, CHANGE_SETTING } from '../actions/actions';

// Helpers to change class attribute
const updateElementClass = (el, stat, name) => el && el.classList[stat ? 'add' : 'remove'](name)
const updateBodyClass = (stat, name) => updateElementClass(document.body, stat, name)

/**
    When a setting value is changed, detect its value and add/remove
    a classname related with that setting from the target element.
    Export this method to talk directly with the middleware
*/
export const updateClasses = state => {
    updateBodyClass(state.settings.isFixed, 'layout-fixed')
    updateBodyClass(state.settings.isBoxed, 'layout-boxed')
    updateBodyClass(state.settings.isCollapsed, 'aside-collapsed')
    updateBodyClass(state.settings.isCollapsedText, 'aside-collapsed-text')
    updateBodyClass(state.settings.isFloat, 'aside-float')
    updateBodyClass(state.settings.asideHover, 'aside-hover')
    updateBodyClass(state.settings.offsidebarOpen, 'offsidebar-open')
    updateBodyClass(state.settings.asideToggled, 'aside-toggled')
    // layout horizontal
    updateBodyClass(state.settings.horizontal, 'layout-h')
    // apply change to the sidebar element
    updateElementClass(document.querySelector('.sidebar'), state.settings.asideScrollbar, 'show-scrollbar')
}

/*
    Hook into setting changes in order to change layout.
*/
const settings = store => next => action => {
    let result = next(action)
    if (action.type === TOGGLE_SETTING || action.type === CHANGE_SETTING) {
        updateClasses(store.getState())
    }
    return result
}

export default settings;