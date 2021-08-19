import FilterService from '../../services/filterService';

import { FILTER, FILTER_SUCCESS, FILTER_FAIL } from '../actions/actions';

const filter = store => next => action => {
    let dispatch = store.dispatch;
    if (action.type === FILTER) {       
      // Make an API call to login the server
      FilterService.filter(action.data.type, action.data.status).then(result => {
        // Dispatch an action with the todo we received
        dispatch({ type: FILTER_SUCCESS, payload: result });
      })
      .catch(err=>{
        dispatch({ type: FILTER_FAIL, payload: err })
      })
    } 
  
    return next(action)
  }

export default filter;