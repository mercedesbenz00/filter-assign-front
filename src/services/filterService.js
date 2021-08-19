import axios from 'axios';
import * as CONST from '../const/const';

var FilterService = {
    filter ( type, status ) {
        // let data = { type: type, status: status }
        let data = { type: type, status: status }

        console.log( 'filter service =', data )

        return new Promise((resolve, reject) => {  
            axios.defaults.headers.common[ CONST.LANGUAGE ] = CONST.EN;
            axios.post( process.env.React_App_API_SERVER_URL + CONST.API_SUB_URLS.FILTER, data )
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
}

export default FilterService;