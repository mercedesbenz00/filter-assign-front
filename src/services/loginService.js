import axios from 'axios';
import * as CONST from '../const/const';

var LoginService = {
    login (email, password) {
        console.log( 'API Server URL =', process.env.React_App_API_SERVER_URL, email, password )

        return new Promise((resolve, reject) => {  
            axios.defaults.headers.common[ CONST.LANGUAGE ] = CONST.EN;
            axios.post( process.env.React_App_API_SERVER_URL + CONST.API_SUB_URLS.LOGIN, { email, password } )
                .then( response => {                    
                    if ( response.status === CONST.RESPONSE_STATUS.OK_RES )
                    {                       
                        resolve(response.data);                        
                    }
                    else
                    {   
                        reject(response.data);
                    }
                })
                .catch(err=>{
                    reject(err);
                })
        });
    },

    logout () {
        return new Promise((resolve, reject) => {            
             axios.defaults.headers.common[ CONST.LANGUAGE ] = CONST.EN;
             axios.post(process.env.React_App_API_SERVER_URL + CONST.API_SUB_URLS.LOGIN)
                 .then(response => {                    
                     if ( response.status === CONST.RESPONSE_STATUS.OK_RES )
                     {                       
                         resolve(response.data);                        
                     }
                     else
                     {   
                         reject(response.data);
                     }
                 })
                 .catch(err=>{
                     reject(err);
                 })
         });
    },
    
    setSession(access_token) {
        if ( access_token )
        {
            localStorage.setItem(CONST.JWT_ACCESS_TOKEN, access_token);
            axios.defaults.headers.common[ CONST.LANGUAGE ] = CONST.EN;
            axios.defaults.headers.common[ CONST.AUTHORIZATION ] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem( CONST.JWT_ACCESS_TOKEN );
            delete axios.defaults.headers.common[ CONST.AUTHORIZATION ];
            delete axios.defaults.headers.common[ CONST.LANGUAGE ];
        }
    }
}

export default LoginService;