import LoginService from '../../services/loginService';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/actions';

const auth = store => next => action => {
    let dispatch = store.dispatch;
    if (action.type === LOGIN) {       
      // Make an API call to login the server
      LoginService.login(action.data.email, action.data.password).then(result => {
        // Dispatch an action with the todo we received
        dispatch({ type: LOGIN_SUCCESS, payload: result });
      })
      .catch(err=>{
        dispatch({ type: LOGIN_FAIL, payload: err })
      })
    } else if (action.type === LOGIN_SUCCESS) {
      console.log('login success', action.payload)
      LoginService.setSession(action.payload.token);
    } else if (action.type === LOGOUT) {      
      LoginService.setSession(null);
    }
  
    return next(action)
  }

export default auth;