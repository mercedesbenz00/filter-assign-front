import { EN, USER_DATA } from '../../const/const';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/actions';

const initialState = {
    loginStatus: false,
    err:null,
    token: null,
    userData:{},
    activeLang: {
        langCode: EN
    },
    
}

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem( USER_DATA, JSON.stringify( action.payload.User ) )

            console.log( "*** LOG_SUCCESS ***",  action.payload )

            return {
                ...state,
                loginStatus: true,
                err: null,
                token: action.payload.token,
                userData:action.payload.User,
            }
            
        case LOGIN_FAIL:            
            localStorage.setItem( USER_DATA, null )
            return {
                ...state,
                err: action.payload
            }
        case LOGOUT:
            localStorage.setItem( USER_DATA, null )
            return {
                ...state,
                loginStatus: false,
                token: null,
                storeAdminMqttChannel:''
            }
        default:
            return state;
    }
}

export default authReducer;