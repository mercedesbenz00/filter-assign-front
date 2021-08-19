import {  FILTER_SUCCESS, FILTER_FAIL } from '../actions/actions';

const initialState = {
    examData:[], 
    err: null
}

const filterReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case FILTER_SUCCESS:
            console.log( 'filter reducer =', action.payload )
            let data = action.payload;
            return {
                ...state,
                examData: data.exams,
            }
        case FILTER_FAIL:            
            return {
                ...state,
                err: action.payload,
                examData:[]
            }
        default:
            return state;
    }
}

export default filterReducer;